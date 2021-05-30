import { Injectable } from '@nestjs/common';

import { CONSTANTS } from '@src/constants/global';
import {
  BenifitsOfEmployeesByCompany,
  Employee,
  EmployeeExpenditure,
} from '@src/models/employee';
import { Order } from '@src/models/order';
import { Voucher } from '@src/models/voucher';
import { groupBy } from '@src/utils/helper.functions';

import { DatabaseService } from './database';

interface IEmployeesWithOrders {
  orders: Order[];
  id: number;
  name: string;
  budget: number;
  companyId: number;
}

@Injectable()
export class EmployeeService {
  constructor(private _db: DatabaseService) {}

  // Create indexed objects/hashmaps for required lists
  // In real project where database will be connected,
  // the indexing stuff will we delegated to the database part
  employeesDict = groupBy<Employee>(this._db.getData('Employee'), 'id');
  vouchersDict = groupBy<Voucher>(this._db.getData('Voucher'), 'id');

  calculateExpenditures(
    employeesWithOrders: IEmployeesWithOrders[],
    remainingAmount?: number,
  ) {
    const finalEmployeeList: EmployeeExpenditure[] = [];

    // Iterate list of employees along their order details and lookup
    // in voucher details in order to caludlate budget
    employeesWithOrders.map(({ id: employeeId, orders }) => {
      const budget = this.employeesDict[employeeId].budget;

      // Calculate remaining amount by iterating overs employee orders
      const expenditure = orders.reduce(
        (stats, order) => {
          stats = {
            remaining:
              stats.remaining - this.vouchersDict[order.voucherId].amount,
            spent: stats.spent + this.vouchersDict[order.voucherId].amount,
            budget,
          };
          return stats;
        },
        { budget, spent: 0, remaining: budget },
      );

      const payload: EmployeeExpenditure = {
        employee: this.employeesDict[employeeId],
        orders,
        month: orders[0]?.date.getMonth() + 1,
        companyId: this.employeesDict[employeeId].companyId,
        expenditure,
        taxDistribution: {
          taxFree: CONSTANTS.TAX_FREE_AMOUNT,
          taxable: expenditure.spent - CONSTANTS.TAX_FREE_AMOUNT,
        },
      };

      if (!remainingAmount || expenditure.remaining >= remainingAmount) {
        finalEmployeeList.push(payload);
      }

      return payload;
    });

    // Group employees by companyId (return a hashmap with index on companyId)
    const grouping = groupBy<EmployeeExpenditure>(
      finalEmployeeList,
      'companyId',
      true,
    );

    // Iterate over the hashmap to convert it into array,
    // in order to feed data to GraphQl
    const responsePayload = Object.entries(
      grouping,
    ).map<BenifitsOfEmployeesByCompany>(([companyId, employees]) => ({
      companyId,
      employees,
    }));

    return responsePayload;
  }

  getMonthlyOrdersOfEmployees(
    orders: Order[],
    employees: Employee[],
    months: number[],
  ) {
    // Create a hashmap of orders with employeeId as index
    const ordersByEmployeeIdMap = groupBy<Order>(orders, 'employeeId', true);

    const ordersOfEachEmployee = employees.map((employee) => {
      // Pick orders of an employee for required months
      // By default months range from 0 to 11, 1 is added to make month count 1 to 12
      const employeeOrders =
        ordersByEmployeeIdMap[employee.id]?.filter(({ date }) =>
          months.includes(date.getMonth() + 1),
        ) || [];

      return {
        ...employee,
        orders: employeeOrders,
      };
    });

    return ordersOfEachEmployee;
  }
}

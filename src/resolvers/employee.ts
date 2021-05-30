import { Args, Query, Resolver } from '@nestjs/graphql';

import { DatabaseService } from '@src/services/database';
import { EmployeeService } from '@src/services/employee';
import { BenifitsOfEmployeesByCompany, Employee } from '@src/models/employee';
import { Company } from '@src/models/company';
import { Order } from '@src/models/order';
import { Partner, RevenuePerPartner } from '@src/models/partner';
import { Voucher } from '@src/models/voucher';
import { groupBy } from '@src/utils/helper.functions';

@Resolver('Employees')
export class EmployeesResolver {
  constructor(
    private _db: DatabaseService,
    private _employee: EmployeeService,
  ) {}

  // Following query addresses the first point of coding challenge
  @Query(() => [BenifitsOfEmployeesByCompany], {
    nullable: false,
    description: 'First point of challenge.',
  })
  firstPoint(
    @Args('months', { type: () => [Number] }) months: number[],
    @Args('remainingAmount', { type: () => Number }) remainingAmount: number,
  ) {
    const orders = this._db.getData<Order>('Order');
    const employees = this._db.getData<Employee>('Employee');

    // Get orders of specific months
    // Narrowing down the list by filtering out only concerned months
    const ordersOfEachEmployee = this._employee.getMonthlyOrdersOfEmployees(
      orders,
      employees,
      months,
    );

    // Do calculations only on the narrowed items
    const results = this._employee.calculateExpenditures(
      ordersOfEachEmployee,
      remainingAmount,
    );

    return results;
  }

  // Following query addresses the second point of coding challenge
  @Query(() => [BenifitsOfEmployeesByCompany], {
    nullable: false,
    description: 'Second point of challenge.',
  })
  secondPoint(
    @Args('months', { type: () => [Number] }) months: number[],
    @Args('companyId', { type: () => Number }) companyId: number,
  ) {
    const orders = this._db.getData<Order>('Order');

    // Get employees of a specific company
    // Filtering out only concerned employees
    const employees = this._db
      .getData<Employee>('Employee')
      .filter(({ companyId: empCompanyId }) => empCompanyId === companyId);

    // Get orders of specific months
    // Filtering out only concerned months
    const ordersOfEachEmployee = this._employee.getMonthlyOrdersOfEmployees(
      orders,
      employees,
      months,
    );

    // Do calculations only on the narrowed items
    const results = this._employee.calculateExpenditures(ordersOfEachEmployee);

    return results;
  }

  // Following query addresses the first point of coding challenge
  @Query(() => [RevenuePerPartner], {
    nullable: false,
    description: 'Third point of challenge.',
  })
  thirdPoint() {
    const vouchers = this._db.getData<Voucher>('Voucher');

    // Group the vouchers by partnerId
    const vouchersPerPartner = groupBy<Voucher>(vouchers, 'partnerId', true);

    // Iterate over each partner's vouchers and sum up the amount
    const revenuePerPartner = Object.entries(vouchersPerPartner).map(
      ([partnerId, vouchers]) => {
        const revenue = vouchers.reduce(
          (sum, voucher) => (sum += voucher.amount),
          0,
        );

        return {
          partnerId,
          revenue,
        };
      },
    );

    return revenuePerPartner;
  }

  @Query(() => [Company], {
    nullable: false,
    description: 'Get all companies.',
  })
  companies() {
    return this._db.getData<Company>('Company');
  }

  @Query(() => [Employee], {
    nullable: false,
    description: 'Get all employees.',
  })
  employees() {
    return this._db.getData<Employee>('Employee');
  }

  @Query(() => [Order], {
    nullable: false,
    description: 'Get all orders.',
  })
  orders() {
    return this._db.getData<Order>('Order');
  }

  @Query(() => [Partner], {
    nullable: false,
    description: 'Get all partners.',
  })
  partners() {
    return this._db.getData<Partner>('Partner');
  }

  @Query(() => [Voucher], {
    nullable: false,
    description: 'Get all vouchers.',
  })
  vouchers() {
    return this._db.getData<Voucher>('Voucher');
  }

  // calculateExpenditures(
  //   employeesWithOrders: {
  //     orders: Order[];
  //     id: number;
  //     name: string;
  //     budget: number;
  //     companyId: number;
  //   }[],
  //   remainingAmount?: number,
  // ) {
  //   const finalEmployeeList: EmployeeExpenditure[] = [];

  //   employeesWithOrders.map(({ id: employeeId, orders }) => {
  //     const budget = this.employeesDict[employeeId].budget;

  //     // Calculate remaining amount by iterating overs employee orders
  //     const expenditure = orders.reduce(
  //       (stats, order) => {
  //         stats = {
  //           remaining:
  //             stats.remaining - this.vouchersDict[order.voucherId].amount,
  //           spent: stats.spent + this.vouchersDict[order.voucherId].amount,
  //           budget,
  //         };
  //         return stats;
  //       },
  //       { budget, spent: 0, remaining: budget },
  //     );

  //     const payload: EmployeeExpenditure = {
  //       employee: this.employeesDict[employeeId],
  //       orders,
  //       month: orders[0]?.date.getMonth() + 1,
  //       companyId: this.employeesDict[employeeId].companyId,
  //       expenditure,
  //       taxDistribution: {
  //         taxFree: CONSTANTS.TAX_FREE_AMOUNT,
  //         taxable: expenditure.spent - CONSTANTS.TAX_FREE_AMOUNT,
  //       },
  //     };

  //     if (!remainingAmount || expenditure.remaining >= remainingAmount) {
  //       finalEmployeeList.push(payload);
  //     }

  //     return payload;
  //   });

  //   const grouping = groupBy<EmployeeExpenditure>(
  //     finalEmployeeList,
  //     'companyId',
  //     true,
  //   );

  //   const responsePayload = Object.entries(
  //     grouping,
  //   ).map<BenifitsOfEmployeesByCompany>(([companyId, employees]) => ({
  //     companyId,
  //     employees,
  //   }));

  //   return responsePayload;
  // }
}

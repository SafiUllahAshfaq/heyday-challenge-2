import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Order } from './order';

@ObjectType()
export class Employee {
  @Field(() => ID)
  id!: number;

  @Field()
  name!: string;

  @Field()
  budget!: number;

  @Field()
  companyId!: number;
}

@ObjectType()
export class TaxDistrubution {
  @Field()
  taxFree!: number;

  @Field()
  taxable!: number;
}

@ObjectType()
export class Expenditure {
  @Field()
  budget!: number;

  @Field()
  spent!: number;

  @Field()
  remaining!: number;
}

@ObjectType()
export class EmployeeExpenditure {
  @Field()
  employee!: Employee;

  @Field(() => [Order])
  orders!: Order[];

  @Field()
  month!: number;

  @Field(() => Expenditure)
  expenditure!: Expenditure;

  @Field(() => TaxDistrubution)
  taxDistribution!: TaxDistrubution;

  @Field()
  companyId!: number;
}

@ObjectType('BenifitsOfEmployeesByCompany')
export class BenifitsOfEmployeesByCompany {
  @Field(() => ID)
  companyId!: number | string;

  @Field(() => [EmployeeExpenditure])
  employees!: EmployeeExpenditure[];
}

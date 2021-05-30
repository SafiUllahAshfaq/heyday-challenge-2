import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesResolver } from '@src/resolvers/employee';

describe(EmployeesResolver.name, () => {
  let employeeResolver: EmployeesResolver;

  beforeEach(async () => {
    const employee: TestingModule = await Test.createTestingModule({
      providers: [EmployeesResolver],
    }).compile();

    employeeResolver = employee.get<EmployeesResolver>(EmployeesResolver);
  });

  describe('employeeInfo', () => {
    it('should return the employee info', () => {
      const expected = 'heyday tech challenge starter';
      expect(employeeResolver.employees()).toBe(expected);
    });
  });
});

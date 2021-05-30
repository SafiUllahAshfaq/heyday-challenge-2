import { Injectable } from '@nestjs/common';

import companies from '../../data/companies';
import employees from '../../data/employees';
import orders from '../../data/orders';
import partners from '../../data/partners';
import vouchers from '../../data/vouchers';

@Injectable()
export class DatabaseService {
  getData<T>(entity: 'Company' | 'Employee' | 'Order' | 'Partner' | 'Voucher') {
    let records;

    switch (entity) {
      case 'Company':
        records = companies;
        break;
      case 'Employee':
        records = employees;
        break;
      case 'Order':
        records = orders;
        break;
      case 'Partner':
        records = partners;
        break;
      case 'Voucher':
        records = vouchers;
        break;
    }

    return records as unknown as T[];
  }
}

import {TestBed} from '@angular/core/testing';

import {ProductReportsService} from './product-reports.service';

describe('ProductreportsService', () => {
  let service: ProductReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

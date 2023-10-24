import { TestBed } from '@angular/core/testing';

import { ProductshttpService } from './productshttp.service';

describe('ProductshttpService', () => {
  let service: ProductshttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductshttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

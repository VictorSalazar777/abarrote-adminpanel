import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductreportsComponent } from './productreports.component';

describe('ProductreportsComponent', () => {
  let component: ProductreportsComponent;
  let fixture: ComponentFixture<ProductreportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductreportsComponent]
    });
    fixture = TestBed.createComponent(ProductreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

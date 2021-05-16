import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListSubAssetComponent } from './order-list-sub-asset.component';

describe('OrderListSubAssetComponent', () => {
  let component: OrderListSubAssetComponent;
  let fixture: ComponentFixture<OrderListSubAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderListSubAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListSubAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListAssetComponent } from './order-list-asset.component';

describe('ReceiveOrderComponent', () => {
  let component: OrderListAssetComponent;
  let fixture: ComponentFixture<OrderListAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderListAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

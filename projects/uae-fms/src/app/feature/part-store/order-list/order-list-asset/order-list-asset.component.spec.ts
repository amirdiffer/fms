import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:projects/uae-fms/src/app/feature/part-store/order-list/receive-order/receive-order.component.spec.ts
import { ReceiveOrderComponent } from './receive-order.component';

describe('ReceiveOrderComponent', () => {
  let component: ReceiveOrderComponent;
  let fixture: ComponentFixture<ReceiveOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiveOrderComponent ]
=======
import { OrderListAssetComponent } from './order-list-asset.component';

describe('OrderListAssetComponent', () => {
  let component: OrderListAssetComponent;
  let fixture: ComponentFixture<OrderListAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderListAssetComponent ]
>>>>>>> 9bf074771bcde44d03a2b4f52976d0bc30b91cd2:projects/uae-fms/src/app/feature/part-store/order-list/order-list-asset/order-list-asset.component.spec.ts
    })
    .compileComponents();
  });

  beforeEach(() => {
<<<<<<< HEAD:projects/uae-fms/src/app/feature/part-store/order-list/receive-order/receive-order.component.spec.ts
    fixture = TestBed.createComponent(ReceiveOrderComponent);
=======
    fixture = TestBed.createComponent(OrderListAssetComponent);
>>>>>>> 9bf074771bcde44d03a2b4f52976d0bc30b91cd2:projects/uae-fms/src/app/feature/part-store/order-list/order-list-asset/order-list-asset.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

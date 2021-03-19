import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceShopComponent } from './service-shop.component';

describe('BodyShopComponent', () => {
  let component: ServiceShopComponent;
  let fixture: ComponentFixture<ServiceShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceShopComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceShopAddLocationComponent } from './add-location.component';

describe('AddLocationComponent', () => {
  let component: ServiceShopAddLocationComponent;
  let fixture: ComponentFixture<ServiceShopAddLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceShopAddLocationComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceShopAddLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

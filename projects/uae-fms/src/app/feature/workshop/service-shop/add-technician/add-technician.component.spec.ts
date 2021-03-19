import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceShopAddTechnicianComponent } from './add-technician.component';

describe('AddTechnicianComponent', () => {
  let component: ServiceShopAddTechnicianComponent;
  let fixture: ComponentFixture<ServiceShopAddTechnicianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceShopAddTechnicianComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceShopAddTechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

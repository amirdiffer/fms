import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceServiceComponent } from './maintenance-service.component';

describe('MaintenanceServiceComponent', () => {
  let component: MaintenanceServiceComponent;
  let fixture: ComponentFixture<MaintenanceServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

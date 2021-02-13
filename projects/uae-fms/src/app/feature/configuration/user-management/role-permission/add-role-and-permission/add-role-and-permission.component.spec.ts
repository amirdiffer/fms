import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoleAndPermissionComponent } from './add-role-and-permission.component';

describe('AddRoleAndPermissionComponent', () => {
  let component: AddRoleAndPermissionComponent;
  let fixture: ComponentFixture<AddRoleAndPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRoleAndPermissionComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoleAndPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

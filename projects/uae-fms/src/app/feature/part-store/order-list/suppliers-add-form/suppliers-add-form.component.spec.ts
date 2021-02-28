import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersAddFormComponent } from './suppliers-add-form.component';

describe('SuppliersAddFormComponent', () => {
  let component: SuppliersAddFormComponent;
  let fixture: ComponentFixture<SuppliersAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppliersAddFormComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliersAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

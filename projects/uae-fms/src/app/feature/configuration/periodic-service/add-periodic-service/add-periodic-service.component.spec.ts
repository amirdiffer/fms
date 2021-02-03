import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPeriodicServiceComponent } from './add-periodic-service.component';

describe('AddPeriodicServiceComponent', () => {
  let component: AddPeriodicServiceComponent;
  let fixture: ComponentFixture<AddPeriodicServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPeriodicServiceComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPeriodicServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

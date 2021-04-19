import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopJobTypeComponent } from './workshop-job-type.component';

describe('WorkshopJobTypeComponent', () => {
  let component: WorkshopJobTypeComponent;
  let fixture: ComponentFixture<WorkshopJobTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkshopJobTypeComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopJobTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

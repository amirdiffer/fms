import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderComponent } from './reminder.component';

<<<<<<< HEAD
=======
<<<<<<< HEAD:projects/uae-fms/src/app/feature/dashboard/work-shop-overview/job-card/job-card.component.spec.ts
describe('JobCardComponent', () => {
  let component: JobCardComponent;
  let fixture: ComponentFixture<JobCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobCardComponent ]
=======
>>>>>>> 9ae3f4449a43fe513ce326ea5d04b946fdf4c6eb
describe('ReminderComponent', () => {
  let component: ReminderComponent;
  let fixture: ComponentFixture<ReminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReminderComponent ]
<<<<<<< HEAD
=======
>>>>>>> 9ae3f4449a43fe513ce326ea5d04b946fdf4c6eb:projects/uae-fms/src/app/feature/fleet/assets/overview-asset/infoComponents/reminder/reminder.component.spec.ts
>>>>>>> 9ae3f4449a43fe513ce326ea5d04b946fdf4c6eb
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

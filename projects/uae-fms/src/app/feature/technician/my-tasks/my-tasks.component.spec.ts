import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD
=======
<<<<<<< HEAD:projects/uae-fms/src/app/feature/dashboard/work-shop-overview/job-type/job-type.component.spec.ts
import { JobTypeComponent } from './job-type.component';

describe('JobTypeComponent', () => {
  let component: JobTypeComponent;
  let fixture: ComponentFixture<JobTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobTypeComponent ]
=======
>>>>>>> 9ae3f4449a43fe513ce326ea5d04b946fdf4c6eb
import { MyTasksComponent } from './my-tasks.component';

describe('MyTasksComponent', () => {
  let component: MyTasksComponent;
  let fixture: ComponentFixture<MyTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTasksComponent ]
<<<<<<< HEAD
=======
>>>>>>> 9ae3f4449a43fe513ce326ea5d04b946fdf4c6eb:projects/uae-fms/src/app/feature/technician/my-tasks/my-tasks.component.spec.ts
>>>>>>> 9ae3f4449a43fe513ce326ea5d04b946fdf4c6eb
    })
    .compileComponents();
  });

  beforeEach(() => {
<<<<<<< HEAD
    fixture = TestBed.createComponent(MyTasksComponent);
=======
<<<<<<< HEAD:projects/uae-fms/src/app/feature/dashboard/work-shop-overview/job-type/job-type.component.spec.ts
    fixture = TestBed.createComponent(JobTypeComponent);
=======
    fixture = TestBed.createComponent(MyTasksComponent);
>>>>>>> 9ae3f4449a43fe513ce326ea5d04b946fdf4c6eb:projects/uae-fms/src/app/feature/technician/my-tasks/my-tasks.component.spec.ts
>>>>>>> 9ae3f4449a43fe513ce326ea5d04b946fdf4c6eb
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

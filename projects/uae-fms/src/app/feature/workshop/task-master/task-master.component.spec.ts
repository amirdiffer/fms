import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskMasterComponent } from './task-master.component';

describe('TaskMasterComponent', () => {
  let component: TaskMasterComponent;
  let fixture: ComponentFixture<TaskMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskMasterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

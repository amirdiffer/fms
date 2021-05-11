import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCardOverviewComponent } from './job-card-overview.component';

describe('JobCardOverviewComponent', () => {
  let component: JobCardOverviewComponent;
  let fixture: ComponentFixture<JobCardOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobCardOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCardOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

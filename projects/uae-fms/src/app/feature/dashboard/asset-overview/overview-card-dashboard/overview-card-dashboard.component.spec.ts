import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewCardDashboardComponent } from './overview-card-dashboard.component';

describe('OverviewCardDashboardComponent', () => {
  let component: OverviewCardDashboardComponent;
  let fixture: ComponentFixture<OverviewCardDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewCardDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewCardDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

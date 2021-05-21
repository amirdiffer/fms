import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAlertDashboardComponent } from './card-alert-dashboard.component';

describe('CardAlertDashboardComponent', () => {
  let component: CardAlertDashboardComponent;
  let fixture: ComponentFixture<CardAlertDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardAlertDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardAlertDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

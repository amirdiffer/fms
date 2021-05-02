import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCardDashboardComponent } from './detail-card-dashboard.component';

describe('DetailCardDashboardComponent', () => {
  let component: DetailCardDashboardComponent;
  let fixture: ComponentFixture<DetailCardDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCardDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCardDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

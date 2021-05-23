import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMiniCardDashboardComponent } from './detail-mini-card-dashboard.component';

describe('DetailMiniCardDashboardComponent', () => {
  let component: DetailMiniCardDashboardComponent;
  let fixture: ComponentFixture<DetailMiniCardDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailMiniCardDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMiniCardDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

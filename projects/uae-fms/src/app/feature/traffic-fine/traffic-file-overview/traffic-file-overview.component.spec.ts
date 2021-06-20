import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficFileOverviewComponent } from './traffic-file-overview.component';

describe('TrafficFileOverviewComponent', () => {
  let component: TrafficFileOverviewComponent;
  let fixture: ComponentFixture<TrafficFileOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrafficFileOverviewComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficFileOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

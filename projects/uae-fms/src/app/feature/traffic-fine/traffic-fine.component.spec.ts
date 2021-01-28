import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficFineComponent } from './traffic-fine.component';

describe('TrafficFineComponent', () => {
  let component: TrafficFineComponent;
  let fixture: ComponentFixture<TrafficFineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrafficFineComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficFineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficFileNumberComponent } from './traffic-file-number.component';

describe('TrafficFileNumberComponent', () => {
  let component: TrafficFileNumberComponent;
  let fixture: ComponentFixture<TrafficFileNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrafficFileNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficFileNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

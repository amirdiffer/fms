import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetStatusComponent } from './fleet-status.component';

describe('FleetStatusComponent', () => {
  let component: FleetStatusComponent;
  let fixture: ComponentFixture<FleetStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FleetStatusComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

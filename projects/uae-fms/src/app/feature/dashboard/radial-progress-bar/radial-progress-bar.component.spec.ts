import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadialProgressBarComponent } from './radial-progress-bar.component';

describe('RadialProgressBarComponent', () => {
  let component: RadialProgressBarComponent;
  let fixture: ComponentFixture<RadialProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RadialProgressBarComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadialProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

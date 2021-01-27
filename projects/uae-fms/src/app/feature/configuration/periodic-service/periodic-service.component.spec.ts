import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicServiceComponent } from './periodic-service.component';

describe('PeriodicServiceComponent', () => {
  let component: PeriodicServiceComponent;
  let fixture: ComponentFixture<PeriodicServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeriodicServiceComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodicServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

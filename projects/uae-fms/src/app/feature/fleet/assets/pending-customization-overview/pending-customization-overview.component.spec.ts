import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingCustomizationOverviewComponent } from './pending-customization-overview.component';

describe('PendingCustomizationOverviewComponent', () => {
  let component: PendingCustomizationOverviewComponent;
  let fixture: ComponentFixture<PendingCustomizationOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PendingCustomizationOverviewComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingCustomizationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

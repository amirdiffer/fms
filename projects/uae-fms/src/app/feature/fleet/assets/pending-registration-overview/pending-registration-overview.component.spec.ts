import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRegistrationOverviewComponent } from './pending-registration-overview.component';

describe('PendingRegistrationOverviewComponent', () => {
  let component: PendingRegistrationOverviewComponent;
  let fixture: ComponentFixture<PendingRegistrationOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PendingRegistrationOverviewComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingRegistrationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

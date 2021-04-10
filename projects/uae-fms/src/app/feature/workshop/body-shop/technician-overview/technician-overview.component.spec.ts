import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianOverviewComponent } from './technician-overview.component';

describe('TechnicianOverviewComponent', () => {
  let component: TechnicianOverviewComponent;
  let fixture: ComponentFixture<TechnicianOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicianOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicianOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

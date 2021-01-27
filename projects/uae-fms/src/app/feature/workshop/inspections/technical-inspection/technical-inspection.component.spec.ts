import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalInspectionComponent } from './technical-inspection.component';

describe('TechnicalInspectionComponent', () => {
  let component: TechnicalInspectionComponent;
  let fixture: ComponentFixture<TechnicalInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicalInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

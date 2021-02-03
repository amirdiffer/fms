import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelCardTableComponent } from './fuel-card-table.component';

describe('FuelCardTableComponent', () => {
  let component: FuelCardTableComponent;
  let fixture: ComponentFixture<FuelCardTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FuelCardTableComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelCardTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFuelCardComponent } from './add-fuel-card.component';

describe('AddFuelCardComponent', () => {
  let component: AddFuelCardComponent;
  let fixture: ComponentFixture<AddFuelCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddFuelCardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFuelCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

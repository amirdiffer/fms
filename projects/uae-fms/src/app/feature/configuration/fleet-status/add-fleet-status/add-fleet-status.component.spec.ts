import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFleetStatusComponent } from './add-fleet-status.component';

describe('AddFleetStatusComponent', () => {
  let component: AddFleetStatusComponent;
  let fixture: ComponentFixture<AddFleetStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddFleetStatusComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFleetStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

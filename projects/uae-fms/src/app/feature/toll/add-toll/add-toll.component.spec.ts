import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTollComponent } from './add-toll.component';

describe('AddTollComponent', () => {
  let component: AddTollComponent;
  let fixture: ComponentFixture<AddTollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTollComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

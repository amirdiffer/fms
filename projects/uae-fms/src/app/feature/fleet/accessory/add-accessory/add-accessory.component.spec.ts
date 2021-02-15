import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccessoryComponent } from './add-accessory.component';

describe('AddAccessoryComponent', () => {
  let component: AddAccessoryComponent;
  let fixture: ComponentFixture<AddAccessoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAccessoryComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccessoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

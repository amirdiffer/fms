import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMakeComponent } from './add-make.component';

describe('AddMakeComponent', () => {
  let component: AddMakeComponent;
  let fixture: ComponentFixture<AddMakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMakeComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

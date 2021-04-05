import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrimComponent } from './add-trim.component';

describe('AddTrimComponent', () => {
  let component: AddTrimComponent;
  let fixture: ComponentFixture<AddTrimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTrimComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

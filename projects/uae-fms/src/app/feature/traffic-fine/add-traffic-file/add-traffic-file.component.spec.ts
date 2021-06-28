import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrafficFileComponent } from './add-traffic-file.component';

describe('AddTrafficFileComponent', () => {
  let component: AddTrafficFileComponent;
  let fixture: ComponentFixture<AddTrafficFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTrafficFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrafficFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

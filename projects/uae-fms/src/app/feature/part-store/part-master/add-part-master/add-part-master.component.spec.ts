import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartMasterComponent } from './add-part-master.component';

describe('AddPartMasterComponent', () => {
  let component: AddPartMasterComponent;
  let fixture: ComponentFixture<AddPartMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPartMasterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPartMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

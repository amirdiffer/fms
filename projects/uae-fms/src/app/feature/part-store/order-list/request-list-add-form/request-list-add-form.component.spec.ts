import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestListAddFormComponent } from './request-list-add-form.component';

describe('RequestListAddFormComponent', () => {
  let component: RequestListAddFormComponent;
  let fixture: ComponentFixture<RequestListAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestListAddFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestListAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

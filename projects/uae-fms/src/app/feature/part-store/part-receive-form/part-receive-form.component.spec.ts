import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartReceiveFormComponent } from './part-receive-form.component';

describe('PartReceiveFormComponent', () => {
  let component: PartReceiveFormComponent;
  let fixture: ComponentFixture<PartReceiveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartReceiveFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartReceiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

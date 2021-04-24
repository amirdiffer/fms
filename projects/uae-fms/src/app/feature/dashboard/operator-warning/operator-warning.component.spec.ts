import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorWarningComponent } from './operator-warning.component';

describe('OperatorWarningComponent', () => {
  let component: OperatorWarningComponent;
  let fixture: ComponentFixture<OperatorWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperatorWarningComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

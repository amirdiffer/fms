import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverViewOperatorComponent } from './over-view-operator.component';

describe('OverViewOperatorComponent', () => {
  let component: OverViewOperatorComponent;
  let fixture: ComponentFixture<OverViewOperatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverViewOperatorComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverViewOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

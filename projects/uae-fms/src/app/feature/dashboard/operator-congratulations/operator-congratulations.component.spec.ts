import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorCongratulationsComponent } from './operator-congratulations.component';

describe('OperatorCongratulationsComponent', () => {
  let component: OperatorCongratulationsComponent;
  let fixture: ComponentFixture<OperatorCongratulationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperatorCongratulationsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorCongratulationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

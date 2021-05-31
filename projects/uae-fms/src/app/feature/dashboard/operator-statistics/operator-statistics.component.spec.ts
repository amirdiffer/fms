import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorStatisticsComponent } from './operator-statistics.component';

describe('OperatorStatisticsComponent', () => {
  let component: OperatorStatisticsComponent;
  let fixture: ComponentFixture<OperatorStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperatorStatisticsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

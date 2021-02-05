import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDecisionComponent } from './detail-decision.component';

describe('DetailDecisionComponent', () => {
  let component: DetailDecisionComponent;
  let fixture: ComponentFixture<DetailDecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailDecisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

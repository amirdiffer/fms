import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalOverviewComponent } from './technical-overview.component';

describe('TechnicalOverviewComponent', () => {
  let component: TechnicalOverviewComponent;
  let fixture: ComponentFixture<TechnicalOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicalOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkShopOverviewComponent } from './work-shop-overview.component';

describe('WorkShopOverviewComponent', () => {
  let component: WorkShopOverviewComponent;
  let fixture: ComponentFixture<WorkShopOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkShopOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkShopOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

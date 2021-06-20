import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetOverviewComponent } from './asset-overview.component';

describe('AssetOverviewComponent', () => {
  let component: AssetOverviewComponent;
  let fixture: ComponentFixture<AssetOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssetOverviewComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetUsageTableComponent } from './asset-usage-table.component';

describe('AssetUsageTableComponent', () => {
  let component: AssetUsageTableComponent;
  let fixture: ComponentFixture<AssetUsageTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssetUsageTableComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetUsageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

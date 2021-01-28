import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetStatusAssetTableComponent } from './fleet-status-asset-table.component';

describe('FleetStatusTableComponent', () => {
  let component: FleetStatusAssetTableComponent;
  let fixture: ComponentFixture<FleetStatusAssetTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FleetStatusAssetTableComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetStatusAssetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

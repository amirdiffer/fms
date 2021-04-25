import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAssetOverviewComponent } from './sub-asset-overview.component';

describe('SubAssetOverviewComponent', () => {
  let component: SubAssetOverviewComponent;
  let fixture: ComponentFixture<SubAssetOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubAssetOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAssetOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

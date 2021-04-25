import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAssetDetailComponent } from './sub-asset-detail.component';

describe('SubAssetDetailComponent', () => {
  let component: SubAssetDetailComponent;
  let fixture: ComponentFixture<SubAssetDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubAssetDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAssetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

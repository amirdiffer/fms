import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartListSubAssetComponent } from './part-list-sub-asset.component';

describe('PartListSubAssetComponent', () => {
  let component: PartListSubAssetComponent;
  let fixture: ComponentFixture<PartListSubAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartListSubAssetComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartListSubAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

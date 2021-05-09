import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartListAssetComponent } from './part-list-asset.component';

describe('PartListAssetComponent', () => {
  let component: PartListAssetComponent;
  let fixture: ComponentFixture<PartListAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartListAssetComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartListAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

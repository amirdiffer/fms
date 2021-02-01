import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubAssetComponent } from './add-sub-asset.component';

describe('AddSubAssetComponent', () => {
  let component: AddSubAssetComponent;
  let fixture: ComponentFixture<AddSubAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSubAssetComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

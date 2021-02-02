import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssetPolicyComponent } from './add-asset-policy.component';

describe('AddAssetPolicyComponent', () => {
  let component: AddAssetPolicyComponent;
  let fixture: ComponentFixture<AddAssetPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAssetPolicyComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssetPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

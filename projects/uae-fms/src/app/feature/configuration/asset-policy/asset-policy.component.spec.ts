import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetPolicyComponent } from './asset-policy.component';

describe('AssetPolicyComponent', () => {
  let component: AssetPolicyComponent;
  let fixture: ComponentFixture<AssetPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssetPolicyComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetRegistrationConfirmComponent } from './asset-registration-confirm.component';

describe('AssetRegistrationConfirmComponent', () => {
  let component: AssetRegistrationConfirmComponent;
  let fixture: ComponentFixture<AssetRegistrationConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssetRegistrationConfirmComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetRegistrationConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

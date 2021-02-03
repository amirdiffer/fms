import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetConfigurationComponent } from './asset-configuration.component';

describe('AssetConfigurationComponent', () => {
  let component: AssetConfigurationComponent;
  let fixture: ComponentFixture<AssetConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssetConfigurationComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsedAssetComponent } from './used-asset.component';

describe('UsedAssetComponent', () => {
  let component: UsedAssetComponent;
  let fixture: ComponentFixture<UsedAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsedAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsedAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

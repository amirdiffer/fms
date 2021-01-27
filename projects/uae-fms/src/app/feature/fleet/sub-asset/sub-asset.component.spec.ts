import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAssetComponent } from './sub-asset.component';

describe('SubAssetComponent', () => {
  let component: SubAssetComponent;
  let fixture: ComponentFixture<SubAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubAssetComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

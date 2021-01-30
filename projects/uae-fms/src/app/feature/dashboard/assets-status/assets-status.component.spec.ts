import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsStatusComponent } from './assets-status.component';

describe('AssetsStatusComponent', () => {
  let component: AssetsStatusComponent;
  let fixture: ComponentFixture<AssetsStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssetsStatusComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

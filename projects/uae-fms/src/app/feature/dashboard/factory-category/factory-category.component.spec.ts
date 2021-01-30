import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryCategoryComponent } from './factory-category.component';

describe('FactoryCategoryComponent', () => {
  let component: FactoryCategoryComponent;
  let fixture: ComponentFixture<FactoryCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FactoryCategoryComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

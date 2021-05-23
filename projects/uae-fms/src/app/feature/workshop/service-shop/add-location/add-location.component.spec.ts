import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLocationServiceShopComponent } from './add-location.component';

describe('AddLocationComponent', () => {
  let component: AddLocationServiceShopComponent;
  let fixture: ComponentFixture<AddLocationServiceShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddLocationServiceShopComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLocationServiceShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

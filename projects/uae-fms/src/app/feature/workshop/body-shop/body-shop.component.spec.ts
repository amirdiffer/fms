import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyShopComponent } from './body-shop.component';

describe('BodyShopComponent', () => {
  let component: BodyShopComponent;
  let fixture: ComponentFixture<BodyShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BodyShopComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

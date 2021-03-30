import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceShopAddRequestComponent } from './add-request.component';

describe('AddRequestComponent', () => {
  let component: ServiceShopAddRequestComponent;
  let fixture: ComponentFixture<ServiceShopAddRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceShopAddRequestComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceShopAddRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIntegrationComponent } from './add-integration.component';

describe('AddIntegrationComponent', () => {
  let component: AddIntegrationComponent;
  let fixture: ComponentFixture<AddIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIntegrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

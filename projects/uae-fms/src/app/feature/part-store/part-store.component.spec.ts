import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartStoreComponent } from './part-store.component';

describe('PartStoreComponent', () => {
  let component: PartStoreComponent;
  let fixture: ComponentFixture<PartStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartStoreComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

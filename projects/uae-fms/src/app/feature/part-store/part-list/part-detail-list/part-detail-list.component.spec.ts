import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartDetailListComponent } from './part-detail-list.component';

describe('PartDetailListComponent', () => {
  let component: PartDetailListComponent;
  let fixture: ComponentFixture<PartDetailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartDetailListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementHistoryComponent } from './movement-history.component';

describe('MovementHistoryComponent', () => {
  let component: MovementHistoryComponent;
  let fixture: ComponentFixture<MovementHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovementHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

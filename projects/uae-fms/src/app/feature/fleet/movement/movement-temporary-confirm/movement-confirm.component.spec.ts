import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementConfirmComponent } from './movement-confirm.component';

describe('MovementConfirmComponent', () => {
  let component: MovementConfirmComponent;
  let fixture: ComponentFixture<MovementConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovementConfirmComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

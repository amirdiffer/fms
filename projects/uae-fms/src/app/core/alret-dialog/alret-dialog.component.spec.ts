import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlretDialogComponent } from './alret-dialog.component';

describe('AlretDialogComponent', () => {
  let component: AlretDialogComponent;
  let fixture: ComponentFixture<AlretDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlretDialogComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlretDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

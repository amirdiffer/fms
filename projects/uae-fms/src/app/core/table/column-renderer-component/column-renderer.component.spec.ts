import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnRendererComponent } from './column-renderer.component';

describe('ColumnRendererComponent', () => {
  let component: ColumnRendererComponent;
  let fixture: ComponentFixture<ColumnRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColumnRendererComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

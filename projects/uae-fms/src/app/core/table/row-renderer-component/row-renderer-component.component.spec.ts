import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowRendererComponentComponent } from './row-renderer-component.component';

describe('RowRendererComponentComponent', () => {
  let component: RowRendererComponentComponent;
  let fixture: ComponentFixture<RowRendererComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RowRendererComponentComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RowRendererComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IservComponent } from './iserv.component';

describe('IservComponent', () => {
  let component: IservComponent;
  let fixture: ComponentFixture<IservComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IservComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IservComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

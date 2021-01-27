import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartMasterComponent } from './part-master.component';

describe('PartMasterComponent', () => {
  let component: PartMasterComponent;
  let fixture: ComponentFixture<PartMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

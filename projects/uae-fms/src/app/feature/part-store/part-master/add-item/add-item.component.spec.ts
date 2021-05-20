import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD
=======
<<<<<<< HEAD:projects/uae-fms/src/app/feature/dashboard/filter/filter.component.spec.ts
import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterComponent ]
=======
>>>>>>> 9ae3f4449a43fe513ce326ea5d04b946fdf4c6eb
import { AddItemComponent } from './add-item.component';

describe('AddItemComponent', () => {
  let component: AddItemComponent;
  let fixture: ComponentFixture<AddItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItemComponent ]
<<<<<<< HEAD
=======
>>>>>>> 9ae3f4449a43fe513ce326ea5d04b946fdf4c6eb:projects/uae-fms/src/app/feature/part-store/part-master/add-item/add-item.component.spec.ts
>>>>>>> 9ae3f4449a43fe513ce326ea5d04b946fdf4c6eb
    })
    .compileComponents();
  });

  beforeEach(() => {
<<<<<<< HEAD
    fixture = TestBed.createComponent(AddItemComponent);
=======
<<<<<<< HEAD:projects/uae-fms/src/app/feature/dashboard/filter/filter.component.spec.ts
    fixture = TestBed.createComponent(FilterComponent);
=======
    fixture = TestBed.createComponent(AddItemComponent);
>>>>>>> 9ae3f4449a43fe513ce326ea5d04b946fdf4c6eb:projects/uae-fms/src/app/feature/part-store/part-master/add-item/add-item.component.spec.ts
>>>>>>> 9ae3f4449a43fe513ce326ea5d04b946fdf4c6eb
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, Injector, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableSetting } from '@core/table';
import { Utility } from '@shared/utility/utility';
import {
  OrganizationFacade,
  OrganizationService
} from '@feature/fleet/+state/organization';
import { debounceTime, map, tap } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from '@core/dialog/dialog-template.component';

@Component({
  selector: 'anms-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.scss']
})
export class AddOrganizationComponent extends Utility implements OnInit {
  isEdit = false;
  id;

  organization_Table: TableSetting = {
    columns: [
      {
        lable: 'tables.column.section',
        type: 1,
        field: 'Section'
      },
      {
        lable: 'tables.column.location',
        type: 1,
        field: 'Location'
      },
      {
        lable: 'tables.column.tf_payed',
        sortable: true,
        type: 1,
        field: 'TF_Payed'
      },
      {
        lable: 'tables.column.tf_unpaid',
        sortable: true,
        type: 1,
        field: 'TF_Unpaid'
      },
      {
        lable: '<img src="assets/icons/operator.svg" class="icon24px">',
        type: 1,
        sortable: true,
        isIconLable: true,
        field: 'user',
        width: 100
      },
      {
        lable: '<img src="assets/icons/car-solid.svg" class="icon24px">',
        type: 1,
        sortable: true,
        isIconLable: true,
        field: 'car',
        width: 100
      }
    ],
    data: []
  };
  department = new Subject();
  departments$ = this.department.asObservable();
  departmentList = new Subject();
  organizationForm: FormGroup;
  submited: boolean;
  data$ = this.facade.organization$.pipe(
    map((x) => {
      return x.map((y) => {
        return {
          ...y,
          Organization: y.organizationName,
          Section: y.numOfDepartments,
          Location: y.numOfLocations,
          car: y.numOfAssets,
          user: y.numOfUsers,
          TF_Unpaid: y.tfUnpaid,
          TF_Payed: y.tfPaid
        };
      });
    })
  );
  get tags(): FormArray {
    return this.organizationForm.get('tags') as FormArray;
  }

  get section(): FormArray {
    return this.organizationForm.get('section') as FormArray;
  }

  constructor(
    injector: Injector,
    private _fb: FormBuilder,
    private facade: OrganizationFacade,
    private organizationService: OrganizationService,
    public route: ActivatedRoute,
    private _dialogService : DialogService
  ) {
    super(injector);
    this.facade.reset();
  }

  sectionLocation(index: number): FormArray {
    const section = this.organizationForm.get('section') as FormArray;
    return section.controls[index].get('locations') as FormArray;
  }

  ngOnInit(): void {
    // this.facade.loadAll();

    this.organizationForm = this._fb.group({
      departmentId: ['', [Validators.required]],
      departmentName: ['', [Validators.required]],
      tags: new FormArray([this.createTagField()]),
      section: new FormArray([this.createSection()])
    });
    this.departmentList.pipe(debounceTime(600)).subscribe((x) => {
      this.organizationService.searchDepartment(x['query']).subscribe((y) => {
        if (y) {
          this.department.next([y.message]);
        } else {
          this.department.next(null);
        }
      });
    });
    this.facade.submitted$.subscribe((x) => {
      if (x) {
        const dialog = this._dialogService.show('success' , 
          (this.isEdit ? 'Edit Department': 'Add New Department' ), 
          (this.isEdit ? 'Changes Saved Successfully' : 'Department Added Successfully'),'Ok')
          const dialogClose$:Subscription = dialog.dialogClosed$
          .pipe(
            tap((result) => {
            if (result === 'confirm') {
              this.router.navigate(['/fleet/department']).then(()=>{
                this.facade.loadAll();
              });
            }
            dialogClose$?.unsubscribe();
            })
          ).subscribe()

      }
    });
    this.facade.error$.subscribe((x) => {
      if (x) {
        const dialog = this._dialogService.show('danger' , 
          (this.isEdit ? 'Edit Department': 'Add New Department' ), 
          'We Have Some Error','Ok')
          const dialogClose$:Subscription = dialog.dialogClosed$
          .pipe(
            tap((result) => {
            if (result === 'confirm') {
            }
            dialogClose$?.unsubscribe();
            })
          ).subscribe()

      }
    });

    this.route.params.subscribe((z) => {
      if (!z?.id) return;
      this.isEdit = true;
      this.organizationService.searchDepartment(z.id).subscribe((x: any) => {
        const res = x.message;
        this.id = res.id;
        console.log(res)
        let f = this.organizationForm.get('tags') as FormArray;
        f.controls = [this.createTagField()];
        res.tags.forEach((a, i) => {
          f.controls.push(this.createTagField());
        });

        let g = this.organizationForm.get('section') as FormArray;
        g.controls = [];
        res.departments.forEach((a, i) => {
          g.controls.push(this.createSection());
          const l = g.controls[i].get('locations') as FormArray;
          l.controls = [];
          a.locationAddresses.forEach((b, j) => {
            l.controls.push(this.createSectionLocation());
          });

          this.organizationForm.patchValue({
            departmentId: res.organizationNumber,
            departmentName: res.organizationName,
            tags: res.tags.map((a) => ({ tag: a })),
            section: res.departments.map((a) => ({
              sectionName: a.name,
              locations: a.locationAddresses.map((b) => ({ location: b }))
            }))
          });

          this.organizationNumber = res.organizationNumber;
        });
      });
    });
  }

  createTagField(): FormGroup {
    return this._fb.group({
      tag: ['']
    });
  }

  createSection(): FormGroup {
    return this._fb.group({
      sectionName: ['', [Validators.required]],
      locations: new FormArray([this.createSectionLocation()])
    });
  }

  createSectionLocation(): FormGroup {
    return this._fb.group({
      location: ['', [Validators.required]]
    });
  }

  addTagField(value): void {
    if (value != '' && value != null) {
      this.tags.push(this.createTagField());
    }
  }
  removeTagField(index){
    this.tags.removeAt(index)
  }

  addSection(): void {
    if (this.section.invalid) {
      return;
    }
    this.section.push(this.createSection());
  }
  removeSection(index){
    this.section.removeAt(index);
  }

  addSectionLocation(index: number): void {
    if (this.sectionLocation(index).invalid) {
      return;
    }
    this.sectionLocation(index).push(this.createSectionLocation());
  }
  removeLocationField(index , j){
    this.sectionLocation(index).removeAt(j)
  }

  organizationNumber;
  filterDepartments(event) {
    this.organizationNumber = +event.query;
    this.departmentList.next(event);
  }
  organizationIDChanged($event) {}

  cancel(): void {
    const dialog = this._dialogService.show('warning' , 'Are you sure you want to leave?' , 'You have unsaved changes! If you leave, your changes will be lost.' , 'Yes','Cancel')
    const dialogClose$:Subscription = dialog.dialogClosed$
    .pipe(
      tap((result) => {
      if (result === 'confirm') {
        this._goToList();
      }
      dialogClose$?.unsubscribe();
      })
    ).subscribe();

  }

  submit() {
    this.submited = true;
    if (this.organizationForm.invalid) {
      return;
    } else {
      const dialog = this._dialogService.show('warning' , 
    (this.isEdit ? 'Edit Department' : 'Add New Department') ,
       (this.isEdit ? 'Are you sure you want to submit this changes?' : 'Are you sure you want to add new department?') , 'Yes','Cancel')
      const dialogClose$:Subscription = dialog.dialogClosed$
        .pipe(
          tap((result) => {
          if (result === 'confirm') {
            let formValue = this.organizationForm.getRawValue()
            let value = {
              organizationNumber: this.organizationNumber,
              organizationName: formValue.departmentName,
              tags: formValue.tags.map((x) => {
                return x.tag;
              }),
              departments: formValue.section.map((x) => {
                return {
                  name: x.sectionName,
                  locationAddresses: x.locations.map((y) => {
                    return y.location[0];
                  })
                };
              })
            };
            console.log(formValue)
            console.log(value)
            if(value.tags[value.tags.length -1] == ''){
              value.tags.splice(value.tags.length -1, 1)
            };
            if (this.isEdit) {
              this.facade.editOrganization({ ...value, id: this.id });
            } else {
              this.facade.addOrganization(value);
            }
          }
          dialogClose$?.unsubscribe();
        })
      ).subscribe();

    }
  }

  _goToList() {
    this.router.navigate(['fleet/department']);
    this.facade.reset();
  }
}

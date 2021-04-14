import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  OnInit
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableSetting } from '@core/table';
import { ButtonType } from '@core/table/table.component';
import { Utility } from '@shared/utility/utility';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import {
  OrganizationFacade,
  OrganizationService
} from '@feature/fleet/+state/organization';
import { debounceTime, map } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'anms-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddOrganizationComponent extends Utility implements OnInit {
  isEdit = false;
  id;

  dialogModal = false;
  dialogType = null;
  dialogSetting: IDialogAlert = {
    header: 'Add New Organization',
    hasError: false,
    message: 'Message is Here',
    confirmButton: 'Register Now',
    cancelButton: 'Cancel'
  };

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
    private changeDetection: ChangeDetectorRef,
    public route: ActivatedRoute
  ) {
    super(injector);
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
        this.dialogModal = true;
        this.dialogType = 'success';
        this.dialogSetting.header = 'Add new Organization';
        this.dialogSetting.message = 'Organization Added Successfully';
        this.dialogSetting.isWarning = false;
        this.dialogSetting.hasError = false;
        this.dialogSetting.confirmButton = 'Ok';
        this.dialogSetting.cancelButton = undefined;
        this.changeDetection.detectChanges();
      }
    });
    this.facade.error$.subscribe((x) => {
      if (x) {
        this.dialogModal = true;
        this.dialogType = 'error';
        this.dialogSetting.header = 'Error';
        this.dialogSetting.message = 'Error occurred in operation';
        this.dialogSetting.isWarning = false;
        this.dialogSetting.hasError = true;
        this.dialogSetting.confirmButton = 'Ok';
        this.dialogSetting.cancelButton = undefined;
        this.changeDetection.detectChanges();
      }
    });

    this.route.params.subscribe(z => {
      if (!z?.id) return;
      this.isEdit = true;
      this.organizationService.searchDepartment(z.id).subscribe((x: any) => {
        const res = x.message;
        this.id = res.id;

        let f = this.organizationForm.get('tags') as FormArray;
        f.controls = [];
        res.tags.forEach((a, i) => {
          f.controls.push(this.createTagField())
        })

        let g = this.organizationForm.get('section') as FormArray;
        g.controls = []
        res.departments.forEach((a, i) => {
          g.controls.push(this.createSection());
          const l = g.controls[i].get('locations') as FormArray;
          l.controls = [];
          a.locationAddresses.forEach((b, j) => {
            l.controls.push(this.createSectionLocation());
          })

          this.organizationForm.patchValue({
            departmentId: res.organizationNumber,
            departmentName: res.organizationName,
            tags: res.tags.map(a => ({ tag: a })),
            section: res.departments.map(a => ({
              sectionName: a.name,
              locations: a.locationAddresses.map(b => ({ location: b }))
            }))
          })

          this.organizationNumber = res.organizationNumber;
        })


        this.changeDetection.detectChanges();
      })
    })
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

  addSection(): void {
    if (this.section.invalid) {
      return;
    }
    this.section.push(this.createSection());
  }

  addSectionLocation(index: number): void {
    if (this.sectionLocation(index).invalid) {
      return;
    }
    this.sectionLocation(index).push(this.createSectionLocation());
  }

  organizationNumber;
  filterDepartments(event) {
    this.organizationNumber = +event.query;
    this.departmentList.next(event);
  }
  organizationIDChanged($event) { }

  dialogConfirm(event) {
    this.dialogModal = false;
    if (!event) {
      return;
    }
    if (this.dialogType == 'submit') {
      const value = {
        organizationNumber: this.organizationNumber,
        organizationName: this.organizationForm.value.departmentName,
        tags: this.organizationForm.value.tags.map((x) => {
          return x.tag;
        }),
        departments: this.organizationForm.value.section.map((x) => {
          return {
            name: x.sectionName,
            locationAddresses: x.locations.map((y) => {
              return y.location[0];
            })
          };
        })
      };

      if (this.isEdit) {
        this.facade.editOrganization({ ...value, id: this.id });
      } else {
        this.facade.addOrganization(value);
      }
    }
    if (this.dialogType == 'success') {
      this._goToList();
    }
    if (this.dialogType == null) {
      this._goToList();
    }
  }

  cancel(): void {
    this.dialogModal = true;
    this.dialogSetting.message =
      'Are you sure that you want to cancel the Department creation?';
    this.dialogSetting.hasError = false;
    this.dialogSetting.isWarning = true;
    this.dialogSetting.cancelButton = 'No';
    this.dialogSetting.confirmButton = 'Yes';
  }

  submit() {
    this.submited = true;
    if (this.organizationForm.invalid) {
      return;
    } else {
      this.dialogModal = true;
      this.dialogType = 'submit';
      this.dialogSetting.header = 'Add new organization';
      this.dialogSetting.isWarning = true;
      this.dialogSetting.hasError = false;
      this.dialogSetting.message =
        'Are you sure you want to add new Organization?';
      this.dialogSetting.confirmButton = 'Yes';
      this.dialogSetting.cancelButton = 'Cancel';
    }
  }

  _goToList() {
    this.router.navigate(['fleet/department']);
    this.facade.reset();
  }
}

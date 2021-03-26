import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableSetting } from '@core/table';
import { ButtonType } from '@core/table/table.component';
import { Utility } from '@shared/utility/utility';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';

@Component({
  selector: 'anms-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddOrganizationComponent extends Utility implements OnInit {
  dialogModal = false;

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
        lable:
          '<img src="../../../../assets/icons/operator.svg" class="icon24px">',
        type: 1,
        sortable: true,
        isIconLable: true,
        field: 'user',
        width: 100
      },
      {
        lable:
          '<img src="../../../../assets/icons/car-solid.svg" class="icon24px">',
        type: 1,
        sortable: true,
        isIconLable: true,
        field: 'car',
        width: 100
      },
      {
        lable: '',
        width: 70,
        type: 3,
        field: 'actionButton',
        renderer: 'button',
        buttonType: ButtonType.action
      }
    ],
    data: [
      {
        Section: 'Section`s Name is Here',
        Location: '2',
        TF_Payed: '123',
        TF_Unpaid: '12',
        user: '3456',
        car: '4326',
        actionButton: ''
      },
      {
        Section: 'Section`s Name is Here',
        Location: '2',
        TF_Payed: '123',
        TF_Unpaid: '12',
        user: '3456',
        car: '4326',
        actionButton: ''
      },
      {
        Section: 'Section`s Name is Here',
        Location: '2',
        TF_Payed: '123',
        TF_Unpaid: '12',
        user: '3456',
        car: '4326',
        actionButton: ''
      },
      {
        Section: 'Section`s Name is Here',
        Location: '2',
        TF_Payed: '123',
        TF_Unpaid: '12',
        user: '3456',
        car: '4326',
        actionButton: ''
      },
      {
        Section: 'Section`s Name is Here',
        Location: '2',
        TF_Payed: '123',
        TF_Unpaid: '12',
        user: '3456',
        car: '4326',
        actionButton: ''
      }
    ]
  };
  departments = [
    { name: 'Department 1', id: 1 },
    { name: 'Department 2', id: 2 },
    { name: 'Department 3', id: 3 },
    { name: 'Department 4', id: 4 },
    { name: 'Department 5', id: 5 },
    { name: 'Department 6', id: 6 }
  ];

  organizationForm: FormGroup;
  submited: boolean;

  get tags(): FormArray {
    return this.organizationForm.get('tags') as FormArray;
  }

  get section(): FormArray {
    return this.organizationForm.get('section') as FormArray;
  }

  constructor(injector: Injector, private _fb: FormBuilder) {
    super(injector);
  }

  sectionLocation(index: number): FormArray {
    const section = this.organizationForm.get('section') as FormArray;
    return section.controls[index].get('locations') as FormArray;
  }

  ngOnInit(): void {
    this.organizationForm = this._fb.group({
      departmentId: ['', [Validators.required]],
      departmentName: ['', [Validators.required]],
      tags: new FormArray([this.createTagField()]),
      section: new FormArray([this.createSection()])
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

  addTagField(): void {
    this.tags.push(this.createTagField());
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

  filterDepartments(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    this.departments = [
      { name: 'Department 1', id: 1 },
      { name: 'Department 2', id: 2 },
      { name: 'Department 3', id: 3 },
      { name: 'Department 4', id: 4 },
      { name: 'Department 5', id: 5 },
      { name: 'Department 6', id: 6 }
    ];
  }

  dialogConfirm(event) {
    this.dialogModal = false;
    if (event) {
      this.router.navigate(['/fleet/organization']).then();
      return;
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
    }

    this.dialogModal = true;
    this.dialogSetting.message = 'New organization added successfully';
    this.dialogSetting.hasError = false;
    this.dialogSetting.cancelButton = undefined;
    this.dialogSetting.confirmButton = 'OK';
    // this.goToList();
  }
}

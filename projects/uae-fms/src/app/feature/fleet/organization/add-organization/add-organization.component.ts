import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injector
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableSetting } from '@core/table';
import { Utility } from '@shared/utility/utility';

@Component({
  selector: 'anms-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddOrganizationComponent extends Utility implements OnInit {
  organization_Table: TableSetting = {
    columns: [
      {
        lable: 'Section',
        type: 1,
        field: 'Section'
      },
      {
        lable: 'Location',
        type: 1,
        field: 'Location'
      },
      {
        lable: 'TF Payed',
        sortable: true,
        type: 1,
        field: 'TF_Payed'
      },
      {
        lable: 'TF Unpaid',
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
        renderer: 'actionButtonRenderer'
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

  constructor(injector: Injector, private _fb: FormBuilder) {
    super(injector);
  }

  ngOnInit(): void {
    this.organizationForm = this._fb.group({
      departmentId: ['', [Validators.required]],
      departmentName: ['', [Validators.required]],
      tag: [''],
      sectionName: ['', [Validators.required]],
      location: ['', [Validators.required]]
    });
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

  submit() {
    this.submited = true;
    if (this.organizationForm.invalid) {
      return;
    }
    this.goToList();
  }
}

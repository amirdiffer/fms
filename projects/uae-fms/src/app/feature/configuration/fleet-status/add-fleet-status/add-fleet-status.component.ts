import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injector
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { TableSetting } from '@core/table';
import { Utility } from '@shared/utility/utility';

@Component({
  selector: 'anms-add-fleet-status',
  templateUrl: './add-fleet-status.component.html',
  styleUrls: ['./add-fleet-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddFleetStatusComponent extends Utility implements OnInit {
  isEdit: boolean = false;
  dialogSettingCancel: IDialogAlert = {
    header: 'Asset Policy',
    hasError: false,
    isWarning: true,
    hasHeader: true,
    message: 'Are you sure that you want to cancel the asset policy creation?',
    confirmButton: 'Yes',
    cancelButton: 'No'
  };

  dialogSettingAdd: IDialogAlert = {
    header: 'Asset Policy',
    hasError: false,
    isWarning: false,
    hasHeader: true,
    message: 'New Asset Policy Successfully Added',
    confirmButton: 'Yes',
    cancelButton: 'No'
  };

  dialogModalCancel: boolean = false;
  dialogModalAdd: boolean = false;

  tableSetting: TableSetting = {
    columns: [
      {
        lable: 'tables.column.status_category',
        field: 'Status_Category',
        type: 1
      },
      {
        lable: 'tables.column.status',
        field: 'status',
        type: 1
      },
      {
        lable: 'tables.column.tag',
        field: 'tag',
        type: 1
      },
      {
        lable: 'tables.column.usage',
        field: 'usage',
        type: 1
      }
    ],
    data: [
      {
        statusColor: '#009EFF',
        Status_Category: 'Inactive',
        status: 'Storage, Registration, Workshop',
        tag: 'Wait Permission',
        usage: '23345'
      },
      {
        statusColor: '#FCB614',
        Status_Category: 'Active',
        status: 'Available, Reuse',
        tag: 'Assigned',
        usage: '23345'
      },
      {
        statusColor: '#FE5F4F',
        Status_Category: 'X Fleet',
        status: 'End Contract, Total Loss, Auction',
        tag: 'Sell',
        usage: '23345'
      }
    ]
  };
  fleetStatusForm: FormGroup;
  submited = false;
  languagePrefix = 'fms.configuration.fleetStatus.';

  statusCategories = [
    { name: 'Category 1', id: 1 },
    { name: 'Category 2', id: 2 },
    { name: 'Category 3', id: 3 },
    { name: 'Category 4', id: 4 },
    { name: 'Category 5', id: 5 }
  ];
  currentTab: string;

  constructor(injector: Injector, private _fb: FormBuilder) {
    super(injector);
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.currentTab = params['id']
      }
    );
    this.route.url.subscribe(
      (params) => {
        console.log(params)
        this.isEdit = params.filter(x=>x.path=="edit-fleet-status").length > 0 ? true : false;
      }
    );
    this.fleetStatusForm = this._fb.group({
      typeCategory: ['asset'],
      statusCategory: ['', [Validators.required]],
      statusName: ['', [Validators.required]]
    });
  }

  dialogCancelConfirm(event) {
    if (event)
      this.router.navigate(['/configuration/fleet-status'], {
        relativeTo: this.route,
        queryParams: { id: 'fleetStatusAssetTab' }
      });
    else
      this.dialogModalCancel = false
  }

  dialogAddConfirm(event) {
    console.log(event)

    this.router.navigate(['/configuration/fleet-status'], {
      relativeTo: this.route,
      queryParams: { id: 'fleetStatusAssetTab' }
    });
  }

  getLabelName(field) {
    return this.languagePrefix + field;
  }

  submit() {
    this.submited = true;
    if (this.fleetStatusForm.invalid) {
      return;
    }
    this.dialogModalAdd = true;
  }

  cancel() {
    this.dialogModalCancel = true;
  }
}

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injector
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { RouterFacade } from '@core/router';
import { TableSetting } from '@core/table';
import { Utility } from '@shared/utility/utility';

@Component({
  selector: 'anms-add-asset-policy',
  templateUrl: './add-asset-policy.component.html',
  styleUrls: ['./add-asset-policy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddAssetPolicyComponent extends Utility implements OnInit {
  assetPolicy_Table: TableSetting = {
    columns: [
      { lable: 'tables.column.policy_name', type: 1, field: 'Policy_Name' },
      {
        lable: 'tables.column.distance',
        type: 1,
        field: 'Distance',
        sortable: true
      },
      { lable: 'tables.column.year', type: 1, field: 'Year', sortable: true },
      {
        lable: 'tables.column.depreciation_value',
        type: 1,
        field: 'Depreciation_Value',
        sortable: true
      },
      {
        lable: '',
        field: 'floatButton',
        width: 0,
        type: 1,
        thumbField: '',
        renderer: 'floatButton'
      }
    ],
    data: [
      {
        id: 1,
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      },
      {
        id: 2,
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      },
      {
        id: 3,
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      },
      {
        id: 4,
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      },
      {
        id: 5,
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      },
      {
        id: 6,
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      },
      {
        id: 7,
        Policy_Name: 'Policy Name is here',
        Distance: '111111 K',
        Year: '10',
        Depreciation_Value: '%20'
      }
    ],
    rowSettings: {
      onClick: (col, data, button?) => {
        console.log(col, data, button);
      },
      floatButton: [
        {
          onClick: (col, data) => {
            console.log(col, data);
            this._router.navigate([
              '/configuration/asset-policy/edit-asset-policy/' + data.id
            ]);
          },

          button: 'edit'
        }
      ]
    }
  };
  assetPolicyForm: FormGroup;
  submited = false;
  dialogModalAdd = false;
  dialogModalCancel = false;
  dialogSettingAdd: IDialogAlert = {
    header: 'Asset Policy',
    hasError: false,
    hasHeader: true,
    message: 'New Asset Policy Successfully Added',
    confirmButton: 'OK'
  };
  dialogSettingCancel: IDialogAlert = {
    header: 'Asset Policy',
    hasError: false,
    isWarning: true,
    hasHeader: true,
    message: 'Are you sure that you want to cancel the asset policy creation?',
    confirmButton: 'Yes',
    cancelButton: 'No'
  };
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private injector: Injector,
    private _routerFacade: RouterFacade
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.assetPolicyForm = this._fb.group({
      policyType: ['asset', [Validators.required]],
      policyName: ['', [Validators.required]],
      killometerUsage: ['', [Validators.required]],
      yearUsage: [''],
      depreciationValue: ['', [Validators.required]],
      reminder: [false]
    });
  }

  submit() {
    this.submited = true;
    if (this.assetPolicyForm.invalid) {
      return;
    } else {
      this.dialogModalAdd = true;
    }
    // this.goToList();
  }
  cancel() {
    this.dialogModalCancel = true;
  }
  dialogCancelConfirm(value) {
    if (value === true) {
      this._router.navigate(['configuration/asset-policy']);
    }
    this.dialogModalCancel = false;
  }
  dialogAddConfirm(value) {
    if (value === true) {
      this._router.navigate(['configuration/asset-policy']);
    }
    this.dialogModalAdd = false;
  }
}

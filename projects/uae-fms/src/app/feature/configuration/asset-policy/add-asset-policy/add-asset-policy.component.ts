import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injector,
  OnDestroy
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
import { AssetPolicyFacade } from '@feature/configuration/+state/asset-policy';
import { IAssetPolicy } from '@models/asset-policy.model';
import { Utility } from '@shared/utility/utility';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'anms-add-asset-policy',
  templateUrl: './add-asset-policy.component.html',
  styleUrls: ['./add-asset-policy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddAssetPolicyComponent
  extends Utility
  implements OnInit, OnDestroy {
  currentTab = '';
  submitButton = 'forms.add';
  editForm: Subscription;
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
  submitted = false;
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
    private _routerFacade: RouterFacade,
    private assetPolicyFacade: AssetPolicyFacade
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params) => (this.currentTab = params['id'])
    );
    this.assetPolicyForm = this._fb.group({
      policyType: ['asset', [Validators.required]],
      policyName: ['', [Validators.required]],
      killometerUsage: ['', [Validators.required]],
      yearUsage: [''],
      depreciationValue: ['', [Validators.required]],
      reminder: [false]
    });
    this.editForm = this._routerFacade.route$.subscribe((data) => {
      const isEdit = data.url
        .split('/')
        .find((edit) => edit == 'edit-asset-policy');
      if (isEdit) {
        this.submitButton = 'forms.edit';
      }
    });
  }

  addSubAsset(data) {
    this.assetPolicyFacade.addAssetPolicy(data);
  }
  submit() {
    this.submitted = true;
    if (this.assetPolicyForm.invalid) {
      return;
    } else {
      this.assetPolicyFacade.addAssetPolicy(this.assetPolicyForm.value);
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
  ngOnDestroy(): void {
    this.editForm.unsubscribe();
  }
}

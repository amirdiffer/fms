import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { map, mergeMap } from 'rxjs/operators';

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
    data: [],
    rowSettings: {
      onClick: (col, data, button?) => {
        console.log(col, data, button);
      },
      floatButton: [
        {
          onClick: (col, data) => {
            this._router.navigate(
              ['/configuration/asset-policy/edit-asset-policy/'],
              { queryParams: { id: data.id } }
            );
          },

          button: 'edit'
        }
      ]
    }
  };
  assetPolicyForm: FormGroup;
  submitted = false;
  isEdit = false;
  dialogModalAddOrUpdate = false;
  dialogModalCancel = false;
  dialogModalError = false;
  dialogSettingAddOrUpdate: IDialogAlert = {
    header: 'Asset Policy',
    hasError: true,
    hasHeader: true,
    message: 'New Asset Policy Successfully Added',
    confirmButton: 'OK'
  };
  dialogSettingError: IDialogAlert = {
    header: 'Asset Policy',
    hasError: true,
    hasHeader: true,
    message: 'An Error Occured',
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
  id: number;



  assetPolicy$ = this.assetPolicyFacade.assetPolicy$.pipe(
    map((x) =>
      x.map((item) => {
        return {
          id: item.id,
          Policy_Name: item.name,
          Distance: item.maxUsageKPHour,
          Year: item.maxUsageYear,
          Depreciation_Value: item.depreciationValue
        };
      })
    )
  );

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private injector: Injector,
    private _routerFacade: RouterFacade,
    private assetPolicyFacade: AssetPolicyFacade,
    private changeDetector: ChangeDetectorRef
  ) {
    super(injector);
  }

  loadAssetPolicyForm(assetPolicy) {
    const {
      depreciationValue,
      maxUsageKPHour,
      maxUsageYear,
      name,
      type
    } = assetPolicy;
    this.assetPolicyForm.patchValue({
      policyType: type,
      policyName: name,
      kilometerUsage: maxUsageKPHour,
      yearUsage: maxUsageYear,
      depreciationValue,
      reminder: false
    });
  }

  getAssetPolicyRequestPayload(assetPolicyFormValue, id = null) {
    const {
      policyType,
      policyName,
      kilometerUsage,
      yearUsage,
      depreciationValue,
      reminder
    } = assetPolicyFormValue;
    const payload = {
      depreciationValue,
      maxUsageKPHour: kilometerUsage,
      maxUsageYear: yearUsage,
      name: policyName,
      type: policyType,
      reminder: reminder
    };

    if (id) {
      payload['id'] = id;
    }

    return payload;
  }

  ngOnInit(): void {
    this.assetPolicyFacade.loadAll();
    this.assetPolicyForm = this._fb.group({
      policyType: ['asset', [Validators.required]],
      policyName: ['', [Validators.required]],
      kilometerUsage: ['', [Validators.required]],
      yearUsage: [''],
      depreciationValue: ['', [Validators.required]],
      reminder: [false]
    });

    this.route.queryParams.subscribe(
      (params) => (this.currentTab = params['id'])
    );

    this.editForm = this._routerFacade.route$.subscribe((data: any) => {
      console.log(data);
      this.id = +data.queryParams['id'];

      if (this.id) {
        this.isEdit = true;

        this.assetPolicyFacade.getById(this.id).subscribe((assetPolicy) => {
          if (assetPolicy) {
            this.loadAssetPolicyForm(assetPolicy);
          }
        });
      }
    });

    this.assetPolicyFacade.submitted$.subscribe((x) => {
      if (x) {
        this.dialogSettingAddOrUpdate.header = this.isEdit
          ? 'Edit user'
          : 'Add new user';
        this.dialogSettingAddOrUpdate.message = this.isEdit
          ? 'Changes Saved Successfully'
          : 'User Added Successfully';
        this.dialogSettingAddOrUpdate.isWarning = false;
        this.dialogSettingAddOrUpdate.hasError = false;
        this.dialogSettingAddOrUpdate.confirmButton = 'Yes';
        this.dialogSettingAddOrUpdate.cancelButton = undefined;
        this.router.navigate(['/configuration/user-management/users']).then();
      }
    });

    this.assetPolicyFacade.error$.subscribe(x => {
      if (x) {
        console.log(x?.error)
        this.dialogModalError = true;
        this.dialogSettingError.hasError = true;
        this.changeDetector.detectChanges();
      } else {
        this.dialogModalError = false;
      }
    });
  }

  submit() {
    this.submitted = true;
    if (this.assetPolicyForm.invalid) {
      return;
    } else {
      if (!this.isEdit) {
        const data = this.getAssetPolicyRequestPayload(
          this.assetPolicyForm.value
        );
        const _data = {
          type: data.type,
          name: data.name,
          maxUsageKmPHour: data.maxUsageKPHour,
          maxUsageYear: data.maxUsageYear,
          depreciationValue: data.depreciationValue,
          setReminderBefore: data.reminder,
        }
        this.assetPolicyFacade.addAssetPolicy(_data);
      } else {
        const data = this.getAssetPolicyRequestPayload(
          this.assetPolicyForm.value,
          this.id
        );

        this.assetPolicyFacade.updateAssetPolicy(data);
      }
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
  dialogAddOrUpdateConfirm(value) {
    if (value === true) {
      this._router.navigate(['configuration/asset-policy']);
    }
    this.dialogModalAddOrUpdate = false;
  }
  ngOnDestroy(): void {
    this.editForm.unsubscribe();
  }
}

import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { DialogService } from '@core/dialog/dialog-template.component';
import { RouterFacade } from '@core/router';
import { TableSetting } from '@core/table';
import { AssetPolicyFacade, AssetPolicyService } from '@feature/configuration/+state/asset-policy/asset';
import { SubAssetPolicyFacade } from '@feature/configuration/+state/asset-policy/sub-asset';
import { Utility } from '@shared/utility/utility';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'anms-add-asset-policy',
  templateUrl: './add-asset-policy.component.html',
  styleUrls: ['./add-asset-policy.component.scss']
})
export class AddAssetPolicyComponent
  extends Utility
  implements OnInit, OnDestroy {

  //#region Variables
  currentTab = '';
  assetPolicyForm: FormGroup;
  submitted = false;
  isEdit = false;
  id: number;
  //#endregion

  //#region Tables
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
      onClick: (col, data, button?) => { },
      floatButton: [
        {
          onClick: (col, data) => {
            this.assetPolicyFacade.reset();
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
  //#endregion

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private injector: Injector,
    private _routerFacade: RouterFacade,
    private assetPolicyFacade: AssetPolicyFacade,
    private _subAssetPolicyFacade: SubAssetPolicyFacade,
    private _activatedRoute: ActivatedRoute,
    private service: AssetPolicyService,
    private _dialogService : DialogService
  ) {
    super(injector);
    this.assetPolicyFacade.reset()
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
      kilometerUsage: (!maxUsageKPHour || maxUsageKPHour == 0) ? null : maxUsageKPHour,
      yearUsage: (!maxUsageYear || maxUsageYear == 0) ? null : maxUsageYear,
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
    // this.assetPolicyFacade.loadAll();


    this.assetPolicyForm = this._fb.group(
      {
        policyType: ['ASSET', [Validators.required]],
        policyName: ['', [Validators.required]],
        kilometerUsage: [null],
        yearUsage: [null],
        depreciationValue: ['', [Validators.required]],
        reminder: [false]
      },
      {
        validators: (AC: AbstractControl) => {
          if (!AC.get('kilometerUsage').value && !AC.get('yearUsage').value) {
            AC.get('kilometerUsage').setErrors({ required: true });
            AC.get('yearUsage').setErrors({ required: true });
          } else {
            AC.get('kilometerUsage').setErrors(null);
            AC.get('yearUsage').setErrors(null);
          }
        }
      }
    );
    switch (this._activatedRoute.snapshot.queryParams.type) {
      case 'asset':
        this.assetPolicyForm.patchValue({
          policyType: 'ASSET'
        });
        break;
      case 'sub_asset':
        this.assetPolicyForm.patchValue({
          policyType: 'SUB_ASSET'
        });
        break;
      default:
        break;
    }

    this.route.queryParams.subscribe(
      (params) => (this.currentTab = params['id'])
    );

    this._routerFacade.route$.subscribe((data: any) => {
      this.id = +data.params['id'];

      if (this.id) {
        this.isEdit = true;
        this.service.getAssetById(this.id).subscribe((x: any) => {
          const assetPolicy = x.message;
          if (assetPolicy) {
            this.loadAssetPolicyForm(assetPolicy);
          } else {
            this._subAssetPolicyFacade
              .getById(this.id)
              .subscribe((sub_assetPolicy) => {
                if (sub_assetPolicy) {
                  this.loadAssetPolicyForm(sub_assetPolicy);
                }
              });
          }
        });
      }
    });

    this.assetPolicyFacade.submitted$.subscribe((x) => {
      if (x) {
        const dialog = this._dialogService.show('success' , 
        (this.isEdit ? 'Edit Asset Policy': 'Add New Asset Policy' ), 
        (this.isEdit ? 'Changes Saved Successfully' : 'Asset Policy Added Successfully'),'Ok')
        const dialogClose$:Subscription = dialog.dialogClosed$
        .pipe(
          tap((result) => {
          if (result === 'confirm') {
            this._router.navigate(['/configuration/asset-policy'] , { queryParams: { 
              id:
              this.assetPolicyForm.get('policyType').value == 'ASSET'
                ? 'assetPolicyAssetTab'
                : 'assetPolicySubAssetTab'
             }}).then(()=>{
              this.assetPolicyFacade.loadAll();
              this._subAssetPolicyFacade.loadAll();
            });
          }
          dialogClose$?.unsubscribe();
          })
        ).subscribe()

      }
    });

    this.assetPolicyFacade.error$.subscribe((x) => {
      if (x) {
        const dialog = this._dialogService.show('danger' , 
          (this.isEdit ? 'Edit Asset Policy': 'Add New Asset Policy' ), 
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
  }

  submit() {
    this.submitted = true;
    this.assetPolicyForm.markAllAsTouched();
    if (this.assetPolicyForm.invalid) return;

    const dialog = this._dialogService.show('warning' , 
    (this.isEdit ? 'Edit Asset Policy': 'Add New Asset Policy' ), 
    (this.isEdit ? 'Are you sure you want to submit this changes?' : 'Are you sure you want to add new asset policy?') , 'Yes','Cancel')
    const dialogClose$:Subscription = dialog.dialogClosed$
      .pipe(
        tap((result) => {    
        if (result === 'confirm') {
          const data = this.getAssetPolicyRequestPayload(this.assetPolicyForm.value);
          const _data = {
            type: data.type,
            name: data.name,
            maxUsageKmPHour: data.maxUsageKPHour ? data.maxUsageKPHour : 0,
            maxUsageYear: data.maxUsageYear ? data.maxUsageYear : 0,
            depreciationValue: data.depreciationValue,
            setReminderBefore: data.reminder
          };
      
          if (!this.isEdit) {
            this.assetPolicyFacade.addAssetPolicy(_data);
          } else {
            const data = {
              id: this.id,
              ..._data
            };
      
            this.assetPolicyFacade.updateAssetPolicy(data);
          }

        }
        dialogClose$?.unsubscribe();
      })
    ).subscribe();
  }
  cancel() {
    const dialog = this._dialogService.show('warning' , 'Are you sure you want to leave?' , 'You have unsaved changes! If you leave, your changes will be lost.' , 'Yes','Cancel')
    const dialogClose$:Subscription = dialog.dialogClosed$
    .pipe(
      tap((result) => {
      if (result === 'confirm') {
        this._router.navigate(['/configuration/asset-policy'] , { queryParams: { 
          id:
          this.assetPolicyForm.get('policyType').value == 'ASSET'
            ? 'assetPolicyAssetTab'
            : 'assetPolicySubAssetTab'
         }});
      }
      dialogClose$?.unsubscribe();
      })
    ).subscribe();

  }

  ngOnDestroy(): void {
  }
}

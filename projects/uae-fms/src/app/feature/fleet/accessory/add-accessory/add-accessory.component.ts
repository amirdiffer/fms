import { AccessoryService } from './../../+state/accessory/accessory.service';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Injector
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { TableSetting } from '@core/table';
import { Router, ActivatedRoute } from '@angular/router';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { AccessoryFacade } from '@feature/fleet/+state/accessory';
import { map } from 'rxjs/operators';
import { SubAssetFacade } from '@feature/fleet/+state/sub-asset';
import { AssetMasterFacade } from '@feature/fleet/+state/assets/asset-master';
import { Subject } from 'rxjs';
import { Utility } from '@shared/utility/utility';

const EMPTY_SELECT_ITEM_LIST = [
  {
    name: '',
    id: null
  }
];

@Component({
  selector: 'add-accessory',
  templateUrl: './add-accessory.component.html',
  styleUrls: ['./add-accessory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddAccessoryComponent extends Utility implements OnInit {
  //#region Dialogs
  dialogModal = false;
  dialogModalError = false;
  dialogModalCancel = false;
  dialogSetting: IDialogAlert = {
    header: 'Accessory',
    hasError: false,
    hasHeader: true,
    message: 'New Accessory Successfully Added',
    confirmButton: 'OK'
  };
  dialogSettingCancel: IDialogAlert = {
    header: 'Accessory',
    hasError: false,
    isWarning: true,
    hasHeader: true,
    message: 'Are you sure that you want to cancel the Accessory creation?',
    confirmButton: 'Yes',
    cancelButton: 'No'
  };

  dialogSettingError: IDialogAlert = {
    header: 'Accessory',
    hasError: true,
    isWarning: false,
    hasHeader: true,
    message: 'Error occurred in progress',
    confirmButton: 'OK'
  };
  //#endregion

  //#region Table
  accessory_Table: TableSetting = {
    columns: [
      { lable: 'tables.column.item', type: 1, field: 'Item' },
      {
        lable: 'tables.column.asset_sub_asset',
        type: 1,
        field: 'Asset_SubAsset'
      },
      { lable: 'tables.column.assigned_to', type: 1, field: 'Assigned_To' },
      {
        lable: 'tables.column.quantity',
        type: 1,
        field: 'Quantity',
        width: 150,
        sortable: true
      }
    ],
    data: []
  };
  //#endregion

  public accessoryForm: FormGroup;

  accessory = [{ name: '', id: null }];
  setSearchValue = new Subject();
  setSearchValue$ = this.setSearchValue.asObservable();

  assignedTo = [
    { name: 'assignedTo Type 1', id: 1 },
    { name: 'assignedTo Type 2', id: 2 },
    { name: 'assignedTo Type 3', id: 3 }
  ];

  assetsB;
  subAssetsB;
  employee = [];

  formSubmitted = false;
  formChanged = false;

  assets: [];
  subAssets: [];
  isEdit = false;
  recordId: number;
  dialogType: string;
  accessoryAssetTypes: any;
  assignedToEntity;

  constructor(
    private _fb: FormBuilder,
    private accessoryService: AccessoryService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _facade: AccessoryFacade,
    private changeDetector: ChangeDetectorRef,
    private subAssetFacade: SubAssetFacade,
    private assetMasterFacade: AssetMasterFacade,
    private injector: Injector
  ) {
    super(injector);
  }

  accessory$ = this._facade.accessory$.pipe(
    map((x) =>
      x.map((item) => {
        return {
          statusColor: '#00AFB9',
          Item: item.itemName,
          Asset_SubAsset: item.assignedToEntity,
          Assigned_To: item.assignedToEmployeeId,
          Quantity: item.quantity
        };
      })
    )
  );

  handleEditMode() {
    this._route.queryParams.subscribe((queryParams) => {
      if (queryParams['id']) {
        this.isEdit = true;
        this.recordId = +queryParams['id'];
        console.log('is Edit')
        this.loadAccessoryData(this.recordId);
      } else {
        this.isEdit = false;
      }
    });
  }

  loadAccessoryData(recordId: number) {
    this.accessoryService.getAccessory(recordId).subscribe((result: any) => {
      if (result) {
        const accessory = result.message;
        const {
          assignedToType,
          itemName,
          quantity,
          assignedToEntity,
          accessoryTypeId,
          assignedToEmployeeId
        } = accessory;

        this.loadAccessoryType(() => {
          const selectedAccessoryType: any = this.accessory.find(
            (a) => a.id === accessoryTypeId
          );
          this.accessoryForm.patchValue({
            accessoryTypeId: selectedAccessoryType?.id
          });
        });

        this.setUsers(() => {
          this.accessoryForm.controls['assignedToEmployeeId'].setValue(
            assignedToEmployeeId
          );
        });

        const data = {
          itemName,
          assignedToType,
          quantity,
          assignedToEntity
        };

        this.accessoryForm.patchValue(data);
        this.setSearchValue.next('data');
      }
    });
  }

  ngOnInit(): void {
    this.accessoryForm = this._fb.group({
      itemName: ['', Validators.required],
      assignedToType: ['ASSET'],
      assignedToEntity: ['', Validators.required],
      accessoryTypeId: ['', Validators.required],
      quantity: ['', Validators.required],
      assignedToEmployeeId: ['']
    });

    this.loadAccessoryType();
    this._facade.loadAll();
    this.subAssetFacade.loadAll();
    this.assetMasterFacade.loadAll();

    this.setAssets();

    this.setUsers();

    this.accessoryForm.valueChanges.subscribe(() => {
      this.formChanged = true;
    });

    this.handleEditMode();
    this.handleSubmissionDialog();

    this._facade.error$.subscribe((x) => {
      if (x?.error) {
        this.dialogModalError = true;
        this.dialogSettingError.hasError = true;
        this.changeDetector.detectChanges();
      }
    });

    this.setSearchValue$.subscribe((x) => {
      if (x) {
        let selectedAsset;
        switch (x) {
          case 'data':
            this.assignedToEntity = this.accessoryForm.controls[
              'assignedToEntity'
            ].value;
            break;
          case 'asset':
            selectedAsset = this.assetsB.find((a) => {
              return a.id === this.assignedToEntity;
            });
            break;
          case 'subAsset':
            selectedAsset = this.subAssetsB.find((a) => {
              return a.id === this.assignedToEntity;
            });
            break;
        }

        if (selectedAsset) {
          this.accessoryForm.controls['assignedToEntity'].setValue(
            selectedAsset
          );
        }
      }
    });
  }

  private setUsers(cb = null) {
    this.accessoryService.users().subscribe((employee) => {
      this.employee = employee.message.map((user) => {
        return {
          id: user.id,
          name: user.firstName + ' ' + user.lastName
        };
      });

      if (typeof cb === 'function') {
        cb();
      }
    });
  }

  private setAssets() {
    this.subAssetFacade.subAsset$.subscribe((x) => {
      this.subAssetsB = x.map((y) => ({
        id: y.id,
        name: y['makeName'] + ' ' + y['modelName']
      }));
      if (x) this.setSearchValue.next('subAsset');
    });

    this.assetMasterFacade.assetMaster$.subscribe((x) => {
      this.assetsB = x.map((y) => ({
        id: y.id,
        name: y['makeName'] + ' ' + y['modelName']
      }));
      if (x) this.setSearchValue.next('asset');
    });
  }

  handleSubmissionDialog() {
    this._facade.submitted$.subscribe((x) => {
      if (x) {
        this.dialogModal = true;
        this.dialogType = 'success';
        this.dialogSetting.header = this.isEdit
          ? 'Edit Accessory'
          : 'Add new Accessory';
        this.dialogSetting.message = this.isEdit
          ? 'Changes Saved Successfully'
          : 'Accessory Added Successfully';
        this.dialogSetting.isWarning = false;
        this.dialogSetting.hasError = false;
        this.dialogSetting.confirmButton = 'OK';
        this.dialogSetting.cancelButton = undefined;
        this.changeDetector.detectChanges();
      }
    });
  }

  filterAssets(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    this.assets = this.assetsB.filter(
      (x) =>
        (x.id + '').indexOf(event.query) >= 0 ||
        x.name.indexOf(event.query) >= 0
    );
  }

  filterSubAssets(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    this.subAssets = this.subAssetsB.filter(
      (x) =>
        (x.id + '').indexOf(event.query) >= 0 ||
        x.name.indexOf(event.query) >= 0
    );
  }

  assetChanged($event) {
    // console.log($event);
  }

  setAssetTypes(assetTypes) {
    if (!assetTypes) {
      return [];
    }

    return (this.accessory = assetTypes
      .filter((a) => a.type === 'ACCESSORY')
      .map((assetType) => ({
        id: assetType.id,
        name: assetType.name,
        children: assetType.makes ? assetType.makes : EMPTY_SELECT_ITEM_LIST
      })));
  }

  loadAccessoryType(cb = null) {
    this.accessoryService.getAssetTypes().subscribe((result) => {
      if (result) {
        const assetTypes = result.message;
        this.setAssetTypes(assetTypes);

        if (typeof cb === 'function') {
          cb();
        }
      }
    });
  }

  submit() {
    this.formSubmitted = true;
    if (this.accessoryForm.invalid) {
      this.accessoryForm.markAllAsTouched();
      return;
    } else {
      const d = this.accessoryForm.getRawValue();
      const _data = {
        itemName: d.itemName,
        assignedToType: d.assignedToType,
        assignedToEntity: d.assignedToEntity.id,
        accessoryTypeId: d.accessoryTypeId,
        quantity: d.quantity,
        assignedToEmployeeId: d.assignedToEmployeeId
      };
      if (!this.isEdit) {
        this._facade.addAccessory(_data);
      } else {
        this._facade.editAccessory(_data, this.recordId);
      }
    }
  }

  cancel() {
    if (this.formChanged) {
      this.dialogModalCancel = true;
      return;
    }

    this._router.navigate(['fleet/accessory']);
  }

  dialogCancelConfirm(value) {
    if (value === true) {
      this._router.navigate(['fleet/accessory']);
    }
    this.dialogModalCancel = false;
  }

  dialogConfirm(value) {
    if (value === true) {
      this._facade.reset();
      this._router.navigate(['/fleet/accessory']);
    }
    this.dialogModal = false;
  }

  dialogErrorConfirm(value) {
    this.dialogModalError = false;
  }
}

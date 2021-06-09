import { AccessoryService } from './../../+state/accessory/accessory.service';
import {
  Component,
  OnInit,
  Injector,
  OnDestroy
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
import { Observable, Subject, Subscription } from 'rxjs';
import { Utility } from '@shared/utility/utility';
import { AccessoryTypeFacade } from '@feature/configuration/+state/fleet-configuration';

const EMPTY_SELECT_ITEM_LIST = [
  {
    name: '',
    id: null
  }
];

@Component({
  selector: 'add-accessory',
  templateUrl: './add-accessory.component.html',
  styleUrls: ['./add-accessory.component.scss']
})
export class AddAccessoryComponent extends Utility implements OnInit , OnDestroy{
  //#region Dialogs
  avatarId = null;
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
  accessoryType$:Observable<any>;
  employee$:Observable<any>;
  accessory = [{ name: '', id: null }];

  assignedTo = [];

  employee = [];

  formSubmitted = false;
  formChanged = false;

  isEdit = false;
  recordId: number;
  dialogType: string;
  accessoryAssetTypes: any;
  assignedToEntity;
  accessoryService$:Subscription;
  constructor(
    private _fb: FormBuilder,
    private accessoryService: AccessoryService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _facade: AccessoryFacade,
    private accessoryTypeFacade: AccessoryTypeFacade,
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
          Assigned_To: item.assignedToEmployeeId,
          Quantity: item.quantity
        };
      })
    )
  );

  handleEditMode() {
    const url = this._route.snapshot.url
    console.log(this._route.snapshot.url)
    if(url.filter((x) => x.path == "edit-accessory").length > 0){
      this.isEdit = true;
      this.recordId = +url[url.length - 1].path;
      this.accessoryForm.get('quantity').clearValidators();
      this.loadAccessoryData(this.recordId);

    }else{
      this.isEdit = false;
    }
  }

  loadAccessoryData(recordId: number) {
    this.accessoryService$ =this.accessoryService.getAccessory(recordId).subscribe((result: any) => {
      if (result) {
        console.log(result.message)
        const accessory = result.message;

        this.loadAccessoryType(() => {
          this.accessoryForm.patchValue({
            itemName: accessory.itemName,
            accessoryTypeId:accessory.accessorySpecification.id,
            assignedToEmployeeId:accessory.assignedToEmployeeId
          });
          this.avatarId = accessory.avatarId;
        });
      }
    });
  }

  ngOnInit(): void {
    this.accessoryTypeFacade.loadAll();
    this.accessoryType$ = this.accessoryTypeFacade.accessoryType$.pipe(map(x => {
      if (x){return x}
    }));
    this.employee$ = this.accessoryService.users().pipe(
      map(x => {
         if(x){
           return x.message.map(user => {
             return {
              id:user.id,
              name: user.firstName + ' ' + user.lastName
             }

           })
         }
      })
    )
    this.accessoryForm = this._fb.group({
      itemName: ['', Validators.required],
      accessoryTypeId: ['', Validators.required],
      quantity: [''],
      assignedToEmployeeId: ['']
    });

    this.loadAccessoryType();
    this.subAssetFacade.loadAll();
    this.assetMasterFacade.loadAll();
    this.setUsers();
    this.handleEditMode();
    this.handleSubmissionDialog();

    this.accessoryForm.valueChanges.subscribe(() => {
      this.formChanged = true;
    });


    this._facade.error$.subscribe((x) => {
      if (x?.error) {
        this.dialogModalError = true;
        this.dialogSettingError.hasError = true;
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
      }
    });
  }

  setAssetTypes(assetTypes) {
    if (!assetTypes) {
      return [];
    }

    return (this.accessory = assetTypes
      .map((assetType) => ({
        id: assetType.id,
        name: assetType.name,
        children: assetType.makes ? assetType.makes : EMPTY_SELECT_ITEM_LIST
      })));
  }

  loadAccessoryType(cb = null) {
    this.accessoryTypeFacade.accessoryType$.subscribe((result) => {
      if (result) {
        this.setAssetTypes(result);
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
        avatarId: this.avatarId,
        itemName: d.itemName,
        accessoryConfigurationId : d.accessoryTypeId,
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
  ngOnDestroy(){
  }

  uploadAccessoryPicture($event) {
    const docId = $event.files[0];
    if ($event.files.length > 0) {
      this.avatarId = docId;
    }
  }

}

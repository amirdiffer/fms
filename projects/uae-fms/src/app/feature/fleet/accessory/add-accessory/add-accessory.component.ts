import { AccessoryService } from './../../+state/accessory/accessory.service';
import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { TableSetting } from '@core/table';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessoryFacade } from '@feature/fleet/+state/accessory';
import { map, tap } from 'rxjs/operators';
import { SubAssetFacade } from '@feature/fleet/+state/sub-asset';
import { AssetMasterFacade } from '@feature/fleet/+state/assets/asset-master';
import { Observable, Subscription } from 'rxjs';
import { Utility } from '@shared/utility/utility';
import { DialogService } from '@core/dialog/dialog-template.component';
import { AccessoryTypeFacade } from '@feature/configuration/+state/fleet-configuration/accessory-type';

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
export class AddAccessoryComponent
  extends Utility
  implements OnInit, OnDestroy {
  //#region Dialogs
  avatarId = null;
  avatarRequired:boolean = false;

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
  accessoryType$: Observable<any>;
  employee$: Observable<any>;
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
  accessoryService$: Subscription;
  constructor(
    private _fb: FormBuilder,
    private accessoryService: AccessoryService,
    private _route: ActivatedRoute,
    private _facade: AccessoryFacade,
    private accessoryTypeFacade: AccessoryTypeFacade,
    private subAssetFacade: SubAssetFacade,
    private assetMasterFacade: AssetMasterFacade,
    private injector: Injector,
    private _dialogService : DialogService
  ) {
    super(injector);
    this._facade.reset();
  }

  accessory$ = this._facade.accessory$.pipe(
    map((x) =>
      x.map((item) => {
        return {
          statusColor: '#00AFB9',
          Item: item.itemName,
          // Assigned_To: item.assignedToEmployeeId,
          Quantity: item.quantity
        };
      })
    )
  );

  handleEditMode() {
    const url = this._route.snapshot.url;
    if (url.filter((x) => x.path == 'edit-accessory').length > 0) {
      this.isEdit = true;
      this.recordId = +url[url.length - 1].path;
      this.accessoryForm.get('quantity').clearValidators();
      this.loadAccessoryData(this.recordId);
    } else {
      this.isEdit = false;
    }
  }

  loadAccessoryData(recordId: number) {
    this.accessoryService$ = this.accessoryService
      .getAccessory(recordId)
      .subscribe((result: any) => {
        if (result) {
          const accessory = result.message;

          this.loadAccessoryType(() => {
            this.accessoryForm.patchValue({
              itemName: accessory.itemName,
              accessoryTypeId: accessory.accessorySpecification.id,
              // assignedToEmployeeId: accessory.assignedToEmployeeId
            });
            this.avatarId = accessory.avatarId;
          });
        }
      });
  }

  ngOnInit(): void {
    this.accessoryTypeFacade.loadAll();
    this.accessoryType$ = this.accessoryTypeFacade.accessoryType$.pipe(
      map((x) => {
        if (x) {
          return x;
        }
      })
    );
    this.employee$ = this.accessoryService.users().pipe(
      map((x) => {
        if (x) {
          return x.message.map((user) => {
            return {
              id: user.id,
              name: user.firstName + ' ' + user.lastName
            };
          });
        }
      })
    );
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
        const dialog = this._dialogService.show('danger' ,
          (this.isEdit ? 'Edit Accessory': 'Add new Accessory' ),
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
        const dialog = this._dialogService.show('success' ,
          (this.isEdit ? 'Edit Accessory': 'Add new Accessory' ),
          (this.isEdit ? 'Changes Saved Successfully' : 'Accessory Added Successfully'),'Ok')
        const dialogClose$:Subscription = dialog.dialogClosed$
        .pipe(
          tap((result) => {
          if (result === 'confirm') {
            this.router.navigate(['/fleet/accessory']);
          }
          dialogClose$?.unsubscribe();
          })
        ).subscribe()
        this._facade.loadAll();
      }
    });
  }

  setAssetTypes(assetTypes) {
    if (!assetTypes) {
      return [];
    }

    return (this.accessory = assetTypes.map((assetType) => ({
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
    if (this.accessoryForm.invalid || !this.avatarId) {
      this.accessoryForm.markAllAsTouched();
      if(!this.avatarId){
        this.avatarRequired = true;
      }
      return;
    } else {
      const d = this.accessoryForm.getRawValue();
      const _data = {
        avatarId: this.avatarId,
        itemName: d.itemName,
        accessoryConfigurationId: d.accessoryTypeId,
        quantity: d.quantity,
        // assignedToEmployeeId: d.assignedToEmployeeId
      };
      if (!this.isEdit) {
        this._facade.addAccessory(_data);
      } else {
        const dialog = this._dialogService.show('warning' , 'Edit accessory' , 'Are you sure you want to edit accessory?' , 'Yes','Cancel')
        const dialogClose$:Subscription = dialog.dialogClosed$
        .pipe(
          tap((result) => {
          if (result === 'confirm') {
            this._facade.editAccessory({avatarId:_data.avatarId , itemName:_data.itemName , accessoryConfigurationId: _data.accessoryConfigurationId}, this.recordId);
          }
          dialogClose$?.unsubscribe();
          })
        ).subscribe();

      }
    }
  }

  cancel() {
    const dialog = this._dialogService.show('warning' , 'Are you sure you want to leave?' , 'You have unsaved changes! If you leave, your changes will be lost.' , 'Ok','Cancel')
    const dialogClose$:Subscription = dialog.dialogClosed$
    .pipe(
      tap((result) => {
      if (result === 'confirm') {
        this.router.navigate(['/fleet/accessory']);
      }
      dialogClose$?.unsubscribe();
      })
    ).subscribe();
  }
  ngOnDestroy() {}

  uploadAccessoryPicture($event) {
    const docId = $event.files[0];
    if ($event.files.length > 0) {
      this.avatarId = docId;
    }
  }
}

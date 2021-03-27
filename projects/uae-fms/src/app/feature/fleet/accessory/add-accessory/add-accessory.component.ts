import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { AccessoryService } from '../accessory.service';
import { TableSetting } from '@core/table';
import { Router, ActivatedRoute } from '@angular/router';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { AccessoryFacade } from '@feature/fleet/+state/accessory';
import { map } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'add-accessory',
  templateUrl: './add-accessory.component.html',
  styleUrls: ['./add-accessory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddAccessoryComponent implements OnInit {
  public inputForm: FormGroup;

  accessory = [
    { name: 'Accessory Type 1', id: 1 },
    { name: 'Accessory Type 2', id: 2 },
    { name: 'Accessory Type 3', id: 3 }
  ];

  assignedTo = [
    { name: 'assignedTo Type 1', id: 1 },
    { name: 'assignedTo Type 2', id: 2 },
    { name: 'assignedTo Type 3', id: 3 }
  ];

  formSubmitted = false;
  formChanged = false;
  dialogModalAdd = false;
  dialogModalError = false;
  dialogModalCancel = false;

  //#region Dialogs
  dialogSettingAdd: IDialogAlert = {
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
    message: 'Please fill in all the required fields.',
    confirmButton: 'OK'
  };
  //#endregion

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
  assets: [
    { name: 'Asset 1'; id: 1 },
    { name: 'Asset 2'; id: 2 },
    { name: 'Asset 3'; id: 3 },
    { name: 'Asset 4'; id: 4 },
    { name: 'Asset 5'; id: 5 },
    { name: 'Asset 6'; id: 6 }
  ];

  constructor(
    private _fb: FormBuilder,
    private _accessoryService: AccessoryService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _facade: AccessoryFacade,
    private changeDetector: ChangeDetectorRef
  ) { }

  accessory$ = this._facade.accessory$.pipe(map(x => x.map((item) => {
    return {
      statusColor: '#00AFB9',
      Item: item.itemName,
      Asset_SubAsset: item.assignedToEntity,
      Assigned_To: item.assignedToEmployeeId,
      Quantity: item.quantity
    };
  })));

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      itemName: ['', Validators.required],
      assignedToType: [''],
      assignedToEntity: ['', Validators.required],
      accessoryTypeId: ['', Validators.required],
      quantity: ['', Validators.required],
      assignedToEmployeeId: ['']
    });

    this._facade.loadAll();

    this.inputForm.valueChanges.subscribe(() => {
      this.formChanged = true;
    });

    this._facade.submitted$.subscribe(x => {
      if (x) {
        this.dialogModalAdd = true;
        this.dialogSettingError.hasError = false;
        this.changeDetector.detectChanges();
      }
    });

    this._facade.error$.subscribe(x => {
      if (x?.error) {
        this.dialogModalError = true;
        this.dialogSettingError.hasError = true;
        this.changeDetector.detectChanges();
      }
    })

  }

  filterAssets(event) {
    this.assets = [
      { name: 'Asset 1', id: 1 },
      { name: 'Asset 2', id: 2 },
      { name: 'Asset 3', id: 3 },
      { name: 'Asset 4', id: 4 },
      { name: 'Asset 5', id: 5 },
      { name: 'Asset 6', id: 6 }
    ];
  }

  assetChanged($event) {
    console.log($event);
  }

  hasError(controlName) {
    const control: FormControl = this.inputForm.get(controlName) as FormControl;

    if (control.dirty && control.invalid) {
      return true;
    }

    return false;
  }

  submit() {
    this.formSubmitted = true;
    if (this.inputForm.invalid) {
      this.inputForm.markAllAsTouched();
      return;
    } else {
      const d = this.inputForm.getRawValue();
      const _data = {
        "itemName": d.itemName,
        "assignedToType": 'SUB_ASSET',
        "assignedToEntity": d.assignedToEntity.id,
        "accessoryTypeId": d.accessoryTypeId,
        "quantity": d.quantity,
        "assignedToEmployeeId": d.assignedToEmployeeId
      }
      this._facade.addAccessory(_data)
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

  dialogAddConfirm(value) {
    if (value === true) {
      this._facade.reset();
      this._router.navigate(['/fleet/accessory']);
    }
    this.dialogModalAdd = false;
  }

  dialogErrorConfirm(value) {
    this.dialogModalError = false;
  }
}

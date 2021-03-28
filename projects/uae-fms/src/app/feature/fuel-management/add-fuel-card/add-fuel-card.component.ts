import { TableSetting } from '@core/table';
import { Component, OnInit, ChangeDetectionStrategy, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utility } from '@shared/utility/utility';
import { IDialogAlert } from '@core/alret-dialog/alret-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'anms-add-fuel-card',
  templateUrl: './add-fuel-card.component.html',
  styleUrls: ['./add-fuel-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddFuelCardComponent extends Utility implements OnInit {
  inputForm: FormGroup;
  submited = false;
  dialogModalAdd = false;
  dialogModalCancel = false;
  currentTab: string;
  dialogSettingAdd: IDialogAlert = {
    header: 'Add Fuel Card',
    hasError: false,
    hasHeader: true,
    message: 'New Fuel Card Successfully Added',
    confirmButton: 'OK',
  }
  dialogSettingCancel: IDialogAlert = {
    header: 'Add Fuel Card',
    hasError: false,
    isWarning: true,
    hasHeader: true,
    message: 'Are you sure that you want to cancel the fuel card creation?',
    confirmButton: 'Yes',
    cancelButton: 'No',
  }
  constructor(private _fb: FormBuilder,
    injector: Injector,
    private activatedRoute: ActivatedRoute) {
    super(injector);
    this.activatedRoute.queryParams.subscribe((params) => {
      this.currentTab = params['id'];
    });
  }

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      tagNumber: ['', Validators.required],
      cartType: [''],
      expireDate: ['', Validators.required],
      usageLimit: ['', Validators.required],
      assignTo: ['', Validators.required]
    })
  }

  fuelCardsTableData = [
    {
      tagNo: '0550505050',
      used: '100 Litters',
      usageLimit: '400 Litters',
      asset: 'Item no 123456',
      cardType: 'RFID-ENOC',
      expireDate: '02/02/2020'
    },
    {
      tagNo: '0550505050',
      used: '100 Litters',
      usageLimit: '400 Litters',
      asset: 'Item no 123456',
      cardType: 'RFID-ENOC',
      expireDate: '02/02/2020'
    },
    {
      tagNo: '0550505050',
      used: '100 Litters',
      usageLimit: '400 Litters',
      asset: 'Item no 123456',
      cardType: 'RFID-ENOC',
      expireDate: '02/02/2020'
    },
    {
      tagNo: '0550505050',
      used: '100 Litters',
      usageLimit: '400 Litters',
      asset: 'Item no 123456',
      cardType: 'RFID-ENOC',
      expireDate: '02/02/2020'
    }
  ];

  fuelCardsTableSetting: TableSetting = {
    columns: [
      {
        lable: 'tables.column.tag_no',
        field: 'tagNo'
      },
      {
        lable: 'tables.column.asset',
        field: 'asset'
      },
      {
        lable: 'tables.column.card_type',
        field: 'cardType'
      },
      {
        lable: 'tables.column.expire_date',
        field: 'expireDate',
        sortable: true
      },
      {
        lable: 'tables.column.usage_limit',
        field: 'usageLimit'
      },
    ],
    data: this.fuelCardsTableData
  };

  assetSuggests = [
    { name: 'Old asset type 1', id: 1 },
    { name: 'Old asset type 2', id: 2 },
    { name: 'Old asset type 3', id: 3 },
    { name: 'Old asset type 4', id: 4 },
    { name: 'Old asset type 5', id: 5 },
    { name: 'Old asset type 6', id: 6 }
  ];

  assetTypes = [
    { name: 'Asset type 1', id: 1 },
    { name: 'Asset type 2', id: 2 },
    { name: 'Asset type 3', id: 3 },
    { name: 'Asset type 4', id: 4 },
    { name: 'Asset type 5', id: 5 },
    { name: 'Asset type 6', id: 6 }
  ];
  oldAssetSuggests = [
    { name: 'Old asset type 1', id: 1 },
    { name: 'Old asset type 2', id: 2 },
    { name: 'Old asset type 3', id: 3 },
    { name: 'Old asset type 4', id: 4 },
    { name: 'Old asset type 5', id: 5 },
    { name: 'Old asset type 6', id: 6 }
  ];

  filterAssets(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    this.oldAssetSuggests = [
      { name: 'Old asset type 1', id: 1 },
      { name: 'Old asset type 2', id: 2 },
      { name: 'Old asset type 3', id: 3 },
      { name: 'Old asset type 4', id: 4 },
      { name: 'Old asset type 5', id: 5 },
      { name: 'Old asset type 6', id: 6 }
    ];
  }
  submit() {
    this.submited = true;
    if (this.inputForm.invalid) {
      return;
    } else {
      this.dialogModalAdd = true
    }
  }
  cancel() {
    this.dialogModalCancel = true;
  }
  dialogCancelConfirm(value) {
    if (value === true) {
      this.goToList();
    }
    this.dialogModalCancel = false
  }
  dialogAddConfirm(value) {
    if (value === true) {
      this.goToList();
    }
    this.dialogModalAdd = false;
  }
}

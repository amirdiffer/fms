import { TableSetting } from '@core/table';
import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utility } from '@shared/utility/utility';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from '@core/dialog/dialog-template.component';

@Component({
  selector: 'anms-add-fuel-card',
  templateUrl: './add-fuel-card.component.html',
  styleUrls: ['./add-fuel-card.component.scss']
})
export class AddFuelCardComponent extends Utility implements OnInit {
  inputForm: FormGroup;
  submited = false;
  currentTab: string;
  yearRange =`2000:${new Date().getFullYear()}`;
  constructor(
    private _fb: FormBuilder,
    injector: Injector,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService
  ) {
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
    });
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
      }
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
    const dialog = this.dialogService.show('success', 'Add Fuel Card',
      'New Fuel Card Successfully Added', 'OK', '');
    dialog.dialogClosed$.subscribe(result => {
      if (result === 'confirm') {
        this.goToList();
      }
    })
    }
  }
  cancel() {
    const dialog = this.dialogService.show('warning', 'Add Fuel Card',
      'Are you sure that you want to cancel the fuel card creation?', 'Yes', 'No');
    dialog.dialogClosed$.subscribe(result => {
      if (result === 'confirm') {
        this.goToList();
      } else {
        return false;
      }
    })
  }
}

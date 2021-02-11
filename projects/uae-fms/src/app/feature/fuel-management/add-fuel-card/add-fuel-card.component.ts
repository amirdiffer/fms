import { TableSetting } from './../../../core/table/table.component';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  FuelCardTableColumnDefinition,
  FuelCardTableData,
  FuelDataType,
  FuelTableSettings
} from '../fuel-card-table/fuel-card-table.component';

@Component({
  selector: 'anms-add-fuel-card',
  templateUrl: './add-fuel-card.component.html',
  styleUrls: ['./add-fuel-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddFuelCardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

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
        lable: 'Tag No',
        field: 'tagNo'
      },
      {
        lable: 'Used',
        field: 'used'
      },
      {
        lable: 'Usage Limit',
        field: 'usageLimit'
      },
      {
        lable: 'Asset',
        field: 'asset'
      },
      {
        lable: 'Card Type',
        field: 'cardType'
      },
      {
        lable: 'Expire Date',
        field: 'expireDate'
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
}

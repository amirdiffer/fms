import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FilterCardSetting } from '@core/filter/filter.component';
import { TableSetting } from '@core/table';
import { SubAssetFacade } from '../+state/sub-asset';

@Component({
  selector: 'anms-sub-asset',
  templateUrl: './sub-asset.component.html',
  styleUrls: ['./sub-asset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubAssetComponent implements OnInit {
  downloadBtn = 'assets/icons/download-solid.svg';
  filterCard: FilterCardSetting[] = [
    {
      filterTitle: 'Total',
      filterCount: '2456',
      filterTagColor: '#C543FF',
      onActive(index: number) {}
    },
    {
      filterTitle: 'Active',
      filterCount: '356',
      filterTagColor: '#4462A2',
      onActive(index: number) {}
    },
    {
      filterTitle: 'Inactive',
      filterCount: '124',
      filterTagColor: '#40D3C2',
      onActive(index: number) {}
    },
    {
      filterTitle: 'X Sub Asset',
      filterCount: '12',
      filterTagColor: '#F75A4A',
      onActive(index: number) {}
    }
  ];

  assetTraffic_Table: TableSetting = {
    columns: [
      {
        lable: 'Sub Asset Name',
        type: 2,
        field: 'Sub_Asset_Name',
        thumbField: 'thumbField'
      },
      { lable: 'Date', type: 1, field: 'Date' },
      {
        lable: 'Make',
        type: 1,
        field: 'Make',
        thumbField: 'thumbField_Make',
        renderer: 'companyRenderer'
      },
      { lable: 'Model', type: 1, field: 'Model' },
      { lable: 'Policy', type: 1, field: 'Policy' },
      { lable: 'Serial Number', type: 2, field: 'Serial_Number' },
      { lable: 'Type', type: 1, field: 'Asset' },
      {
        lable: 'Warranty Expire Date',
        type: 1,
        field: 'Warranty_Expire_Date',
        width: 200
      }
    ],
    data: [
      {
        thumbField: 'thumb1.png',
        Sub_Asset_Name: 'Sub Asset Name',
        Date: '2 Days ago',
        thumbField_Make: 'bmw.png',
        Model: 'Text text',
        Policy: 'Policy Name',
        Serial_Number: '234567899',
        Asset: 'Gear',
        Warranty_Expire_Date: '00/00/0000'
      },
      {
        thumbField: 'thumb1.png',
        Sub_Asset_Name: 'Sub Asset Name',
        Date: '2 Days ago',
        thumbField_Make: 'bmw.png',
        Model: 'Text text',
        Policy: 'Policy Name',
        Serial_Number: '234567899',
        Asset: 'Gear',
        Warranty_Expire_Date: '00/00/0000'
      },
      {
        thumbField: 'thumb1.png',
        Sub_Asset_Name: 'Sub Asset Name',
        Date: '2 Days ago',
        thumbField_Make: 'bmw.png',
        Model: 'Text text',
        Policy: 'Policy Name',
        Serial_Number: '234567899',
        Asset: 'Gear',
        Warranty_Expire_Date: '00/00/0000'
      },
      {
        thumbField: 'thumb1.png',
        Sub_Asset_Name: 'Sub Asset Name',
        Date: '2 Days ago',
        thumbField_Make: 'bmw.png',
        Model: 'Text text',
        Policy: 'Policy Name',
        Serial_Number: '234567899',
        Asset: 'Gear',
        Warranty_Expire_Date: '00/00/0000'
      },
      {
        thumbField: 'thumb1.png',
        Sub_Asset_Name: 'Sub Asset Name',
        Date: '2 Days ago',
        thumbField_Make: 'bmw.png',
        Model: 'Text text',
        Policy: 'Policy Name',
        Serial_Number: '234567899',
        Asset: 'Gear',
        Warranty_Expire_Date: '00/00/0000'
      },
      {
        thumbField: 'thumb1.png',
        Sub_Asset_Name: 'Sub Asset Name',
        Date: '2 Days ago',
        thumbField_Make: 'bmw.png',
        Model: 'Text text',
        Policy: 'Policy Name',
        Serial_Number: '234567899',
        Asset: 'Gear',
        Warranty_Expire_Date: '00/00/0000'
      },
      {
        thumbField: 'thumb1.png',
        Sub_Asset_Name: 'Sub Asset Name',
        Date: '2 Days ago',
        thumbField_Make: 'bmw.png',
        Model: 'Text text',
        Policy: 'Policy Name',
        Serial_Number: '234567899',
        Asset: 'Gear',
        Warranty_Expire_Date: '00/00/0000'
      },
      {
        thumbField: 'thumb1.png',
        Sub_Asset_Name: 'Sub Asset Name',
        Date: '2 Days ago',
        thumbField_Make: 'bmw.png',
        Model: 'Text text',
        Policy: 'Policy Name',
        Serial_Number: '234567899',
        Asset: 'Gear',
        Warranty_Expire_Date: '00/00/0000'
      },
      {
        thumbField: 'thumb1.png',
        Sub_Asset_Name: 'Sub Asset Name',
        Date: '2 Days ago',
        thumbField_Make: 'bmw.png',
        Model: 'Text text',
        Policy: 'Policy Name',
        Serial_Number: '234567899',
        Asset: 'Gear',
        Warranty_Expire_Date: '00/00/0000'
      },
      {
        thumbField: 'thumb1.png',
        Sub_Asset_Name: 'Sub Asset Name',
        Date: '2 Days ago',
        thumbField_Make: 'bmw.png',
        Model: 'Text text',
        Policy: 'Policy Name',
        Serial_Number: '234567899',
        Asset: 'Gear',
        Warranty_Expire_Date: '00/00/0000'
      }
    ]
  };

  constructor(private facade: SubAssetFacade) {}

  ngOnInit(): void {
    this.facade.loadAll();
  }
}

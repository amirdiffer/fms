import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { FilterCardSetting } from '@core/filter/filter.component';
import { TableSetting } from '@core/table';
import { SubAssetFacade } from '../+state/sub-asset';
import { Subscription } from 'rxjs';

@Component({
  selector: 'anms-sub-asset',
  templateUrl: './sub-asset.component.html',
  styleUrls: ['./sub-asset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubAssetComponent implements OnInit, OnDestroy {
  statisticsSubscription!: Subscription;

  downloadBtn = 'assets/icons/download-solid.svg';
  filterCard: FilterCardSetting[] = [
    {
      filterTitle: 'statistic.total',
      filterCount: '2456',
      filterTagColor: '#C543FF',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.active',
      filterCount: '356',
      filterTagColor: '#4462A2',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.inactive',
      filterCount: '124',
      filterTagColor: '#40D3C2',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.x_sub_asset',
      filterCount: '12',
      filterTagColor: '#F75A4A',
      onActive(index: number) {}
    }
  ];

  assetTraffic_Table: TableSetting = {
    columns: [
      {
        lable: 'tables.column.sub_asset_type',
        type: 2,
        field: 'Sub_Asset_Name',
        thumbField: 'thumbField'
      },
      { lable: 'tables.column.date', type: 1, field: 'Date' },
      {
        lable: 'tables.column.make',
        type: 1,
        field: 'Make',
        thumbField: 'thumbField_Make',
        renderer: 'companyRenderer'
      },
      { lable: 'tables.column.model', type: 1, field: 'Model' },
      { lable: 'tables.column.policy', type: 1, field: 'Policy' },
      { lable: 'tables.column.serial_number', type: 2, field: 'Serial_Number' },
      { lable: 'tables.column.asset_type', type: 1, field: 'Asset' },
      {
        lable: 'tables.column.warranty_expire_date',
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
    this.facade.loadStatistics();

    this.facade.subAsset$.subscribe((x) => {
      console.log(x);
    });

    this.statisticsSubscription = this.facade.statistics$.subscribe(
      (response) => {
        console.log(response);
      }
    );
  }

  ngOnDestroy(): void {
    this.statisticsSubscription?.unsubscribe();
  }
}

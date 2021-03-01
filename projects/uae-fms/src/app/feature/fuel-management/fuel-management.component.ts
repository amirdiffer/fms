import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FilterCardSetting } from '@core/filter';
import { FuelCardsFacade } from '../fuel-management/+state/fuel-cards';
import { AssetUsageFacade } from './+state/asset-usage';
import { Router } from '@angular/router';
import { ColumnType } from '@core/table';

@Component({
  selector: 'anms-fuel-management',
  templateUrl: './fuel-management.component.html',
  styleUrls: ['./fuel-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuelManagementComponent implements OnInit {
  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';
  filterSetting: FilterCardSetting[] = [
    {
      filterTitle: 'statistic.total',
      filterTagColor: '#B892FF',
      filterCount: '2456',
      onActive(index: number): void {}
    },
    {
      filterTitle: 'statistic.available',
      filterTagColor: '#EF7A85',
      filterCount: '356',
      onActive(index: number): void {}
    },
    {
      filterTitle: 'statistic.assigned',
      filterTagColor: '#709775',
      filterCount: '124',
      onActive(index: number): void {}
    }
  ];

  assetUsageTableData= [
    {
      asset: {
        img: 'thumb1.png',
        assetName: 'Asset Name',
        assetSubName: 'DPD 0000001',
        ownership: 'Owned'
      },
      date: '00/00/0000 00:00',
      plateNumber: '123456789',
      tagNo: '123456789',
      amount: '27 Litters',
      mileage: '100 Km',
      totalUsage: '654327 Litters',
      cost: '000 AED',
      cardType: 'RFID-ENOC'
    },
    {
      asset: {
        img: 'thumb1.png',
        assetName: 'Asset Name',
        assetSubName: 'DPD 0000001',
        ownership: 'Owned'
      },
      date: '00/00/0000 00:00',
      plateNumber: '123456789',
      tagNo: '123456789',
      amount: '27 Litters',
      mileage: '100 Km',
      totalUsage: '654327 Litters',
      cost: '000 AED',
      cardType: 'RFID-ENOC'
    },
    {
      asset: {
        img: 'thumb1.png',
        assetName: 'Asset Name',
        assetSubName: 'DPD 0000001',
        ownership: 'Owned'
      },
      date: '00/00/0000 00:00',
      plateNumber: '123456789',
      tagNo: '123456789',
      amount: '27 Litters',
      mileage: '100 Km',
      totalUsage: '654327 Litters',
      cost: '000 AED',
      cardType: 'RFID-ENOC'
    },
    {
      asset: {
        img: 'thumb1.png',
        assetName: 'Asset Name',
        assetSubName: 'DPD 0000001',
        ownership: 'Owned'
      },
      date: '00/00/0000 00:00',
      plateNumber: '123456789',
      tagNo: '123456789',
      amount: '27 Litters',
      mileage: '100 Km',
      totalUsage: '654327 Litters',
      cost: '000 AED',
      cardType: 'RFID-ENOC'
    },
    {
      asset: {
        img: 'thumb1.png',
        assetName: 'Asset Name',
        assetSubName: 'DPD 0000001',
        ownership: 'Owned'
      },
      date: '00/00/0000 00:00',
      plateNumber: '123456789',
      tagNo: '123456789',
      amount: '27 Litters',
      mileage: '100 Km',
      totalUsage: '654327 Litters',
      cost: '000 AED',
      cardType: 'RFID-ENOC'
    },
    {
      asset: {
        img: 'thumb1.png',
        assetName: 'Asset Name',
        assetSubName: 'DPD 0000001',
        ownership: 'Owned'
      },
      date: '00/00/0000 00:00',
      plateNumber: '123456789',
      tagNo: '123456789',
      amount: '27 Litters',
      mileage: '100 Km',
      totalUsage: '654327 Litters',
      cost: '000 AED',
      cardType: 'RFID-ENOC'
    }
  ];
  assetUsageTableSetting = {
    columns:[
      {
        lable: 'Asset',
        field: 'asset',
        width:'17em',
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'assetsRenderer'
      },
      {
        lable: 'Plate Number',
        field: 'plateNumber',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'Tag No',
        field: 'tagNo',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'Date',
        field: 'date',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'Amount',
        field: 'amount',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'Mileage',
        field: 'mileage',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'Total Usage',
        field: 'totalUsage',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'Cost',
        field: 'cost',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'Card Type',
        field: 'cardType',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
    ],
    data:this.assetUsageTableData
  }
  fuelCardTableData =[
    {
      tagNo:{
        tagNo:'0550550505050',
        data:[
          {
            litters:'50',
            km:'10',
            day:'Saturday',
            date:'02/02/2020',
            time:'2:00 PM'
          },
          {
            litters:'50',
            km:'10',
            day:'Saturday',
            date:'02/02/2020',
            time:'2:00 PM'
          },
          {
            litters:'50',
            km:'10',
            day:'Saturday',
            date:'02/02/2020',
            time:'2:00 PM'
          }
        ]
      },
      used:'100 Litters',
      usageLimit:'400 Litters',
      asset:'Item no 123456',
      cardType:'RFID-ENOC',
      expire:'02/02/2020'
    },
    {
      tagNo:{
        tagNo:'0550550505050',
        data:[
          {
            litters:'50',
            km:'10',
            day:'Saturday',
            date:'02/02/2020',
            time:'2:00 PM'
          },
          {
            litters:'50',
            km:'10',
            day:'Saturday',
            date:'02/02/2020',
            time:'2:00 PM'
          },
          {
            litters:'50',
            km:'10',
            day:'Saturday',
            date:'02/02/2020',
            time:'2:00 PM'
          }
        ]
      },
      used:'100 Litters',
      usageLimit:'400 Litters',
      asset:'Item no 123456',
      cardType:'RFID-ENOC',
      expire:'02/02/2020'
    },
    {
      tagNo:{
        tagNo:'0550550505050',
        data:[
          {
            litters:'50',
            km:'10',
            day:'Saturday',
            date:'02/02/2020',
            time:'2:00 PM'
          },
          {
            litters:'50',
            km:'10',
            day:'Saturday',
            date:'02/02/2020',
            time:'2:00 PM'
          },
          {
            litters:'50',
            km:'10',
            day:'Saturday',
            date:'02/02/2020',
            time:'2:00 PM'
          }
        ]
      },
      used:'100 Litters',
      usageLimit:'400 Litters',
      asset:'Item no 123456',
      cardType:'RFID-ENOC',
      expire:'02/02/2020'
    }
  ]
  fuelCardsTableSetting = {
    columns: [
      {
        lable: 'Tag No',
        field: 'tagNo',
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'fuelCardRenderer'
      },
      {
        lable: 'Used',
        field: 'used',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'Usage Limit',
        field: 'usageLimit',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'Asset',
        field: 'asset',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'Card Type',
        field: 'cardType',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'Card Type',
        field: 'expire',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
    ],
    data: this.fuelCardTableData
  }

  constructor(
    private _facadeFuelCard: FuelCardsFacade,
    private _facadeAssetUsage: AssetUsageFacade,
    private _router: Router
  ) {}

  selectedTab;
  ngOnInit(): void {
    this._facadeFuelCard.loadAll();
    this._facadeFuelCard.fuelCards$.subscribe(
      (data) => {
         console.log(data)
      }
    )
    this._facadeAssetUsage.loadAll();
  }
  addClicked(e: Event) {
    console.log(this._router.navigate(['add-fuel-card']));

    switch (this.selectedTab) {
      case 'Fuel Cards':
        this._router.navigate(['fuel-management/add-fuel-card']);
        break;
      case 'Asset Usage':
        this._router.navigate(['fuel-management/add-asset-usage']);
        break;
      default:
        this._router.navigate(['fuel-management/add-fuel-card']);
        break;
    }
  }
}

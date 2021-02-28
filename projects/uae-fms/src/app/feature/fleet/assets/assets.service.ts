import { Injectable } from '@angular/core';
import { ColumnType } from '@core/table';
import { IAssets, IPending } from './assets.model';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  private assetMaster = (): IAssets[] => {
    const data = [];
    for (let index = 0; index < 9; index++) {
      const el = {
        asset: {
          img: 'thumb1.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          ownership: 'Owned'
        },
        type: 'Car',
        businessCategory: 'VIP',
        allocated: 'Finance',
        operator: 'Sam Smith',
        status: 'Work Shop',
        submitOn: '2 day ago',
        brand: 'bmw.png',
        killometer: 25000 + index,
        statusColor: '#009EFF'
      };
      data.push(el);
    }
    return data;
  };
  private pedingRegistration = (): IPending[] => {
    const data = [];
    for (let index = 0; index < 9; index++) {
      const el = {
        asset: {
          img: 'thumb1.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          progress: Math.floor(Math.random() * 6) + 1
        },
        serialNumber: '123s125583456',
        brand: 'bmw.png',
        type: 'Car',
        businessCategory: 'VIP',
        createDate: '00/00/00',
        registrantionDate: '00/00/00',
        creator: 'Sam Smith'
      };
      data.push(el);
    }
    return data;
  };
  public assetMastertableSetting = () => {
    return {
      columns: [
        {
          lable: 'tables.column.asset',
          field: 'asset',
          width: '18em',
          type: ColumnType.lable,
          thumbField: '',
          renderer: 'assetsRenderer'
        },
        {
          lable: 'tables.column.type',
          field: 'type',
          width: 100,
          type: ColumnType.lable,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.business_category',
          field: 'businessCategory',
          width: 130,
          type: ColumnType.lable,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.allocated',
          field: 'allocated',
          width: 100,
          type: ColumnType.lable,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.operator',
          field: 'operator',
          width: 100,
          type: ColumnType.lable,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.status',
          field: 'status',
          width: 100,
          type: ColumnType.lable,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.submitted_on',
          field: 'submitOn',
          width: 100,
          type: ColumnType.lable,
          thumbField: '',
          renderer: '',
          sortable: true
        },
        {
          lable: 'tables.column.make',
          field: '',
          width: 100,
          type: 3,
          thumbField: 'brand',
          renderer: ''
        },
        {
          lable: 'tables.column.current_meter',
          field: 'killometer',
          width: 100,
          type: ColumnType.lable,
          thumbField: '',
          renderer: '',
          sortable: true
        }
      ],
      data: this.assetMaster(),
      rowSettings: {
        onClick: (col, data) => {
          console.log(col, data);
        }
      }
    };
  };
  public pedingRegistrationTableSetting = () => {
    return {
      columns: [
        {
          lable: 'tables.column.asset',
          field: 'asset',
          width: 130,
          type: 1,
          thumbField: '',
          renderer: 'assetsRenderer'
        },
        {
          lable: 'tables.column.s_n',
          field: 'serialNumber',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.make',
          field: '',
          width: 100,
          type: 3,
          thumbField: 'brand',
          renderer: ''
        },
        {
          lable: 'tables.column.type',
          field: 'type',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.business_category',
          field: 'businessCategory',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        }
      ],
      data: this.pedingRegistration()
    };
  };
  public pedingCustomizationTableSetting = () => {
    return {
      columns: [
        {
          lable: 'tables.column.asset',
          field: 'asset',
          width: 150,
          type: 1,
          thumbField: '',
          renderer: 'assetsRenderer'
        },
        {
          lable: 'tables.column.business_category',
          field: 'businessCategory',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.create_date',
          field: 'createDate',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.registration_date',
          field: 'registrantionDate',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.creator',
          field: 'creator',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        }
      ],
      data: this.pedingRegistration()
    };
  };
  private onClick() {
    console.log('hi');
  }
  constructor() {}
}

import { Injectable } from '@angular/core';
import { ColumnType } from '@core/table';
import { IAssets, IPending } from './assets.model';
import { FloatButtonType } from '@core/table/table.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  constructor(private router: Router) {}

  private assetMaster = (): IAssets[] => {
    const data = [];
    for (let index = 0; index < 9; index++) {
      const el = {
        id: index + 1,
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
          img: 'assets/thumb.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          progress: Math.floor(Math.random() * 6) + 1
        },
        serialNumber: '123s125583456',
        brand: 'bmw.png',
        type: 'Car',
        allocated: 'Finance',
        businessCategory: 'VIP',
        createDate: '00/00/00',
        registrantionDate: '00/00/00',
        creator: 'Sam Smith'
      };
      data.push(el);
    }
    return data;
  };
  private pedingCustomization = (): IPending[] => {
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
          lable: 'tables.column.allocated',
          field: 'allocated',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.make',
          field: 'make',
          width: 100,
          type: 1,
          thumbField: '',
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
        },
        {
          lable: '',
          field: 'floatButton',
          width: 1,
          type: ColumnType.lable,
          thumbField: '',
          renderer: 'floatButton'
        }
      ],
      data: this.pedingRegistration(),
      rowSettings: {
        onClick: (col, data, button?) => {},
        floatButton: [
          {
            button: 'external',
            onClick: (col, data ,  button?) => {
              this.router.navigate([`/fleet/assets/${data.id}/registration`]);
            }
          },
          // {
          //   button: 'cancel',
          //   color: '#F75A4A'
          // },
          // {
          //   button: 'checked'
          // }
        ]
      }
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
          renderer: 'dateRenderer'
        },
        {
          lable: 'tables.column.registration_date',
          field: 'registrantionDate',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: 'dateRenderer'
        },
        {
          lable: 'tables.column.creator',
          field: 'creator',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: '',
          field: 'floatButton',
          width: 0,
          type: ColumnType.lable,
          thumbField: '',
          renderer: 'floatButton'
        }
      ],
      data: this.pedingCustomization(),
      rowSettings: {
        onClick: (col, data, button?) => {},
        floatButton: [
          {
            button: 'external',
            color: '#3F3F3F',
            onClick: (col, data) => {
              this.router.navigate([`/fleet/assets/${data.id}/customization`]);
            }
          }
        ]
      }
    };
  };
  private onClick() {
    // console.log('hi');
  }
}

import { Injectable } from '@angular/core';
import { IAssets, IPending } from './assets.model';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  private  assetMaster = () :IAssets [] =>{
    const data = [];
    for (let index = 0; index < 9; index++) {
      const el = {
            asset:{
              img:'thumb1.png',
              assetName:'Asset Name',
              assetSubName: 'DPD 0000001',
              ownership: 'Owned',
            },
            type: 'Car',
            businessCategory: 'VIP',
            allocated: 'Finance',
            operator: 'Sam Smith',
            status: 'Work Shop',
            submitOn: '2 day ago',
            brand: 'bmw.png',
            killometer: 25000,
          };
      data.push(el)
    }
  return data
  }
  private pedingRegistration = () : IPending [] =>{
    const data = [];
    for (let index = 0; index < 9; index++) {
      const el = {
            asset:{
              img:'thumb1.png',
              assetName:'Asset Name',
              assetSubName: 'DPD 0000001',
              progress: Math.floor(Math.random() * 6) + 1   ,
            },
            serialNumber: '123s125583456',
            brand: 'bmw.png',
            type: 'Car',
            businessCategory: 'VIP',
            createDate:'00/00/00',
            registrantionDate: '00/00/00',
            creator: 'Sam Smith',
            
          };
      data.push(el)
    }
    return data
  }
  public assetMastertableSetting = () =>{
    return  {
      columns:[
        {
          lable: 'Asset',
          field: 'asset',
          width: 140,
          type:1,
          thumbField: '',
          renderer: 'assetsRenderer'
        },
        {
          lable: 'Type',
          field: 'type',
          width: 100,
          type:1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'Business Category',
          field: 'businessCategory',
          width: 100,
          type:1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'Allocated',
          field: 'allocated',
          width: 100,
          type:1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'Operator',
          field: 'operator',
          width: 100,
          type:1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'Status',
          field: 'status',
          width: 100,
          type:1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'Submitted On',
          field: 'submitOn',
          width: 100,
          type:1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'Make',
          field: '',
          width: 100,
          type:3,
          thumbField: 'brand',
          renderer: ''
        },
        {
          lable: 'Current meter',
          field: 'killometer',
          width: 100,
          type:1,
          thumbField: '',
          renderer: ''
        },
      ],
      data: this.assetMaster(),
      rowSettings: () =>{
        
      }
    }
  }
  public pedingRegistrationTableSetting = () =>{
    return  {
      columns:[
        {
          lable: 'Asset',
          field: 'asset',
          width: 130,
          type:1,
          thumbField: '',
          renderer: 'assetsRenderer'
        },
        {
          lable: 'S/N',
          field: 'serialNumber',
          width: 100,
          type:1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'Make',
          field: '',
          width: 100,
          type:3,
          thumbField: 'brand',
          renderer: ''
        },
        {
          lable: 'Type',
          field: 'type',
          width: 100,
          type:1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'Business Category',
          field: 'businessCategory',
          width: 100,
          type:1,
          thumbField: '',
          renderer: ''
        },

      ],
      data: this.pedingRegistration(),
    }
  }
  public pedingCustomizationTableSetting = () =>{
    return  {
      columns:[
        {
          lable: 'Asset',
          field: 'asset',
          width: 150,
          type:1,
          thumbField: '',
          renderer: 'assetsRenderer'
        },
        {
          lable: 'Bussiness Category',
          field: 'businessCategory',
          width: 100,
          type:1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'Create Date',
          field: 'createDate',
          width: 100,
          type:1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'Registrantion Date',
          field: 'registrantionDate',
          width: 100,
          type:1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'Creator',
          field: 'creator',
          width: 100,
          type:1,
          thumbField: '',
          renderer: ''
        },

      ],
      data: this.pedingRegistration(),
    }
  }
  private onClick(){
    console.log('hi')
  }
  constructor() { }
}

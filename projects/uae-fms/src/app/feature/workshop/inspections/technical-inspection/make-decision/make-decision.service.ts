import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ICustomization } from './customization/customization.model';
import { ITechnicalInspection } from './technicalInspection.model';

@Injectable({
  providedIn: 'root'
})
export class MakeDecisionService {
  private tableData: ITechnicalInspection [] = [
    {
      system: 'Engine',
      status: 'Need to Repair',
      cost: '1231565 AED',
      ratePerHour:'1231565 AED'
    },
    {
      system: 'Gear Box',
      status: '-',
      cost: '000',
      ratePerHour:'000'
    },
    {
      system: 'Electrical',
      status: '-',
      cost: '000',
      ratePerHour:'000'
    }
    ,
    {
      system: 'AC',
      status: '-',
      cost: '000',
      ratePerHour:'000'
    },
    {
      system: 'Brake System',
      status: '-',
      cost: '000',
      ratePerHour:'000'
    }
    ,
    {
      system: 'Tire',
      status: '-',
      cost: '000',
      ratePerHour:'000'
    }
  ]
  public tableSetting ={
    columns: [
      {
        lable: 'System',
        field: 'system',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'Status',
        field: 'status',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'Cost of Part',
        field: 'cost',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'Rate Per Hour',
        field: 'ratePerHour',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: ''
      }
    ],
    data:this.tableData
  }

  private tableDataCustomization: ICustomization[] = [
    {
      vehicleName: '00876-Abcd',
      vehicleImg: 'thumb1.png',
      businessCatrgory:'Title is here',
      item1:'Enter No',
      item2:'Enter No',
      item3:'Enter No',
    }
  ]
  public tableSettingCustomization ={
    columns: [
      {
        lable: 'Vehicle',
        field: 'vehicleName',
        width: 100,
        type: 2,
        thumbField: 'vehicleImg',
        renderer: ''
      },
      {
        lable: 'Business Category',
        field: 'businessCatrgory',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'Item 1',
        field: 'item1',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'Item 2',
        field: 'item2',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'Item 3',
        field: 'item3',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: ''
      },
    ],
    data: this.tableDataCustomization
  }
  private _makeDecisionOpen: boolean = false;
  private _makeDecision$ = new Subject<boolean>();

  public loadMakeDecision(open:boolean){
    this._makeDecision$.next(open)
  }
  public getMakeDecision():Observable<boolean>{
    return this._makeDecision$.asObservable();
  }
  constructor() { }
}

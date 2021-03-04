import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ICustomization } from './customization/customization.model';
import { ITechnicalInspection } from './technicalInspection.model';

@Injectable({
  providedIn: 'root'
})
export class MakeDecisionService {
  private tableData: ITechnicalInspection[] = [
    {
      system: 'Engine',
      status: 'Need to Repair',
      cost: '1231565 AED',
      ratePerHour: '1231565 AED'
    },
    {
      system: 'Gear Box',
      status: '-',
      cost: '000',
      ratePerHour: '000'
    },
    {
      system: 'Electrical',
      status: '-',
      cost: '000',
      ratePerHour: '000'
    },
    {
      system: 'AC',
      status: '-',
      cost: '000',
      ratePerHour: '000'
    },
    {
      system: 'Brake System',
      status: '-',
      cost: '000',
      ratePerHour: '000'
    },
    {
      system: 'Tire',
      status: '-',
      cost: '000',
      ratePerHour: '000'
    }
  ];
  public tableSetting = {
    columns: [
      {
        lable: 'tables.column.system',
        field: 'system',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.status',
        field: 'status',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.cost_of_part',
        field: 'cost',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.rate_per_hour',
        field: 'ratePerHour',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: ''
      }
    ],
    data: this.tableData
  };

  private tableDataCustomization: ICustomization[] = [
    {
      vehicleName: '00876-Abcd',
      vehicleImg: 'thumb1.png',
      businessCatrgory: 'Title is here',
      item1: 'Enter No',
      item2: 'Enter No',
      item3: 'Enter No'
    }
  ];
  public tableSettingCustomization = {
    columns: [
      {
        lable: 'tables.column.vehicle',
        field: 'vehicleName',
        width: 100,
        type: 2,
        thumbField: 'vehicleImg',
        renderer: ''
      },
      {
        lable: 'tables.column.business_category',
        field: 'businessCatrgory',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.item',
        field: 'item1',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.item',
        field: 'item2',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.item',
        field: 'item3',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: ''
      }
    ],
    data: this.tableDataCustomization
  };
  private _makeDecisionOpen: boolean = false;
  private _makeDecision$ = new Subject<boolean>();

  public loadMakeDecision(open: boolean) {
    this._makeDecision$.next(open);
  }
  public getMakeDecision(): Observable<boolean> {
    return this._makeDecision$.asObservable();
  }
  constructor() {}
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddRequestFakeService {
  private _tableDataService = [
    {
      nextService: 'In 4000 KM',
      serviceTask: 'Engine/Drive Belt(s) Replacement , Transmission Filter'
    },
    {
      nextService: '02/02/2020',
      serviceTask: 'Engine/Drive Belt(s) Replacement , Transmission Filter'
    },
    {
      nextService: '02/02/2020',
      serviceTask: 'Engine/Drive Belt(s) Replacement , Transmission Filter'
    },
    {
      nextService: 'In 4000 KM',
      serviceTask: 'Engine/Drive Belt(s) Replacement , Transmission Filter'
    },
    {
      nextService: '02/02/2020',
      serviceTask: 'Engine/Drive Belt(s) Replacement , Transmission Filter'
    }
  ];
  private _tableDateWaranty = [
    {
      warranty: 'Engine',
      endDate: '02/02/2020'
    },
    {
      warranty: 'Engine',
      endDate: '02/02/2020'
    },
    {
      warranty: 'Engine',
      endDate: '02/02/2020'
    }
  ];

  public tableSettingService = {
    columns: [
      {
        lable: 'Next Service',
        field: 'nextService',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'Service Task',
        field: 'serviceTask',
        width: 300,
        type: 1,
        thumbField: '',
        renderer: ''
      }
    ],
    data: this._tableDataService
  };

  public tableSettingWarranty = {
    columns: [
      {
        lable: 'Warranty For',
        field: 'warranty',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'End Date',
        field: 'endDate',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: ''
      }
    ],
    data: this._tableDateWaranty
  };

  constructor() {}
}

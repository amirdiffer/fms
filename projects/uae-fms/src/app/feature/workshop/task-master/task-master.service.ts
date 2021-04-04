import { Injectable } from '@angular/core';
import { ITaskMaster } from './task-master.model';

@Injectable({
  providedIn: 'root'
})
export class TaskMasterService {
  public tableSetting = {
    columns: [
      {
        lable: 'tables.column.task_name',
        field: 'taskName',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.time_estimate',
        field: 'timeEstimate',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.instruction',
        field: 'instruction',
        width: 200,
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
      },
      {
        lable: 'tables.column.skill',
        field: 'skill',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.part',
        field: 'part',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: ''
      }
    ],
    data: []
  };
  constructor() {}
}

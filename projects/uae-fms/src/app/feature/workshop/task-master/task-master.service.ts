import { Injectable } from '@angular/core';
import { ITaskMaster } from './task-master.model';

@Injectable({
  providedIn: 'root'
})
export class TaskMasterService {
  private tableData = (): ITaskMaster[] => {
    let data = [];
    for (let index = 0; index < 7; index++) {
      const el = {
        taskName: 'Change AC',
        timeEstimate: '7 hours',
        instrunction: 'Description is here, description is here',
        ratePerHour: '65 AED',
        skill: 'Skill is Here',
        part: 'Filter'
      };
      data.push(el);
    }
    return data;
  };
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
        field: 'instrunction',
        width: 200,
        type: 2,
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
    data: this.tableData()
  };
  constructor() {}
}

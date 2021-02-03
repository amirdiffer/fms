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
        lable: 'Task Name',
        field: 'taskName',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'Time Estimate',
        field: 'timeEstimate',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'Instrunction',
        field: 'instrunction',
        width: 200,
        type: 2,
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
      },
      {
        lable: 'Skill',
        field: 'skill',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'Part',
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

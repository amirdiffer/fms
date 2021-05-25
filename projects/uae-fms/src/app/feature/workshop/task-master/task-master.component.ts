import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { TaskMasterFacade } from '../+state/task-master';
import { ColumnType, TableComponent } from '@core/table';
import { Router } from '@angular/router';

@Component({
  selector: 'anms-task-master',
  templateUrl: './task-master.component.html',
  styleUrls: ['./task-master.component.scss']
})
export class TaskMasterComponent implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;
  searchIcon = 'assets/icons/search-solid.svg';
  downloadBtn = 'assets/icons/download-solid.svg';
  tableSetting = {
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
    data: [],
    rowSettings: {
      floatButton: [
        {
          button: 'edit',
          onClick: (col, data, button?) => {
            this.router.navigate(['/workshop/task-master/edit-task-master/' + data.id],).then();
          }
        }
      ]
    }
  };


  /*
  doesNeedParty: false
  id: 3
  instruction: "something3"
  name: "something33"
  ratePerHour: 20
  shopType: "BODYSHOP"
  skills: [{id: 3, name: "fixing"}]
  taskType: "NORMAL"
  timeEstimate: 1234
  */
  data$ = this._facade.taskMasters$.pipe(
    map((x) => {
      return x.map((y: any) => {
        const skills = y.skills;
        const skill =
          skills && skills instanceof Array && skills.length ? skills[0] : '';
        const row = {
          ...y,
          skill: skill ? skill.name : '',
          part: y.shopType,
          taskName: y.name
        };

        return row;
      });
    })
  );

  constructor(
    private _facade: TaskMasterFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._facade.loadAll();
  }

  eventPagination() {
    this._facade.loadAll();
  }

  exportTable() {
    let filter = {
      taskName: 'taskName',
      timeEstimate: 'timeEstimate',
      instruction: 'instruction',
      rate_per_hour: 'ratePerHour',
      skill: 'skill',
      part: 'part'
    }
    this.table.exportTable(this.tableSetting, 'TaskMaster', filter);
  }
}

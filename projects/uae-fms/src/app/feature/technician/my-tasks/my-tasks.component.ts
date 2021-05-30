import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnType, TableSetting } from '@core/table';
import { Subject } from 'rxjs';

@Component({
  selector: 'anms-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss']
})
export class MyTasksComponent implements OnInit {
  //#region Tables
  dataTask = new Subject();
  dataTask$ = this.dataTask.asObservable();
  taskSetting: TableSetting = {
    columns: [
      {
        lable: 'tables.column.task',
        type: 1,
        field: 'task',
        renderer: ''
      },
      {
        lable: 'tables.column.priority',
        type: 1,
        field: 'priority',
        renderer: ''
      },
      {
        lable: 'tables.column.progress',
        type: 1,
        field: 'progress',
        renderer: ''
      },
      {
        lable: 'tables.column.status',
        type: 1,
        field: 'status',
        renderer: ''
      },
      {
        lable: 'tables.column.action',
        type: 1,
        field: 'action',
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
      renderer: "collapesRenderer",
      rendererOptions: {},
      floatButton: [
        {
          button: 'external',
          onClick: (col, data) => {
            this.router.navigate(['overview' + data.id]);
          }
        }
      ]
    }
  }

  //#endregion

  constructor(
    private router: Router) {
    this.dataTask.next([]);
  }

  ngOnInit(): void {
    this.dataTask$.subscribe(x => {
      console.log(x);
    })



    setTimeout(() => {

      this.dataTask.next(
        [
          {
            task: "Do Something",
            priority: "High",
            progress: "20%",
            status: "In Progress",
            action: "",
          },
          {
            task: "Do Something",
            priority: "High",
            progress: "20%",
            status: "In Progress",
            action: "",
          },
          {
            task: "Do Something",
            priority: "High",
            progress: "20%",
            status: "In Progress",
            action: "",
          },
          {
            task: "Do Something",
            priority: "High",
            progress: "20%",
            status: "In Progress",
            action: "",
          },
          {
            task: "Do Something",
            priority: "High",
            progress: "20%",
            status: "In Progress",
            action: "",
          },
        ]
      )
    }, 1000);

  }

}

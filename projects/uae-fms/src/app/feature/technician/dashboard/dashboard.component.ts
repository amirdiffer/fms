import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnType, TableSetting } from '@core/table';
import { Subject } from 'rxjs';
import { ButtonType } from '@core/table/table.component';
import { DashboardNetworkService } from '../+state/dashboard/dashboard-network.service';

@Component({
  selector: 'anms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  //#region Filter
  filterSetting = [
    {
      filterTitle: 'statistic.not_started',
      filterCount: '0',
      filterTagColor: '#028D5D'
    },
    {
      filterTitle: 'statistic.started',
      filterCount: '0',
      filterTagColor: '#009EFF'
    },
    {
      filterTitle: 'statistic.close',
      filterCount: '0',
      filterTagColor: '#FCB614'
    },
    {
      filterTitle: 'statistic.delay',
      filterCount: '0',
      filterTagColor: '#F75A4A'
    }
  ];
  //#endregion

  //#region Tables
  dataDashboard = new Subject();
  dataDashboard$ = this.dataDashboard.asObservable();
  dashboardSetting: TableSetting = {
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
        renderer: 'progressRenderer'
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
        renderer: 'button',
        buttonType: ButtonType.playAndPause,
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
      onClick: (data, button?, col?) => {
      },
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

  constructor(private router: Router, private networkService: DashboardNetworkService) {
    this.dataDashboard.next([]);
  }

  ngOnInit(): void {
    this.dataDashboard$.subscribe(x => {
    })

    this.getStatistics();
    this.getTasks();

    setTimeout(() => {

      this.dataDashboard.next(
        [
          {
            task: "Do Something",
            priority: "High",
            progress: 10,
            status: "In Progress",
            action: "play",
          },
          {
            task: "Do Something",
            priority: "High",
            progress: 75,
            status: "In Progress",
            action: "pause",
          },
          {
            task: "Do Something",
            priority: "High",
            progress: 20,
            status: "In Progress",
            action: "play",
          },
          {
            task: "Do Something",
            priority: "High",
            progress: 20,
            status: "In Progress",
            action: "play",
          },
          {
            task: "Do Something",
            priority: "High",
            progress: 20,
            status: "In Progress",
            action: "play",
          },
        ]
      )
    }, 1000);

  }

  private getStatistics(): void {
    this.networkService.getStatistics().subscribe(response => {
      this.filterSetting.map((filter) => {
        switch (filter.filterTitle) {
          case 'statistic.not_started':
            filter.filterCount = response.message.notStarted;
            break;
          case 'statistic.started':
            filter.filterCount = response.message.started;
            break;
          case 'statistic.close':
            filter.filterCount = response.message.completed;
            break;
          case 'statistic.delay':
            filter.filterCount = response.message.delayed;
            break;
          default:
            break;
        }
      });
    })
  }

  private getTasks(): void {
    this.networkService.getTasks().subscribe(response => {
      const tasks = response.message
      const tasksArray = [];
      tasks.map(task => {
        const taskObject = {
          task: task.taskMaster.name,
          priority: task.priorityOrder,
          progress: 10,
          status: task.status,
        }
        tasksArray.push(taskObject);
      })

      if (tasksArray.length) {
        this.dataDashboard.next(tasksArray);
      }
    });
  }
}

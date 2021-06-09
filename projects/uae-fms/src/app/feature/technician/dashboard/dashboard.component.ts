import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnType, TableSetting } from '@core/table';
import { Subject } from 'rxjs';
import { ButtonType } from '@core/table/table.component';
import { DashboardNetworkService } from '../+state/dashboard/dashboard-network.service';
import { MyTasksNetworkService } from '@feature/technician/+state/my-tasks/my-tasks-network.service';

@Component({
  selector: 'anms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  searchIcon = 'assets/icons/search-solid.svg';

  //#region Filter
  filterSetting = [
    {
      filterTitle: 'statistic.not_started',
      filterCount: '0',
      filterTagColor: '#AAAAAA'
    },
    {
      filterTitle: 'statistic.started',
      filterCount: '0',
      filterTagColor: '#20E19D'
    },
    {
      filterTitle: 'statistic.close',
      filterCount: '0',
      filterTagColor: '#42D0D9'
    },
    {
      filterTitle: 'statistic.delay',
      filterCount: '0',
      filterTagColor: '#F2B06E'
    }
  ];
  //#endregion

  // region Tables
  dataDashboard = new Subject();
  dataDashboard$ = this.dataDashboard.asObservable();
  dashboardSetting: TableSetting = {
    columns: [
      {
        lable: 'tables.column.asset',
        type: 1,
        field: 'asset',
        renderer: ''
      },
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
        buttonType: ButtonType.playAndPause
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
        if (button === 'play') {
          if (data.status === 'PAUSED') {
            this.myTasksNetworkService
              .resumeTaskWithId(data.id)
              .subscribe((_) => {
                this.getTasks();
              });
          } else {
            this.myTasksNetworkService
              .startTaskWithId(data.id)
              .subscribe((_) => {
                this.getTasks();
              });
          }
        } else if (button === 'pause') {
          this.myTasksNetworkService.pauseTaskWithId(data.id).subscribe((_) => {
            this.getTasks();
          });
        }
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
  };

  // endregion

  constructor(
    private router: Router,
    private networkService: DashboardNetworkService,
    private myTasksNetworkService: MyTasksNetworkService
  ) {}

  ngOnInit(): void {
    this.getStatistics();
    this.getTasks();
  }

  private getStatistics(): void {
    this.networkService.getStatistics().subscribe((response) => {
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
    });
  }

  private getTasks(): void {
    this.networkService.getTasks().subscribe((response) => {
      const tasks = response.message;
      const tasksArray = [];
      tasks.map((task) => {
        const startDate = new Date(task.startDate * 1000);
        const full = startDate.getDate() + task.taskMaster.timeEstimate;
        const now = new Date(task.now * 1000);
        const progress = now.getDate();
        const progressValue = progress / full;
        const taskObject = {
          id: task.taskId,
          asset: task.asset.dpd,
          task: task.taskMaster.name,
          priority: task.priorityOrder,
          progress: progressValue,
          status: task.status,
          action:
            task.status === 'STARTED' || task.status === 'RESUMED'
              ? 'pause'
              : 'play'
        };
        tasksArray.push(taskObject);
      });

      if (tasksArray.length) {
        this.dataDashboard.next(tasksArray);
      }
    });
  }
}

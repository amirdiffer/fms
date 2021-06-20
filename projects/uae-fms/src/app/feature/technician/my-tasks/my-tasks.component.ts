import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnType, TableSetting } from '@core/table';
import { Subject, Subscription } from 'rxjs';
import {
  MyTasksNetworkService,
  TaskType
} from '@feature/technician/+state/my-tasks/my-tasks-network.service';
import { tap } from 'rxjs/operators';
import { ButtonType } from '@core/table/table.component';

@Component({
  selector: 'anms-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss']
})
export class MyTasksComponent implements OnInit {
  getMyTasksSubscription: Subscription | undefined;
  getTodayTasksSubscription: Subscription | undefined;
  getPausedTasksSubscription: Subscription | undefined;
  getDelayedTasksSubscription: Subscription | undefined;

  // region Tables
  dataAllTasks = new Subject();
  dataAllTasks$ = this.dataAllTasks.asObservable();

  dataTodayTasks = new Subject();
  dataTodayTasks$ = this.dataTodayTasks.asObservable();

  dataDelayedTasks = new Subject();
  dataDelayedTasks$ = this.dataDelayedTasks.asObservable();

  dataPausedTasks = new Subject();
  dataPausedTasks$ = this.dataPausedTasks.asObservable();

  allTasksTableSetting: TableSetting = {
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
        lable: 'tables.column.time_estimate',
        type: 1,
        field: 'estimate',
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
      onClick: (arg, arg2, arg3) => {
        if (arg2 === 'play') {
          if (arg.status === 'PAUSED') {
            this.myTasksNetworkService
              .resumeTaskWithId(arg.id)
              .subscribe((_) => {
                this.getAllTasks();
              });
          } else {
            this.myTasksNetworkService
              .startTaskWithId(arg.id)
              .subscribe((_) => {
                this.getAllTasks();
              });
          }
        } else if (arg2 === 'pause') {
          this.myTasksNetworkService.pauseTaskWithId(arg.id).subscribe((_) => {
            this.getAllTasks();
          });
        }
      },
      floatButton: [
        {
          button: 'external',
          onClick: (col, data) => {
            this.router
              .navigate([`dashboard/technician/task-overview/${data.id}`])
              .then();
          }
        }
      ]
    }
  };

  todayTasksTableSetting: TableSetting = { ...this.allTasksTableSetting };

  delayedTasksTableSetting: TableSetting = { ...this.allTasksTableSetting };

  pausedTasksTableSetting: TableSetting = { ...this.allTasksTableSetting };
  // endregion

  selectedTab = 'allTaskListTab';
  searchIcon = 'assets/icons/search-solid.svg';
  filterButton = 'assets/icons/filter.png';

  constructor(
    private router: Router,
    private myTasksNetworkService: MyTasksNetworkService
  ) {}

  ngOnInit(): void {
    this.getAllTasks();
  }

  private getAllTasks(): void {
    this.getMyTasksSubscription = this.myTasksNetworkService
      .getMyTasks()
      .pipe(
        tap((response) => {
          const tasksArray = [];
          const tasks = response.message;

          tasks.map((task) => {
            const startDate = new Date(task.startDate * 1000);
            const full = startDate.getDate() + task.taskMaster.timeEstimate;
            const now = new Date(task.now * 1000);
            const progress = now.getDate();
            const progressValue = progress / full;
            const taskObject = {
              id: task.taskId,
              task: task.taskMaster.name,
              priority: task.priorityOrder,
              estimate: `${task.taskMaster.timeEstimate} Days`,
              progress: progressValue,
              status: task.status,
              action:
                task.status === 'STARTED' || task.status === 'RESUMED'
                  ? 'pause'
                  : 'play'
            };
            tasksArray.push(taskObject);
          });

          this.dataAllTasks.next(tasksArray);

          this.getMyTasksSubscription?.unsubscribe();
        })
      )
      .subscribe();

    this.getTodayTasksSubscription = this.myTasksNetworkService
      .getMyTasks('active')
      .pipe(
        tap((response) => {
          const tasksArray = [];
          const tasks = response.message;
          tasks.map((task) => {
            const startDate = new Date(task.startDate * 1000);
            const full = startDate.getDate() + task.taskMaster.timeEstimate;
            const now = new Date(task.now * 1000);
            const progress = now.getDate();
            const progressValue = progress / full;
            const taskObject = {
              id: task.taskId,
              task: task.taskMaster.name,
              priority: task.priorityOrder,
              estimate: `${task.taskMaster.timeEstimate} Days`,
              progress: progressValue,
              status: task.status,
              action:
                task.status === 'STARTED' || task.status === 'RESUMED'
                  ? 'pause'
                  : 'play'
            };
            tasksArray.push(taskObject);
          });

          this.dataTodayTasks.next(tasksArray);

          this.getTodayTasksSubscription?.unsubscribe();
        })
      )
      .subscribe();

    this.getPausedTasksSubscription = this.myTasksNetworkService
      .getMyTasks('paused')
      .pipe(
        tap((response) => {
          const tasksArray = [];
          const tasks = response.message;
          tasks.map((task) => {
            const startDate = new Date(task.startDate * 1000);
            const full = startDate.getDate() + task.taskMaster.timeEstimate;
            const now = new Date(task.now * 1000);
            const progress = now.getDate();
            const progressValue = progress / full;
            const taskObject = {
              id: task.taskId,
              task: task.taskMaster.name,
              priority: task.priorityOrder,
              estimate: `${task.taskMaster.timeEstimate} Days`,
              progress: progressValue,
              status: task.status,
              action:
                task.status === 'STARTED' || task.status === 'RESUMED'
                  ? 'pause'
                  : 'play'
            };
            tasksArray.push(taskObject);
          });

          this.dataPausedTasks.next(tasksArray);

          this.getPausedTasksSubscription?.unsubscribe();
        })
      )
      .subscribe();

    this.getDelayedTasksSubscription = this.myTasksNetworkService
      .getMyTasks('delayed')
      .pipe(
        tap((response) => {
          const tasksArray = [];
          const tasks = response.message;
          tasks.map((task) => {
            const startDate = new Date(task.startDate * 1000);
            const full = startDate.getDate() + task.taskMaster.timeEstimate;
            const now = new Date(task.now * 1000);
            const progress = now.getDate();
            const progressValue = progress / full;
            const taskObject = {
              id: task.taskId,
              task: task.taskMaster.name,
              priority: task.priorityOrder,
              estimate: `${task.taskMaster.timeEstimate} Days`,
              progress: progressValue,
              status: task.status,
              action:
                task.status === 'STARTED' || task.status === 'RESUMED'
                  ? 'pause'
                  : 'play'
            };
            tasksArray.push(taskObject);
          });

          this.dataDelayedTasks.next(tasksArray);

          this.getDelayedTasksSubscription?.unsubscribe();
        })
      )
      .subscribe();
  }
}

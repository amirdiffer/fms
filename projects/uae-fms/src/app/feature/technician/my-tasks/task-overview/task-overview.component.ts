import { Component, OnInit } from '@angular/core';
import { OverviewNetworkService } from '../../+state/my-tasks/overview/overview-network.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { DialogService } from '@core/dialog/dialog-template.component';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectEffectiveTheme } from '@core/core.module';
import { MyTasksNetworkService } from '@feature/technician/+state/my-tasks/my-tasks-network.service';

@Component({
  selector: 'anms-task-overview',
  templateUrl: './task-overview.component.html',
  styleUrls: ['./task-overview.component.scss']
})
export class TaskOverviewComponent implements OnInit {
  fileServer = environment.baseFileServer;

  isRowExpanded = false;

  taskDetails: any = {};
  taskHistoryArray: any[] = [];

  assetDetail: any = {};
  warranties: any[] = [];

  timeRemaining = 0;
  taskProgress = 0;

  selectEffectiveTheme = selectEffectiveTheme;
  theme$: Observable<string>;

  constructor(
    private overviewNetworkService: OverviewNetworkService,
    private myTasksNetworkService: MyTasksNetworkService,
    private activatedRoute: ActivatedRoute,
    private dialog: DialogService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.theme$ = this.store.pipe(select(this.selectEffectiveTheme));
    this.activatedRoute.params.subscribe((params) => {
      this.getTaskDetails(params.id);
      this.getTaskHistory(params.id);
    });
  }

  onRowSelect(): void {
    this.isRowExpanded = !this.isRowExpanded;
  }

  onPlayOrPauseClick(event: Event): void {
    event.stopPropagation();

    if (this.taskDetails.status === 'PAUSED') {
      this.myTasksNetworkService
        .resumeTaskWithId(this.taskDetails.taskId)
        .subscribe((_) => {
          this.getTaskDetails(this.taskDetails.taskId);
        });
    } else if (
      this.taskDetails.status === 'STARTED' ||
      this.taskDetails.status === 'RESUMED'
    ) {
      this.myTasksNetworkService
        .pauseTaskWithId(this.taskDetails.taskId)
        .subscribe((_) => {
          this.getTaskDetails(this.taskDetails.taskId);
        });
    } else if (this.taskDetails.status === 'NONE') {
      this.myTasksNetworkService
        .startTaskWithId(this.taskDetails.taskId)
        .subscribe((_) => {
          this.getTaskDetails(this.taskDetails.taskId);
        });
    }
  }

  onCompleteClick(event: Event): void {
    event.stopPropagation();

    this.myTasksNetworkService
      .completeTaskWithId(this.taskDetails.taskId)
      .subscribe((response) => {
        this.getTaskDetails(this.taskDetails.taskId);
      });
  }

  onAddNoteClick(): void {
    const dialog = this.dialog.show(
      'success',
      'Task Detail',
      'Add some note to the task',
      'Confirm',
      'Cancel',
      true
    );
    dialog.dialogTextInput$.subscribe((inputText) => {
      if (inputText) {
        this.postNote(this.taskDetails.taskId, inputText);
      }
    });
  }

  private getTaskDetails(id: number): void {
    this.overviewNetworkService
      .getTaskDetail(id)
      .pipe(
        tap((response) => {
          this.taskDetails = response.message;

          const startDate = new Date(this.taskDetails.startDate * 1000);
          const full =
            startDate.getDate() + this.taskDetails.taskMaster.timeEstimate;
          const now = new Date(this.taskDetails.now * 1000);
          const progress = now.getDate();
          this.taskProgress = progress / full;

          this.assetDetail = response.message.asset;
          this.warranties = this.assetDetail.warranties;
        })
      )
      .subscribe();
  }

  private getTaskHistory(id: number): void {
    this.overviewNetworkService
      .getTaskHistory(id)
      .pipe(
        tap((response) => {
          this.taskHistoryArray = response.message;
        })
      )
      .subscribe();
  }

  private postNote(id: number, inputText: string): void {
    const body = {
      description: inputText
    };
    this.overviewNetworkService
      .postTechnicianTaskNote(id, body)
      .subscribe((_) => {
        this.getTaskHistory(this.taskDetails.taskId);
      });
  }
}

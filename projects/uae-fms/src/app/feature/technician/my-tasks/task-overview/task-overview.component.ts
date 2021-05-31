import { Component, OnInit } from '@angular/core';
import { TableSetting } from '@core/table';
import { OverviewNetworkService } from '../../+state/my-tasks/overview/overview-network.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { DialogService } from '@core/dialog/dialog-template.component';

@Component({
  selector: 'anms-task-overview',
  templateUrl: './task-overview.component.html',
  styleUrls: ['./task-overview.component.scss']
})
export class TaskOverviewComponent implements OnInit {

  taskDetailsTable: TableSetting = {
    columns: [
      {
        lable: 'Task Title', field: 'taskTitle', isHeaderHidden: true
      },
      {
        lable: 'Progress', field: 'progress', isHeaderHidden: true
      },
      {
        lable: 'Action', field: 'action', isHeaderHidden: true
      }
    ],
    data: [
      {
        id: 1,
        taskTitle: {
          title: 'test data',
          subTitle: 'test data'
        },
        progress: {
          title: 'test data',
          subTitle: 'test data'
        },
        action: 'test data',
        extendedInfo: {
          info: ['test data'],
          partDetails: [
            'test data', 'test data'
          ]
        }
      },
      {
        id: 2,
        taskTitle: {
          title: 'test data',
          subTitle: 'test data'
        },
        progress: {
          title: '',
          subTitle: 'test data'
        },
        action: 'test data',
        extendedInfo: {
          info: ['test data'],
          partDetails: [
            'test data', 'test data'
          ]
        }
      },
      {
        id: 3,
        taskTitle: {
          title: 'test data',
          subTitle: 'test data'
        },
        progress: {
          title: 'test data',
          subTitle: 'test data'
        },
        action: 'test data',
        extendedInfo: {
          info: ['test data'],
          partDetails: [
            'test data', 'test data'
          ]
        }
      }
    ],
    rowSettings: {
      renderer: 'collapesRenderer',
      rendererOptions: {},
      onClick: (data, id, value) => {
        if (value === 'addNoteDialog') {
          const dialog = this.dialog.show('success', 'Add Note',
            'Add note to the task details', 'Confirm', 'Cancel', true)
          dialog.dialogTextInput$.subscribe( inputText => {
            data.extendedInfo.info.push(inputText)
          })
        }
      }
    }
  };

  assetDetail: any = {};
  warranties: any[] = []

  constructor(private overviewNetworkService: OverviewNetworkService, private activatedRoute: ActivatedRoute,
              private dialog: DialogService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(p => {
      this.getAsset(p.id);
      this.getTaskDetails(p.id);
      this.getTaskHistory(p.id);
    });
  }

  private getAsset(id: number): void {

    this.overviewNetworkService.getAsset(id)
      .pipe(
        tap((response) => {
          this.assetDetail = response.message;
          this.warranties = this.assetDetail.warranties
        })
      ).subscribe();
  }

  private getTaskDetails(id: number): void {

    this.overviewNetworkService.getTaskDetail(id).pipe(
      tap(_ => {
      })
    ).subscribe();
  }

  private getTaskHistory(id: number): void {

    this.overviewNetworkService.getTaskHistory(id).pipe(
      tap(_ => {
      })
    ).subscribe();
  }

}

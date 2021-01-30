import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'table-assets-renderer',
  template: `
    <div class="row m-0">
      <img
        class="asset-image col-5 p-0 m-0"
        [src]="fileServerBase + data.img"
      />
      <span class="title col-7">
        <<<<<<< HEAD
        <p class="m-0">{{ data.assetName }}</p>
        <small> {{ data.assetSubName }} </small>
        =======
        <p class="m-0">{{ data.assetName }} {{ data.userName }}</p>
        <small> {{ data.assetSubName }} {{ data.subName }}</small>
        >>>>>>> 5b1c9c69e7de507349d9450b0873aac1236ab2b6
        <ng-container *ngIf="data.ownership">
          <div class="ownership-badge">{{ data.ownership }}</div>
        </ng-container>
        <ng-container *ngIf="data.progress">
          <div class="w-100 progress-container">
            <mat-progress-bar
              [value]="progressBar"
              mode="determinate"
            ></mat-progress-bar>
            <small class="progress-value">{{ data.progress }}/6</small>
          </div>
        </ng-container>
      </span>
    </div>
  `,
  styles: [
    `
<<<<<<< HEAD
      .asset-image {
        height: 70px;
        max-width: 70px;
        border-radius: 4px;
      }
      small {
        color: #000000de;
      }
      .ownership-badge {
        background: #fcb614 0% 0% no-repeat padding-box;
=======
    .asset-image{
        height: 70px;
        max-width: 70px;
        border-radius: 7px;
    }
    small{
        color:#000000DE;
    }
    .ownership-badge{
        background: #FCB614 0% 0% no-repeat padding-box;
>>>>>>> 5b1c9c69e7de507349d9450b0873aac1236ab2b6
        max-width: 70px;
        border: radius;
        border-radius: 4px;
        color: #fff;
        text-align: center;
        font-size: 12px;
      }
      .progress-container {
        position: relative;
        display: flex;
        align-items: center;
      }
      .mat-progress-bar {
        height: 10px;
        border-radius: 8px;
      }
      .progress-value {
        color: #000000de;
        font-size: 12px;
        margin-left: 6px;
      }
    `
  ]
})
export class AssetsRendererComponent implements OnInit {
  @Input() data;
  progressBar;
  fileServerBase = environment.baseFileServer;
  constructor() {}

  ngOnInit() {
    if (this.data.progress) {
      this.progressBar = (+this.data.progress * 100) / 6;
    }
  }
}

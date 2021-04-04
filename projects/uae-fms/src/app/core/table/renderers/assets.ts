import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'table-assets-renderer',
  template: `
    <div class="row m-0">
      <img
        class="asset-image col-5 p-0 m-0"
        [src]="data.img"
      />
      <span class="title col-7">
        <p class="m-0">{{ data.assetName }} {{ data.userName }}</p>
        <small> {{ data.assetSubName }} {{ data.subName }}</small>
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
      .asset-image {
        height: 4.3em;
        max-width: 4.3em;
        border-radius: 0.5em;
      }
      .ownership-badge {
        background: #fcb614 0% 0% no-repeat padding-box;
      }
      .progress-container {
        position: relative;
        display: flex;
        align-items: center;
      }
      .mat-progress-bar {
        height: 0.625em;
        border-radius: 8px;
      }
      .progress-value {
        font-size: 0.8em;
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

import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'table-assets-renderer',
  template: `
    <div class="row m-0">
      <img
        class="asset-image col-5 p-0 m-0"
        [src]="fileServerBase + data.img"
        onerror="this.src='assets/thumb.png'"
      />
      <span class="title col-7 align-self-center">
        <p class="m-0" pTooltip='{{data.assetName }}' tooltipPosition='bottom' >{{ data.assetName }} {{ data.userName }}</p>
        <small pTooltip='{{data.assetSubName }}' tooltipPosition='bottom'> {{ data.assetSubName }} {{ data.subName }}</small>
        <ng-container *ngIf="data.ownership">
          <div class="ownership-badge" pTooltip='{{data.ownership }}' tooltipPosition='bottom'>{{ data.ownership }}</div>
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
        margin: 0 6px;
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
      this.data.progress = false;
      this.progressBar = (+this.data.progress * 100) / 6;
    }
  }
}

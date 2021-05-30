import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'table-asset-renderer',
  template: `
    <div class="d-flex">
      <div>
        <img class="asset-image" [src]="fileServerBase + asset.assetPicture" />
      </div>
      <div class="d-flex flex-column">
        <span class="asset-name">{{ asset.assetName }}</span>
        <span class="asset-info">{{ asset.assetInfo }}</span>
        <span
          [ngStyle]="{ 'background-color': getStatusColor(asset.assetStatus) }"
          class="asset-badge"
          >{{ asset.assetStatus }}</span
        >
      </div>
    </div>
  `,
  styles: [
    `
      div .asset-image {
        max-width: 60px;
        max-height: 60px;
        border-radius: 4px;
      }

      div .asset-name {
        margin-left: 10px;
        text-align: left;
        color: #000000de;
      }

      div .asset-info {
        margin-left: 10px;
        text-align: left;
        color: #000000de;
      }
      div .asset-badge {
        margin-left: 10px;
        text-align: left;
        color: #ffffff;
        width: max-content;
        padding: 2px 8px;
      }
    `
  ]
})
export class TableAssetRendererComponent implements OnInit {
  @Input() asset;
  fileServerBase = environment.baseFileServer;

  constructor() {}

  ngOnInit() {}

  getStatusColor(status: string): string {
    switch (status) {
      case 'owned': {
        return '#FCB614';
      }
      default: {
        return '#000000';
      }
    }
  }
}

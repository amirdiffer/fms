import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'table-boolean-renderer',
  template: `
    <div class="d-flex" *ngIf="data">
        <img class="asset-image" src="../../../assets/icons/check.svg" />
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
        font-size: 15px;
        color: #000000de;
      }

      div .asset-info {
        margin-left: 10px;
        text-align: left;
        font-size: 12px;
        color: #000000de;
      }
      div .asset-badge {
        margin-left: 10px;
        text-align: left;
        font-size: 12px;
        color: #ffffff;
        width: max-content;
        padding: 2px 8px;
      }
    `
  ]
})
export class TableBooleanRendererComponent implements OnInit {
  @Input() data:boolean;
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

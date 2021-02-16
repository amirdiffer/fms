import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'table-vehicle-renderer',
  template: `
    <div class="cell">
      <div
        class="status-color"
        *ngIf="vehicle.statusColor"
        [style]="'background :' + vehicle.statusColor + ';'"
      ></div>
      <img
        class="flag"
        *ngIf="vehicle.flag"
        src="../../../../assets/icons/flag.svg"
      />
      <img class="vehicle-image" [src]="fileServerBase + vehicle.thumb" />
      <span class="lables">
        <span class="vehicle-name">{{ vehicle.title }}</span>
        <span class="dpd" *ngIf="vehicle.dpd">{{ vehicle.dpd }}</span>
      </span>
    </div>
  `,
  styles: [
    `
      .cell .flag {
        width: 23px;
        height: fit-content;
        align-self: center;
      }

      .cell {
        display: flex;
        flex-direction: row;
      }

      .cell .vehicle-image {
        max-width: 50px;
        max-height: 50px;
        border-radius: 4px;
        margin: 10px;
      }

      .cell .vehicle-name {
      }

      .lables {
        margin: 5px;
        display: flex;
        flex-direction: column;
      }
    `
  ]
})
export class TableVehicleRendererComponent implements OnInit {
  @Input() vehicle;
  fileServerBase = environment.baseFileServer;

  constructor() {}

  ngOnInit() {}
}

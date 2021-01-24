import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'table-vehicle-renderer',
  template: `
    <div>
      <img class="vehicle-image" [src]="fileServerBase + vehicle.thumb" />
      <span class="vehicle-name">{{ vehicle.vehicle }}</span>
    </div>
  `,
  styles: [
    `
      div .vehicle-image {
        max-width: 40px;
        max-height: 40px;
        border-radius: 4px;
      }

      div .vehicle-name {
        margin: 5px;
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

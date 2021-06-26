import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'table-information-renderer',
  template: `
    <div class="d-flex flex-column">
      <span class="line-1"  pTooltip='{{data.email }}' tooltipPosition='bottom'>{{ data.email }}</span>
      <span class="line-2"  pTooltip='{{data.phoneNumber}}' tooltipPosition='bottom'>{{ data.phoneNumber }}</span>
    </div>
  `,
  styles: [
    `
      div .line-1 {
        margin-left: 10px;
        text-align: left;
        color: #000000de;
      }

      div .line-2 {
        margin-left: 10px;
        text-align: left;
        color: #000000de;
      }
    `
  ]
})
export class TableInformationRendererComponent implements OnInit {
  @Input() data;
  @Input() column;
  fileServerBase = environment.baseFileServer;

  constructor() {}

  ngOnInit() {}
}

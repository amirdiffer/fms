import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'table-double-line-renderer',
  template: `
    <div class="d-flex flex-column">
      <span class="line-1">{{ user[column.field].line1 }}</span>
      <span class="line-2">{{ user[column.field].line2 }}</span>
    </div>
  `,
  styles: [
    `
      div .line-1 {
        margin-left: 10px;
        text-align: left;
      }

      div .line-2 {
        margin-left: 10px;
        text-align: left;
      }
    `
  ]
})
export class TableDoubleLineRendererComponent implements OnInit {
  @Input() user;
  @Input() column;
  fileServerBase = environment.baseFileServer;

  constructor() {}

  ngOnInit() {}
}

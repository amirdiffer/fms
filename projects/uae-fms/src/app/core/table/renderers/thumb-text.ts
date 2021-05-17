import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'table-thumb-text-renderer',
  template: `
    <div class="d-flex">
      <div>
        <img class="thumbField" [src]="data.thumbImage" />
      </div>
      <span class="thumbText">{{ data.thumbText }}</span>
    </div>
  `,
  styles: [
    `
      div .thumbField {
        max-width: 40px;
        max-height: 40px;
        border-radius: 4px;
      }

      .thumbText {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 10px;
        text-align: left;
      }
    `
  ]
})
export class TableThumbTextRendererComponent implements OnInit {
  @Input() data;

  fileServerBase = environment.baseFileServer;

  constructor() {}

  ngOnInit() {}
}

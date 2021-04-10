import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'table-double-line-renderer',
  template: `
  <div *ngIf="!column.rendererOptions || !column.rendererOptions.type">
    <div *ngIf="!column.rendererOptions" class="d-flex flex-column">
      <span class="line-1">{{ user[column.field].line1 }}</span>
      <span class="line-2">{{ user[column.field].line2 }}</span>
    </div>
      <div *ngIf="column.rendererOptions" class="d-flex flex-column">
        <span class="line-1">{{ user[column.field][column.rendererOptions.line1] }}</span>
        <span class="line-2">{{ user[column.field][column.rendererOptions.line2] }}</span>
      </div>
  </div>
  <div *ngIf="column.rendererOptions && column.rendererOptions.type && column.rendererOptions.type=='array'">
    <div *ngIf="!column.rendererOptions" class="d-flex flex-column">
      <span class="line-1">{{ getLastElement(user[column.field].line1) }}</span>
      <span class="line-2">{{ getLastElement(user[column.field].line2) }}</span>
    </div>
      <div *ngIf="column.rendererOptions" class="d-flex flex-column">
        <span class="line-1">{{ getLastElement(user[column.field][column.rendererOptions.line1]) }}</span>
        <span class="line-2">{{ getLastElement(user[column.field][column.rendererOptions.line2]) }}</span>
      </div>
  </div>
  <div *ngIf="column.rendererOptions.type=='list'">
    <div class="d-flex">
      <span class="line-1">{{ getLastElement(user[column.field][column.rendererOptions.line1]) }}</span>
      <span class="line-2" style="opacity:.8">{{ getLastElement(user[column.field][column.rendererOptions.line2]) }}</span>
    </div>
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

  constructor() { }

  ngOnInit() {
    console.log(this.user)
  }

  getLastElement(data: any) {
    if (typeof data == "string") return data;
    if (typeof data == "object") {
      if (data.length > 0)
        return data[data.length - 1];
      else
        return '';
    }
  }
}

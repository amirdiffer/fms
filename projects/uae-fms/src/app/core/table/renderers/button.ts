import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'table-button-renderer',
  template: `
    <div>
      <button (click)="col.onClick(row)">{{ getLable(col.field) }}</button>
    </div>
  `,
  styles: [
    `
      div button {
        background-color: #0da06e;
        color: #ffffff;
        width: 80px;
        height: 45px;
        border: 0px;
        border-radius: 3px;
      }
    `
  ]
})
export class TableButtonRendererComponent implements OnInit {
  @Input() button;
  @Input() col;
  @Input() row;

  constructor() {}

  ngOnInit() {}

  getLable(field: string): string {
    switch (field) {
      case 'ButtonReject': {
        return 'Reject';
      }
      case 'ButtonApprove': {
        return 'Approve';
      }
      case 'ButtonRecived': {
        return 'Recived';
      }
      case 'ButtonConfirm': {
        return 'Confirm';
      }
      default: {
        return '';
      }
    }
  }
}

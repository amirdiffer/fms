import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'table-button-renderer',
  template: `
    <div class="button-table-container">
      <button class="btn-primary-large" *ngIf="getLable(col.field) != 'Reject'" (click)="col.onClick(row)">{{ getLable(col.field) }}</button>
      <button class="btn-primary-large reject" *ngIf="getLable(col.field) == 'Reject'">{{ getLable(col.field) }}</button>

    </div>
  `,
  styles: [
    `
      div button {
        padding: 1em 1.3em;
        height: auto;
        width: 7em
      }
      button.reject{
        background: #A09999;
        border-color: #A09999;
        width: 6em
      }
      button.reject:hover{
        background: #A09999;
        border-color: #A09999;
      }
      @media only screen and (max-width: 1824px) {
        .button-table-container {
          font-size:.9em;
        }
      }
    `
  ]
})
export class TableButtonRendererComponent implements OnInit {
  @Input() button;
  @Input() col;
  @Input() row;

  constructor() {}

  ngOnInit() {
  }

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

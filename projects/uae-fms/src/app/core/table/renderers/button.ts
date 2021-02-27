import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'table-button-renderer',
  template: `
    <div class="button-table-container">
      <button
        class="btn-primary-large"
        *ngIf="getLable(col.field) != 'buttons.reject'"
        (click)="col.onClick(row)"
      >
        {{ getLable(col.field)|translate }}
      </button>
      <button
        class="btn-primary-large reject"
        *ngIf="getLable(col.field) == 'buttons.reject'"
      >
        {{ getLable(col.field)|translate }}
      </button>
    </div>
  `,
  styles: [
    `
      div button {
        padding: 1em 1.3em;
        height: auto;
        width: 7em;
      }
      button.reject {
        background: #a09999;
        border-color: #a09999;
        width: 6em;
      }
      button.reject:hover {
        background: #a09999;
        border-color: #a09999;
      }
      @media only screen and (max-width: 1824px) {
        .button-table-container {
          font-size: 0.9em;
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

  ngOnInit() {}

  getLable(field: string): string {
    switch (field) {
      case 'ButtonReject': {
        return 'buttons.reject';
      }
      case 'ButtonApprove': {
        return 'buttons.approve';
      }
      case 'ButtonRecived': {
        return 'buttons.recived';
      }
      case 'ButtonConfirm': {
        return 'buttons.confirm';
      }
      default: {
        return '';
      }
    }
  }
}

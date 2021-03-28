import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'table-status-renderer',
  template: `
    <span
      class="status"
      [style]="{ '--back-color-var': getStatusColor(status.Status) }"
      [ngStyle]="{ color: getStatusColor(status.Status) }"
      >{{ status.Status }}</span
    >
  `,
  styles: [
    `
      .status {
        position: relative;
      }
      .status::before {
        content: attr(data-content);
        position: absolute;
        width: 7px;
        left: -15px;
        top: 50%;
        transform: translateY(-50%);
        height: 7px;
        background-color: var(--back-color-var);
        border-radius: 50%;
      }
    `
  ]
})
export class TableStatusRendererComponent implements OnInit {
  @Input() status;

  constructor() {}

  ngOnInit() {}

  getStatusColor(status: string): string {
    switch (status) {
      case 'Available': {
        return '#838BCE';
      }
      case 'Pending': {
        return '#EA931C';
      }
      default: {
        return '#000000';
      }
    }
  }
}

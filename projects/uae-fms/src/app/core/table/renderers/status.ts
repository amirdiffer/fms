import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'table-status-renderer',
  template: `
    <span [ngStyle]="{ color: getStatusColor(status.Status) }">{{
      status.Status
    }}</span>
  `,
  styles: [``]
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
      default: {
        return '#000000';
      }
    }
  }
}

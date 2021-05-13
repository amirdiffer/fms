import { Component, Input, OnInit } from '@angular/core';
import { ColumnDifinition } from '@core/table';
import { RowSettings } from '@core/table/table.component';

@Component({
  selector: 'table-received-button-renderer',
  template: `
    <img class='pointer'
      (click)='clickButton(col.renderer)'
      src='assets/icons/received.png'
      alt=''
      width='42'
    />
  `,
  styles: [`
    .pointer {
      cursor: pointer;
    }
  `]
})
export class ReceivedButtonRendererComponent implements OnInit {
  @Input() data;
  @Input() col: ColumnDifinition;
  @Input() setting: RowSettings;

  ngOnInit(): void {
  }

  clickButton(button): void {
    this.setting.onClick(this.data, button);
  }
}

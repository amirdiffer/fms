import { Component, Input, OnInit } from '@angular/core';
import { ColumnDifinition } from '@core/table';
import { RowSettings } from '@core/table/table.component';

@Component({
  selector: 'table-approve-button-renderer',
  template: `
    <img
      (click)="clickButton((col?.renderer === 'approveButton') ? 'approve': 'reject')"
      [src]="
        col.renderer === 'approveButton'
          ? 'assets/icons/approve.png'
          : 'assets/icons/cross.png'
      "
      alt=""
      width="24"
    />
  `,
  styles: []
})
export class ApproveButtonRendererComponent implements OnInit {
  @Input() data;
  @Input() col: ColumnDifinition;
  @Input() setting: RowSettings;

  ngOnInit(): void {}

  clickButton(button): void {
    this.setting.onClick(this.col,this.data, button);
  }
}

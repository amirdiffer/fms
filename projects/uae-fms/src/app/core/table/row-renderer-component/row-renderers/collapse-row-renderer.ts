import { Component, Input, OnInit } from '@angular/core';
import { ColumnDifinition } from '@core/table';
import { RowSettings } from '@core/table/table.component';

@Component({
  selector: 'table-collapse-row-renderer',
  template: `
    Hi
  `,
  styles: []
})
export class CollapseRowRendererComponent implements OnInit {
  @Input() data;
  @Input() setting: RowSettings;

  ngOnInit(): void {}
}

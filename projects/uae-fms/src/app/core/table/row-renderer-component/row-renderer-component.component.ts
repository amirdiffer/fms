import { Component, Input, OnInit } from '@angular/core';
import { ColumnDifinition, RowSettings, TableSetting } from '../table.component';

@Component({
  selector: 'anms-row-renderer-component',
  templateUrl: './row-renderer-component.component.html'
})
export class RowRendererComponentComponent implements OnInit {
  @Input() setting:TableSetting;
  @Input() rowSetting:RowSettings;
  @Input() data:any;
  @Input() rowIndex: number;
  @Input() column: ColumnDifinition | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}

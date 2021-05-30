import { Component, Input, OnInit } from '@angular/core';
import { RowSettings, TableSetting } from '../table.component';

@Component({
  selector: 'anms-row-renderer-component',
  templateUrl: './row-renderer-component.component.html'
})
export class RowRendererComponentComponent implements OnInit {
  @Input() setting:TableSetting;
  @Input() rowSetting:RowSettings;
  @Input() data:any;

  constructor() { }

  ngOnInit(): void {
  }

}

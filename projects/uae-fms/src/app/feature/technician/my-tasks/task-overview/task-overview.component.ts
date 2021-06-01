import { Component, OnInit } from '@angular/core';
import { TableSetting } from '@core/table';

@Component({
  selector: 'anms-task-overview',
  templateUrl: './task-overview.component.html',
  styleUrls: ['./task-overview.component.scss']
})
export class TaskOverviewComponent implements OnInit {

  taskDetailsTable: TableSetting = {
    columns: [
    ],
    data: []
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}

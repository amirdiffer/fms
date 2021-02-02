import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ColumnDifinition, ColumnType, TableSetting } from '@core/table';

@Component({
  selector: 'anms-add-periodic-service',
  templateUrl: './add-periodic-service.component.html',
  styleUrls: ['./add-periodic-service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPeriodicServiceComponent implements OnInit {
  tableColumns: ColumnDifinition[] = [
    {
      lable: 'Periodic Service Name',
      field: 'periodicServiceName',
      type: ColumnType.lable
    },
    {
      lable:
        '<img src="../../../../../assets/icons/car-solid.svg" class="icon24px">',
      field: 'number',
      isIconLable: true,
      sortable: true,
      width: 100,
      type: ColumnType.lable
    }
  ];

  tableData = [
    {
      periodicServiceName: 'Basic Vehicle Maintenance',
      number: '21'
    },
    {
      periodicServiceName: 'Basic Vehicle Maintenance',
      number: '21'
    },
    {
      periodicServiceName: 'Basic Vehicle Maintenance',
      number: '21'
    }
  ];

  tableSetting: TableSetting = {
    columns: this.tableColumns,
    data: this.tableData
  };

  constructor() {}

  ngOnInit(): void {}
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ColumnDifinition, ColumnType, TableSetting } from '@core/table';
import { PeriodicServiceFacade } from '../+state/periodic-service';

@Component({
  selector: 'anms-periodic-service',
  templateUrl: './periodic-service.component.html',
  styleUrls: ['./periodic-service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeriodicServiceComponent implements OnInit {
  tableColumns: ColumnDifinition[] = [
    {
      lable: 'Periodic Service Name',
      field: 'periodicServiceName',
      width: 300,
      type: ColumnType.lable,
      thumbField: '',
      renderer: ''
    },
    {
      lable: 'car_icon',
      field: 'number',
      width: 100,
      type: ColumnType.lable,
      thumbField: '',
      renderer: ''
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

  constructor(private facade: PeriodicServiceFacade) {}

  ngOnInit(): void {
    this.facade.loadAll();
  }
}

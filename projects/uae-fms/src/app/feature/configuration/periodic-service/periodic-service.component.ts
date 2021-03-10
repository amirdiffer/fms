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
  downloadBtn = 'assets/icons/download-solid.svg';

  tableColumns: ColumnDifinition[] = [
    {
      lable: 'tables.column.periodic_service_name',
      field: 'periodicServiceName',
      width: 300,
      type: ColumnType.lable,
      thumbField: '',
      renderer: ''
    },
    {
      lable: 'tables.column.car_icon',
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
    this.facade.periodicService$.subscribe((x) => {
      console.log(x);
      if (x) {
        this.tableSetting.data = [];
        x.map((responseObject) => {
          const periodicService = {
            periodicServiceName: responseObject.name,
            number: responseObject.id
          };
          this.tableSetting.data.push(periodicService);
        });
      }
    });
  }
}

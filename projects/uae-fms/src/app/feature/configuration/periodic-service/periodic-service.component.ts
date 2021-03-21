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
      lable:
        '<img src="../../../../../assets/icons/car-solid.svg" class="icon24px">',
      field: 'number',
      isIconLable: true,
      sortable: true,
      width: 100,
      type: ColumnType.lable
    },
    {
      lable: '',
      field: 'floatButton',
      width: 0,
      type: ColumnType.lable,
      thumbField: '',
      renderer: 'floatButton'
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

  tableSetting = {
    columns: this.tableColumns,
    data: this.tableData,
    rowSettings: {
      floatButton: [
        {
          button: 'edit'
        }
      ]
    }
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

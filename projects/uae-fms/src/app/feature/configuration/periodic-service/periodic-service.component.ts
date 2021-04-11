import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { ColumnDifinition, ColumnType, TableComponent } from '@core/table';
import { map } from 'rxjs/operators';
import { PeriodicServiceFacade } from '../+state/periodic-service';

@Component({
  selector: 'anms-periodic-service',
  templateUrl: './periodic-service.component.html',
  styleUrls: ['./periodic-service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeriodicServiceComponent implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;
  downloadBtn = 'assets/icons/download-solid.svg';

  //#region Table
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
      lable: '<img src="assets/icons/car-solid.svg" class="icon24px">',
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

  tableSetting = {
    columns: this.tableColumns,
    data: []
    // rowSettings: {
    //   floatButton: [
    //     {
    //       button: 'edit',
    //       onClick: (col, data, button?) => {
    //         this.router
    //           .navigate(
    //             ['/configuration/periodic-service/edit-periodic-service'],
    //             { queryParams: { id: data.id } }
    //           )
    //           .then();
    //       }
    //     }
    //   ]
    // }
  };

  periodicServices$ = this.facade.periodicService$.pipe(
    map((x) =>
      x.map((responseObject) => ({
        id: responseObject.id,
        periodicServiceName: responseObject.name,
        number: responseObject.id
      }))
    )
  );
  //#endregion

  constructor(private facade: PeriodicServiceFacade, private router: Router) {}

  ngOnInit(): void {
    this.facade.loadAll();
  }

  exportTable() {
    this.table.exportTable(this.tableSetting, 'Accessories');
  }

  eventPagination() {
    this.facade.loadAll();
  }
}

import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnDifinition, ColumnType, TableComponent } from '@core/table';
import { map } from 'rxjs/operators';
import { PeriodicServiceFacade } from '../+state/periodic-service';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';

@Component({
  selector: 'anms-periodic-service',
  templateUrl: './periodic-service.component.html',
  styleUrls: ['./periodic-service.component.scss']
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
      field: 'numOfUsage',
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
    data: [],
    rowSettings: {
      floatButton: [
        {
          button: 'edit',
          onClick: (col, data, button?) => {
            if (data.numOfUsage > 0) {
              this.displayCancelModal = true;
              return;
            }
            this.router
              .navigate([
                '/configuration/periodic-service/edit-periodic-service/' +
                  data.id
              ])
              .then();
          }
        }
      ]
    }
  };

  periodicServices$ = this.facade.periodicService$.pipe(
    map((x) =>
      x.map((responseObject) => ({
        id: responseObject.id,
        periodicServiceName: responseObject.name,
        numOfUsage: responseObject.numOfUsage
      }))
    )
  );
  //#endregion

  //#region Variables
  dialogCancelSetting: IDialogAlert = {
    header: 'Edit Periodic Service',
    hasError: true,
    isWarning: false,
    message:
      'The selected periodic service is being used by another asset so it is not editable',
    confirmButton: 'Ok',
    cancelButton: undefined
  };

  displayCancelModal = false;

  //#endregion

  constructor(private facade: PeriodicServiceFacade, private router: Router) {}

  ngOnInit(): void {
    this.facade.loadAll();
  }

  dialogConfirm(event) {
    this.displayCancelModal = false;
  }

  exportTable() {
    let filter = {
      periodicServiceName: 'periodicServiceName'
    };
    this.table.exportTable(this.tableSetting, 'Accessories', filter);
  }

  eventPagination() {
    this.facade.loadAll();
  }
}

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild
} from '@angular/core';
import { TableSetting } from '@core/table';
import { ButtonType, TableComponent } from '@core/table/table.component';
import { map } from 'rxjs/operators';
import { OrganizationFacade } from '../+state/organization';

@Component({
  selector: 'anms-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationComponent implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  downloadBtn = 'assets/icons/download-solid.svg';

  //#region Table
  organization_Table: TableSetting = {
    columns: [
      {
        lable: 'tables.column.organization',
        type: 1,
        field: 'Organization'
      },
      {
        lable: 'tables.column.section',
        sortable: true,
        type: 1,
        field: 'Section'
      },
      {
        lable: 'tables.column.location',
        sortable: true,
        type: 1,
        field: 'Location'
      },
      {
        lable: 'tables.column.tf_payed',
        sortable: true,
        type: 1,
        field: 'TF_Payed'
      },
      {
        lable: 'tables.column.tf_unpaid',
        sortable: true,
        type: 1,
        field: 'TF_Unpaid'
      },
      {
        lable: '<img src="assets/icons/operator.svg">',
        type: 1,
        sortable: true,
        isIconLable: true,
        field: 'user',
        width: 100
      },
      {
        lable: '<img src="assets/icons/car-solid.svg">',
        type: 1,
        isIconLable: true,
        field: 'car',
        width: 100,
        sortable: true
      }
      // {
      //   lable: '',
      //   type: 3,
      //   width: 70,
      //   field: 'addButton',
      //   renderer: 'button',
      //   buttonType: ButtonType.add
      // },
      // {
      //   lable: '',
      //   width: 70,
      //   type: 3,
      //   field: 'actionButton',
      //   renderer: 'button',
      //   buttonType: ButtonType.action
      // }
    ],
    data: []
  };

  data$ = this.facade.organization$.pipe(
    map((x) => {
      return x.map((y) => {
        return {
          ...y,
          Organization: y.organizationName,
          Section: y.numOfDepartments,
          Location: y.numOfLocations,
          car: y.numOfAssets,
          user: y.numOfUsers,
          TF_Unpaid: y.tfUnpaid,
          TF_Payed: y.tfPaid
        };
      });
    })
  );
  //#endregion

  constructor(private facade: OrganizationFacade) {}

  ngOnInit(): void {
    this.facade.loadAll();
  }

  exportTable() {
    this.table.exportTable(this.organization_Table, 'Department');
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ColumnType, TableSetting } from '@core/table';
import { Subscription } from 'rxjs';
import { IntegrationService } from './integration.service';
import { IntegrationFacade } from '../integration/+state';

@Component({
  selector: 'anms-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss']
})
export class IntegrationComponent implements OnInit, OnDestroy {
  tableData = new Array<any>();
  tableSettings: TableSetting = {
    columns: [
      {
        lable: 'tables.column.integration_name',
        field: 'name',
        type: ColumnType.labelWithThumb,
        thumbField: 'thumb'
      },
      { lable: 'tables.column.type', field: 'type', width: 70 },
      { lable: 'tables.column.gpr', field: 'grp' },
      { lable: 'tables.column.status', field: 'isConnected', width: 110 },
      { lable: 'tables.column.email', field: 'email' },
      { lable: 'tables.column.phone_number', field: 'phoneNumber' },
      { lable: 'tables.column.company_name', field: 'companyName' },
      { lable: 'tables.column.support_operator', field: 'supportOperator' }
    ],
    data: []
  };

  downloadBtn = 'assets/icons/download-solid.svg';
  addtype;
  addtype$: Subscription;

  constructor(
    private _integrationService: IntegrationService,
    private facade: IntegrationFacade
  ) {}

  ngOnInit(): void {
    this.facade.loadAll();
    this.facade.integration$.subscribe((x) => {
      this.tableSettings.data = x.map((item) => {
        return {
          name: item.name,
          type: item.type,
          companyName: item.companyName,
          grp: item.grp,
          isConnected: item.isConnected,
          email: item.email,
          phoneNumber: item.phoneNumber,
          supportOperator:
            item.supportOperator.firstName + ' ' + item.supportOperator.lastName
        };
      });
    });

    this.addtype$ = this._integrationService
      .getIntegrationForm()
      .subscribe((open) => {
        this.addtype = open;
      });
  }
  public add() {
    this._integrationService.loadInegrationForm(true);
  }

  ngOnDestroy() {
    this.addtype$.unsubscribe();
  }
}

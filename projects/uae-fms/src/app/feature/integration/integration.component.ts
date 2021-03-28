import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { ColumnType, TableSetting } from '@core/table';
import { Subscription } from 'rxjs';
import { IntegrationService } from './integration.service';
import { IntegrationFacade } from '../integration/+state';

@Component({
  selector: 'anms-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntegrationComponent implements OnInit, OnDestroy {
  tableData = new Array<any>();
  tableSettings: TableSetting;
  tableColumn = [
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
  ];
  fakeTableData = [
    {
      id: 1,
      integrationName: 'Wex',
      thumb: 'wex-logo.png',
      type: 'Fuel',
      gpr: 'ABC-12345678',
      status: 'Connect',
      email: 'Sample@sample.com',
      phoneNumber: '0505653793',
      companyName: 'Wex',
      supportOpperator: 'Sam Smith'
    },
    {
      id: 2,
      integrationName: 'Wex',
      thumb: 'wex-logo.png',
      type: 'Fuel',
      gpr: 'ABC-12345678',
      status: 'Connect',
      email: 'Sample@sample.com',
      phoneNumber: '0505653793',
      companyName: 'Wex',
      supportOpperator: 'Sam Smith'
    },
    {
      id: 3,
      integrationName: 'Wex',
      thumb: 'wex-logo.png',
      type: 'Fuel',
      gpr: 'ABC-12345678',
      status: 'Connect',
      email: 'Sample@sample.com',
      phoneNumber: '0505653793',
      companyName: 'Wex',
      supportOpperator: 'Sam Smith'
    },
    {
      id: 4,
      integrationName: 'Wex',
      thumb: 'wex-logo.png',
      type: 'Fuel',
      gpr: 'ABC-12345678',
      status: 'Connect',
      email: 'Sample@sample.com',
      phoneNumber: '0505653793',
      companyName: 'Wex',
      supportOpperator: 'Sam Smith'
    },
    {
      id: 5,
      integrationName: 'Wex',
      thumb: 'wex-logo.png',
      type: 'Fuel',
      gpr: 'ABC-12345678',
      status: 'Connect',
      email: 'Sample@sample.com',
      phoneNumber: '0505653793',
      companyName: 'Wex',
      supportOpperator: 'Sam Smith'
    },
    {
      id: 6,
      integrationName: 'Wex',
      thumb: 'wex-logo.png',
      type: 'Fuel',
      gpr: 'ABC-12345678',
      status: 'Connect',
      email: 'Sample@sample.com',
      phoneNumber: '0505653793',
      companyName: 'Wex',
      supportOpperator: 'Sam Smith'
    },
    {
      id: 7,
      integrationName: 'Wex',
      thumb: 'wex-logo.png',
      type: 'Fuel',
      gpr: 'ABC-12345678',
      status: 'Connect',
      email: 'Sample@sample.com',
      phoneNumber: '0505653793',
      companyName: 'Wex',
      supportOpperator: 'Sam Smith'
    },
    {
      id: 8,
      integrationName: 'Wex',
      thumb: 'wex-logo.png',
      type: 'Fuel',
      gpr: 'ABC-12345678',
      status: 'Connect',
      email: 'Sample@sample.com',
      phoneNumber: '0505653793',
      companyName: 'Wex',
      supportOpperator: 'Sam Smith'
    }
  ];
  downloadBtn = 'assets/icons/download-solid.svg';
  addtype;
  addtype$: Subscription;

  constructor(
    private _integrationService: IntegrationService,
    private facade: IntegrationFacade
  ) {}

  ngOnInit(): void {
    console.log(this.tableSettings);
    this.facade.loadAll();
    this.facade.integration$.subscribe((x) => {
      console.log(x);
      this.tableData = x.map((item) => {
        console.log(item);
        console.log(this.tableData);
        return {
          name: item.name,
          type: item.type,
          companyName: item.companyName,
          grp: item.grp,
          isConnected: item.isConnected,
          email: item.email,
          phoneNumber: item.phoneNumber,
          supportOperator:
            item.supportOperator.firstName + item.supportOperator.lastName
        };
      });
      this.tableSettings = this.tableRendering(
        this.tableColumn,
        this.tableData
      );
    });
    this.tableSettings = {
      columns: [
        {
          lable: 'tables.column.integration_name',
          field: 'integrationName',
          type: ColumnType.labelWithThumb,
          thumbField: 'thumb'
        },
        { lable: 'tables.column.type', field: 'type', width: 90 },
        { lable: 'tables.column.gpr', field: 'gpr' },
        {
          lable: 'tables.column.status',
          field: 'status',
          width: 110,
          renderer: 'colorize',
          rendererOptions: {
            color: '#0da06e',
            condition: (data: string) => {
              if (data.toLowerCase() == 'connect') return true;
              else false;
            }
          }
        },
        { lable: 'tables.column.email', field: 'email' },
        { lable: 'tables.column.phone_number', field: 'phoneNumber' },
        { lable: 'tables.column.company_name', field: 'companyName' },
        { lable: 'tables.column.support_operator', field: 'supportOpperator' }
      ],
      data: [
        {
          id: 1,
          integrationName: 'Wex',
          thumb: 'wex-logo.png',
          type: 'Fuel',
          gpr: 'ABC-12345678',
          status: 'Connect',
          email: 'Sample@sample.com',
          phoneNumber: '0505653793',
          companyName: 'Wex',
          supportOpperator: 'Sam Smith'
        },
        {
          id: 2,
          integrationName: 'Wex',
          thumb: 'wex-logo.png',
          type: 'Fuel',
          gpr: 'ABC-12345678',
          status: 'Connect',
          email: 'Sample@sample.com',
          phoneNumber: '0505653793',
          companyName: 'Wex',
          supportOpperator: 'Sam Smith'
        },
        {
          id: 3,
          integrationName: 'Wex',
          thumb: 'wex-logo.png',
          type: 'Fuel',
          gpr: 'ABC-12345678',
          status: 'Connect',
          email: 'Sample@sample.com',
          phoneNumber: '0505653793',
          companyName: 'Wex',
          supportOpperator: 'Sam Smith'
        },
        {
          id: 4,
          integrationName: 'Wex',
          thumb: 'wex-logo.png',
          type: 'Fuel',
          gpr: 'ABC-12345678',
          status: 'Connect',
          email: 'Sample@sample.com',
          phoneNumber: '0505653793',
          companyName: 'Wex',
          supportOpperator: 'Sam Smith'
        },
        {
          id: 5,
          integrationName: 'Wex',
          thumb: 'wex-logo.png',
          type: 'Fuel',
          gpr: 'ABC-12345678',
          status: 'Connect',
          email: 'Sample@sample.com',
          phoneNumber: '0505653793',
          companyName: 'Wex',
          supportOpperator: 'Sam Smith'
        },
        {
          id: 6,
          integrationName: 'Wex',
          thumb: 'wex-logo.png',
          type: 'Fuel',
          gpr: 'ABC-12345678',
          status: 'Connect',
          email: 'Sample@sample.com',
          phoneNumber: '0505653793',
          companyName: 'Wex',
          supportOpperator: 'Sam Smith'
        },
        {
          id: 7,
          integrationName: 'Wex',
          thumb: 'wex-logo.png',
          type: 'Fuel',
          gpr: 'ABC-12345678',
          status: 'Connect',
          email: 'Sample@sample.com',
          phoneNumber: '0505653793',
          companyName: 'Wex',
          supportOpperator: 'Sam Smith'
        },
        {
          id: 8,
          integrationName: 'Wex',
          thumb: 'wex-logo.png',
          type: 'Fuel',
          gpr: 'ABC-12345678',
          status: 'Connect',
          email: 'Sample@sample.com',
          phoneNumber: '0505653793',
          companyName: 'Wex',
          supportOpperator: 'Sam Smith'
        }
      ]
    };

    this.addtype$ = this._integrationService
      .getIntegrationForm()
      .subscribe((open) => {
        this.addtype = open;
      });
  }
  public add() {
    this._integrationService.loadInegrationForm(true);
    console.log('Click');
  }
  public tableRendering(tableColumn, dataItem): TableSetting {
    const table = {
      columns: tableColumn,
      data: dataItem
    };
    console.log(table);
    return table;
  }
  ngOnDestroy() {
    this.addtype$.unsubscribe();
  }
}

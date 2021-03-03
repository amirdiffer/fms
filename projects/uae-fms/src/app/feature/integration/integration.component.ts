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
  tableSettings: TableSetting;
  downloadBtn= 'assets/icons/download-solid.svg';
  addtype ;
  addtype$: Subscription;
  constructor(
    private _integrationService: IntegrationService,
    private facade: IntegrationFacade
  ) {}

  ngOnInit(): void {
    this.facade.loadAll();
    this.tableSettings = {
      columns: [
        {
          lable: 'Integration Name',
          field: 'integrationName',
          type: ColumnType.labelWithThumb,
          thumbField: 'thumb'
        },
        { lable: 'Type', field: 'type', width: 70 },
        { lable: 'GPR', field: 'gpr' },
        { lable: 'Status', field: 'status', width: 110 },
        { lable: 'Email', field: 'email' },
        { lable: 'Phone Number', field: 'phoneNumber' },
        { lable: 'Company Name', field: 'companyName' },
        { lable: 'Support Operator', field: 'supportOpperator' }
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
    console.log('Click')
  }
  ngOnDestroy() {
    this.addtype$.unsubscribe();
  }
}

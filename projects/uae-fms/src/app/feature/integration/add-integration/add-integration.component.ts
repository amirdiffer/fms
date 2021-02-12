import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ColumnType, TableSetting } from '@core/table';

@Component({
  selector: 'anms-add-integration',
  templateUrl: './add-integration.component.html',
  styleUrls: ['./add-integration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddIntegrationComponent implements OnInit {
  typeOptions = [
    { name: 'Type 1', value: 'Type1' },
    { name: 'Type 2', value: 'Type2' },
    { name: 'Type 3', value: 'Type3' },
    { name: 'Type 4', value: 'Type4' },
    { name: 'Type 5', value: 'Type5' }
  ];

  tableSettings: TableSetting;

  constructor() {}

  ngOnInit(): void {
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
  }
}

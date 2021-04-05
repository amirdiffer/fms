import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ColumnType } from '@core/table';

@Component({
  selector: 'app-asset-overview-request',
  templateUrl: './request-tab-overview.component.html',
  styleUrls: ['./request-tab-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestTabOverviewComponent implements OnInit {
  constructor() {}

  vehicle = {
    id: 1,
    make: 'bmw.png',
    vehicle: 'Request No 123456',
    thumb: 'thumb1.png',
    type: 'bmw',
    model: 'I3',
    plateno: '1234',
    iserve: '04',
    status: '1',
    location: 'Al Ghandi Ato Service Ras A Khor',
    bodyType: 'Text Type',
    color: 'Text Type',
    trim: 'Text Type',
    group: 'Text Type',
    department: 'Dep Name-Area-Dubai',
    licensePlate: '123456',
    operator: 'User Name',
    salik: 'Assign',
    warranty: 'Under Warranty',
    vin_sn: 'JTDKBRFU9J30593O7',
    year: '2020'
  };

  filterSetting = [
    {
      filterTitle: 'statistic.total',
      filterSupTitle: 'statistic.issue',
      filterCount: '13',
      filterTagColor: '#6EBFB5'
    },
    {
      filterTitle: 'statistic.todo',
      filterSupTitle: 'statistic.issue',
      filterCount: '08',
      filterTagColor: '#6870B4'
    },
    {
      filterTitle: 'statistic.doing',
      filterSupTitle: 'statistic.issue',
      filterCount: '02',
      filterTagColor: '#BA7967'
    },
    {
      filterTitle: 'statistic.done',
      filterSupTitle: 'statistic.issue',
      filterCount: '09',
      filterTagColor: '#DD5648'
    }
  ];

  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';
  activeLayout = 'menu';

  jobCard_Table3 = {
    columns: [
      {
        lable: 'tables.column.issue',
        field: 'issue',
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'checkboxRenderer'
      },
      {
        lable: 'tables.column.date',
        field: 'date',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.description',
        field: 'description',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.issue_type',
        field: 'issue_type',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.reported_by',
        field: 'reported_by',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.attachment',
        field: 'attachment',
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'downloadButtonRenderer',
        sortable: true
      }
    ],
    data: [
      {
        issue: { checkbox: false, label: 'Oil Leaking' },
        date: '02-02-2020',
        description: 'Description is here, description is here',
        issue_type: 'Repair',
        reported_by: 'Atefeh',
        attachment: 'Download'
      },
      {
        issue: { checkbox: false, label: 'Oil Leaking' },
        date: '02-02-2020',
        description: 'Description is here, description is here',
        issue_type: 'Repair',
        reported_by: 'Atefeh',
        attachment: 'Download'
      },
      {
        issue: { checkbox: true, label: 'Oil Leaking' },
        date: '02-02-2020',
        description: 'Description is here, description is here',
        issue_type: 'Repair',
        reported_by: 'Atefeh',
        attachment: 'Download'
      },
      {
        issue: { checkbox: false, label: 'Oil Leaking' },
        date: '02-02-2020',
        description: 'Description is here, description is here',
        issue_type: 'Repair',
        reported_by: 'Atefeh',
        attachment: 'Download'
      },
      {
        issue: { checkbox: true, label: 'Oil Leaking' },
        date: '02-02-2020',
        description: 'Description is here, description is here',
        issue_type: 'Repair',
        reported_by: 'Atefeh',
        attachment: 'Download'
      },
      {
        issue: { checkbox: false, label: 'Oil Leaking' },
        date: '02-02-2020',
        description: 'Description is here, description is here',
        issue_type: 'Repair',
        reported_by: 'Atefeh',
        attachment: 'Download'
      }
    ],
    rowSettings: {
      floatButton: []
    }
  };

  section = 'list';

  ngOnInit(): void {}
}

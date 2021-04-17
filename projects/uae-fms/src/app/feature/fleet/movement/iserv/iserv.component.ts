import { Component, OnInit } from '@angular/core';
import { FilterCardSetting } from '@core/filter';
import { ColumnType, TableSetting } from '@core/table';
import * as L from 'leaflet';
import { Router } from '@angular/router';

@Component({
  selector: 'anms-iserv',
  templateUrl: './iserv.component.html',
  styleUrls: ['./iserv.component.scss']
})
export class IserveComponent implements OnInit {
  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';
  selectedTab = '1';

  filterSetting1: FilterCardSetting[] = [
    {
      filterTitle: 'statistic.total',
      filterCount: '2456',
      filterTagColor: '#7C67A5',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.active',
      filterCount: '07',
      filterTagColor: '#00CBB2',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.pending',
      filterCount: '05',
      filterTagColor: '#709775',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.complete',
      filterCount: '12',
      filterTagColor: '#648DE5',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.cancel',
      filterCount: '12',
      filterTagColor: '#F75A4A',
      onActive(index: number) {}
    }
  ];
  filterSetting2: FilterCardSetting[] = [
    {
      filterTitle: 'statistic.total',
      filterCount: '36',
      filterTagColor: '#7C67A5',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.available',
      filterCount: '07',
      filterTagColor: '#00CBB2',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.unavailable',
      filterCount: '05',
      filterTagColor: '#709775',
      onActive(index: number) {}
    }
  ];

  operator_Table: TableSetting = {
    columns: [
      {
        lable: 'tables.column.operator',
        type: 1,
        field: 'Operator',
        width: 150,
        renderer: 'userRenderer',
        thumbField: 'profilePicture'
      },
      {
        lable: 'tables.column.asset',
        type: 1,
        field: 'asset',
        width: 180,
        renderer: 'assetsRenderer',
        thumbField: ''
      },
      {
        lable: 'tables.column.organization',
        type: 1,
        field: 'Organization',
        width: 150,
        renderer: 'doubleLineRenderer'
      },
      {
        lable: 'tables.column.information',
        type: 1,
        field: 'Information',
        width: 150,
        renderer: 'doubleLineRenderer'
      },
      { lable: 'tables.column.type', type: 1, field: 'Type', width: 100 },
      { lable: 'tables.column.status', type: 1, field: 'Status', width: 100 },
      {
        lable: 'tables.column.tf_paid',
        type: 1,
        field: 'TF_PAid',
        width: 100,
        sortable: true
      },
      {
        lable: 'tables.column.tf_unpaid',
        type: 1,
        field: 'TF_Unpaid',
        width: 100,
        sortable: true
      },
      {
        lable: '',
        field: 'floatButton',
        width: 0,
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'floatButton'
      }
    ],
    data: [
      {
        picture: 'user-image.png',
        firstName: 'Sam',
        lastName: 'Smith',
        id: '1234567899',
        asset: {
          img: 'thumb1.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          ownership: 'Owned'
        },
        Organization: { line1: 'Department Name', line2: 'Section Name' },
        Information: { line1: 'sample@gmail.com', line2: '+97150569899' },
        Type: 'Iserve',
        Status: 'Active',
        Asset: '',
        TF_PAid: '14',
        TF_Unpaid: '0',
        statusColor: '#81B29A'
      },
      {
        picture: 'user-image.png',
        firstName: 'Sam',
        lastName: 'Smith',
        id: '1234567899',
        asset: {
          img: 'thumb1.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          ownership: 'Owned'
        },
        Organization: { line1: 'Department Name', line2: 'Section Name' },
        Information: { line1: 'sample@gmail.com', line2: '+97150569899' },
        Type: 'Iserve',
        Status: 'Active',
        Asset: '',
        TF_PAid: '14',
        TF_Unpaid: '0',
        statusColor: '#81B29A'
      },
      {
        picture: 'user-image.png',
        firstName: 'Sam',
        lastName: 'Smith',
        id: '1234567899',
        asset: {
          img: 'thumb1.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          ownership: 'Owned'
        },
        Organization: { line1: 'Department Name', line2: 'Section Name' },
        Information: { line1: 'sample@gmail.com', line2: '+97150569899' },
        Type: 'Iserve',
        Status: 'Active',
        Asset: '',
        TF_PAid: '14',
        TF_Unpaid: '0',
        statusColor: '#81B29A'
      },
      {
        picture: 'user-image.png',
        firstName: 'Sam',
        lastName: 'Smith',
        id: '1234567899',
        asset: {
          img: 'thumb1.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          ownership: 'Owned'
        },
        Organization: { line1: 'Department Name', line2: 'Section Name' },
        Information: { line1: 'sample@gmail.com', line2: '+97150569899' },
        Type: 'Iserve',
        Status: 'Active',
        Asset: '',
        TF_PAid: '14',
        TF_Unpaid: '0',
        statusColor: '#81B29A'
      },
      {
        picture: 'user-image.png',
        firstName: 'Sam',
        lastName: 'Smith',
        id: '1234567899',
        asset: {
          img: 'thumb1.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          ownership: 'Owned'
        },
        Organization: { line1: 'Department Name', line2: 'Section Name' },
        Information: { line1: 'sample@gmail.com', line2: '+97150569899' },
        Type: 'Iserve',
        Status: 'Active',
        Asset: '',
        TF_PAid: '14',
        TF_Unpaid: '0',
        statusColor: '#81B29A'
      },
      {
        picture: 'user-image.png',
        firstName: 'Sam',
        lastName: 'Smith',
        id: '1234567899',
        asset: {
          img: 'thumb1.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          ownership: 'Owned'
        },
        Organization: { line1: 'Department Name', line2: 'Section Name' },
        Information: { line1: 'sample@gmail.com', line2: '+97150569899' },
        Type: 'Iserve',
        Status: 'Active',
        Asset: '',
        TF_PAid: '14',
        TF_Unpaid: '0',
        statusColor: '#81B29A'
      }
    ],
    rowSettings: {
      onClick: (col, data) => {
        // console.log(col, data);
      },
      floatButton: [
        {
          button: 'edit'
        }
      ]
    }
  };
  movementOverView_Table: TableSetting = {
    columns: [
      {
        lable: 'tables.column.asset',
        field: 'asset',
        width: 140,
        type: 1,
        thumbField: '',
        renderer: 'assetsRenderer'
      },
      {
        lable: 'tables.column.duration',
        field: 'duration',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: '',
        sortable: true
      },
      {
        lable: 'tables.column.date',
        field: 'date',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: 'subtextRenderer'
      },
      {
        lable: 'tables.column.status',
        field: 'Status',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: 'statusRenderer'
      },
      {
        lable: 'tables.column.department',
        field: 'department',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.operator',
        field: 'operator',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: 'subtextRenderer'
      },
      {
        lable: 'tables.column.from',
        field: 'from',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: 'subtextRenderer'
      },
      {
        lable: 'tables.column.to',
        field: 'to',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: 'subtextRenderer'
      },
      {
        lable: 'tables.column.fine',
        field: 'fine',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: '',
        sortable: true
      }
    ],
    data: [
      {
        asset: {
          img: 'thumb1.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          ownership: 'Owned'
        },
        duration: '4 Days',
        date: {
          day: 'Saturday',
          date: ' 02/02 12:30'
        },
        Status: 'Pending',
        department: 'Department Name',
        operator: {
          name: 'Sam Smith',
          subName: '123456'
        },
        from: {
          region: 'AI Ghandi Ato Service Ras',
          time: '12:30'
        },
        to: {
          region: 'AI Ghandi Ato Service Ras',
          time: '12:30'
        },
        fine: 3
      }
    ]
  };
  assets_Table: TableSetting = {
    columns: [
      {
        lable: 'tables.column.asset',
        field: 'asset',
        width: '18em',
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'assetsRenderer'
      },
      {
        lable: 'tables.column.make',
        field: 'make',
        width: 100,
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.plate_no',
        field: 'plate_no',
        width: 130,
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.damage',
        field: 'damage',
        width: 100,
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.traffic_fine',
        field: 'traffic_fine',
        width: 100,
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.operator',
        type: 1,
        field: 'Operator',
        width: 150,
        renderer: 'userRenderer',
        thumbField: 'picture'
      },
      {
        lable: 'tables.column.status',
        field: 'Status',
        width: 100,
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.location',
        field: 'location',
        width: 100,
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: '',
        field: 'floatButton',
        width: 0,
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'floatButton'
      }
    ],
    data: [
      {
        asset: {
          img: 'thumb1.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          ownership: 'Owned'
        },
        make: 'BMW',
        plate_no: '4567890',
        damage: '03',
        traffic_fine: '44',
        picture: 'user-image.png',
        id: '1234567890',
        firstName: 'Sam',
        lastName: 'Smith',
        Status: 'Available',
        location: 'Al Ghandi Ato Serivce A Khor'
      }
    ],
    rowSettings: {
      onClick: (col, data) => {
        // console.log(col, data);
      },
      floatButton: [
        {
          button: 'edit'
        },
        {
          button: 'download'
        },
        {
          button: 'external',
          onClick: (col, data) => {
            this.router.navigate(['/fleet/assets/' + data.id]).then();
          }
        }
      ]
    }
  };

  map_view;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  initMap = false;
  initialTable(): void {
    if (!this.initMap && this.selectedTab == '1') {
      setTimeout(() => {
        this.map_view = L.map('map', {
          center: [23.424, 53.847],
          zoom: 13
        });
        this.map_view.setView([23.424, 53.847], 6);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}).addTo(
          this.map_view
        );
      }, 1000);
    }
  }
}

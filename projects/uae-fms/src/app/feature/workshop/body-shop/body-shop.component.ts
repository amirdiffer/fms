import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FilterCardSetting } from '@core/filter';
import { TableSetting, ColumnType } from '@core/table';
import {
  BodyShopJobCardFacade,
  BodyShopLocationFacade,
  BodyShopRequestFacade,
  BodyShopTechnicianFacade
} from '../+state/body-shop';
import { Event, Router } from '@angular/router';
import { ButtonType } from '@core/table/table.component';
@Component({
  templateUrl: './body-shop.component.html',
  styleUrls: ['./body-shop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BodyShopComponent implements OnInit {
  downloadBtn = 'assets/icons/download-solid.svg';
  filterSetting: FilterCardSetting[] = [
    {
      filterCount: '',
      filterTagColor: '',
      filterTitle: 'statistic.calendar',
      isCalendar: true,
      onActive: () => {}
    },
    {
      filterCount: '13',
      filterTagColor: '#6EBFB5',
      filterTitle: 'statistic.total',
      filterSupTitle: 'statistic.insurance_claim',
      onActive: () => {}
    },
    {
      filterCount: '8',
      filterTagColor: '#6870B4',
      filterTitle: 'statistic.approved',
      filterSupTitle: 'statistic.insurance_claim',
      onActive: () => {}
    },
    {
      filterCount: '13',
      filterTagColor: '#BA7967',
      filterTitle: 'statistic.waiting_for_approval',
      filterSupTitle: 'statistic.insurance_claim',
      onActive: () => {}
    },
    {
      filterCount: '13',
      filterTagColor: '#DD5648',
      filterTitle: 'statistic.rejected',
      filterSupTitle: 'statistic.insurance_claim',
      onActive: () => {}
    }
  ];

  jobCardTabFilterSetting: FilterCardSetting[] = [
    {
      filterCount: '',
      filterTagColor: '',
      filterTitle: 'statistic.this_month',
      isCalendar: true,
      onActive: () => {}
    },
    {
      filterCount: '13',
      filterTagColor: '#6EBFB5',
      filterTitle: 'statistic.total',
      filterSupTitle: 'statistic.job_card',
      onActive: () => {}
    },
    {
      filterCount: '8',
      filterTagColor: '#6870B4',
      filterTitle: 'statistic.approved',
      filterSupTitle: 'statistic.workshop_manager',
      onActive: () => {}
    },
    {
      filterCount: '13',
      filterTagColor: '#BA7967',
      filterTitle: 'statistic.waiting_for_approval',
      filterSupTitle: 'statistic.workshop_manager',
      onActive: () => {}
    },
    {
      filterCount: '13',
      filterTagColor: '#DD5648',
      filterTitle: 'statistic.rejected',
      filterSupTitle: 'statistic.workshop_manager',
      onActive: () => {}
    }
  ];

  technicianTabFilterSetting: FilterCardSetting[] = [
    {
      filterCount: '',
      filterTagColor: '',
      filterTitle: 'statistic.this_month',
      isCalendar: true,
      onActive: () => {}
    },
    {
      filterCount: '13',
      filterTagColor: '#6EBFB5',
      filterTitle: 'statistic.total',
      filterSupTitle: 'statistic.technician',
      onActive: () => {}
    },
    {
      filterCount: '8',
      filterTagColor: '#6870B4',
      filterTitle: 'statistic.available',
      filterSupTitle: 'statistic.technician',
      onActive: () => {}
    },
    {
      filterCount: '13',
      filterTagColor: '#BA7967',
      filterTitle: 'statistic.unavailable',
      filterSupTitle: 'statistic.technician',
      onActive: () => {}
    }
  ];

  table1Setting: TableSetting = {
    columns: [
      {
        lable: 'tables.column.item',
        field: 'item',
        width: 190,
        renderer: 'vehicleRenderer'
      },
      {
        lable: 'tables.column.issue',
        field: 'issue',
        type: ColumnType.lable,
        width: 70
      },
      {
        lable: 'tables.column.source',
        field: 'source',
        type: ColumnType.lable,
        width: 120
      },
      {
        lable: 'tables.column.reference_no',
        field: 'refrenceNo',
        width: 100,
        type: ColumnType.lable
      },
      {
        lable: 'tables.column.job_type',
        field: 'jobType',
        type: ColumnType.lable,
        width: 100
      },
      {
        lable: 'tables.column.date',
        field: 'date',
        width: 100,
        type: ColumnType.lable,
        sortable: true
      },
      {
        lable: '',
        field: 'floatButton',
        width: 0,
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'floatButton',
        hasJobCardButton: true
      },
      {
        lable: 'tables.column.accident',
        field: 'accident',
        type: ColumnType.lable,
        width: 100
      },
      {
        lable: 'tables.column.action',
        field: '',
        type: ColumnType.lable,
        width: 120,
        renderer: 'button',
        buttonType: ButtonType.jobCard
      }
    ],
    data: [
      {
        id: 1,
        statusColor: '#838BCE',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png',
          flag: true
        },
        issue: 'Dent',
        source: 'Reception',
        refrenceNo: '2200100224',
        jobType: 'Repair',
        date: '02/02/2020',
        accident: 'Miner',
        action: ''
      },
      {
        id: 2,
        statusColor: '#838BCE',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png',
          flag: true
        },
        issue: 'Dent',
        source: 'Reception',
        refrenceNo: '2200100224',
        jobType: 'Repair',
        date: '02/02/2020',
        accident: 'Miner',
        action: ''
      },
      {
        id: 3,
        statusColor: '#838BCE',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png',
          flag: true
        },
        issue: 'Dent',
        source: 'Reception',
        refrenceNo: '2200100224',
        jobType: 'Repair',
        date: '02/02/2020',
        accident: 'Miner',
        action: ''
      },
      {
        id: 4,
        statusColor: '#838BCE',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png',
          flag: true
        },
        issue: 'Dent',
        source: 'Reception',
        refrenceNo: '2200100224',
        jobType: 'Repair',
        date: '02/02/2020',
        accident: 'Miner',
        action: ''
      },
      {
        id: 5,
        statusColor: '#838BCE',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png',
          flag: true
        },
        issue: 'Dent',
        source: 'Reception',
        refrenceNo: '2200100224',
        jobType: 'Repair',
        date: '02/02/2020',
        accident: 'Miner',
        action: ''
      },
      {
        id: 6,
        statusColor: '#838BCE',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png',
          flag: true
        },
        issue: 'Dent',
        source: 'Reception',
        refrenceNo: '2200100224',
        jobType: 'Repair',
        date: '02/02/2020',
        accident: 'Miner',
        action: ''
      },
      {
        id: 7,
        statusColor: '#838BCE',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png',
          flag: true
        },
        issue: 'Dent',
        source: 'Reception',
        refrenceNo: '2200100224',
        jobType: 'Repair',
        date: '02/02/2020',
        accident: 'Miner',
        action: ''
      }
    ],
    rowSettings: {
      onClick: (col, data, button?) => {},
      floatButton: [
        {
          button: 'external',
          onClick: (col, data) => {
            console.log(data);
            this.router
              .navigate(['/workshop/body-shop/request-overview/' + data.id])
              .then();
          }
        }
      ]
    }
  };

  table2Setting: TableSetting = {
    columns: [
      {
        lable: 'tables.column.item',
        field: 'item',
        renderer: 'vehicleRenderer'
      },
      { lable: 'tables.column.task', field: 'task', type: ColumnType.lable },
      {
        lable: 'tables.column.start_date',
        field: 'startDate',
        type: ColumnType.lable,
        width: 120
      },
      {
        lable: 'tables.column.end_date',
        field: 'endDate',
        type: ColumnType.lable,
        width: 120
      },
      {
        lable: 'tables.column.location',
        field: 'location',
        type: ColumnType.lable,
        width: 100
      },
      {
        lable: 'tables.column.cost',
        field: 'cost',
        type: ColumnType.lable,
        width: 100,
        sortable: true
      },
      {
        lable: 'tables.column.workshop_manager_approval',
        field: 'workshopManagerApproval',
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
    ],
    data: [
      {
        id: 1,
        statusColor: '#838BCE',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png'
        },
        task: 'Oil leaking, Oil leaking, Oil leaking..',
        startDate: '20-20-2020',
        endDate: '20-20-2020',
        location: 'Station 2',
        cost: '30.000 AED',
        workshopManagerApproval: 'Approved'
      },
      {
        id: 1,
        statusColor: '#838BCE',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png'
        },
        task: 'Oil leaking, Oil leaking, Oil leaking..',
        startDate: '20-20-2020',
        endDate: '20-20-2020',
        location: 'Station 2',
        cost: '30.000 AED',
        workshopManagerApproval: 'Approved'
      },
      {
        id: 1,
        statusColor: '#838BCE',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png'
        },
        task: 'Oil leaking, Oil leaking, Oil leaking..',
        startDate: '20-20-2020',
        endDate: '20-20-2020',
        location: 'Station 2',
        cost: '30.000 AED',
        workshopManagerApproval: 'Approved'
      },
      {
        id: 1,
        statusColor: '#838BCE',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png'
        },
        task: 'Oil leaking, Oil leaking, Oil leaking..',
        startDate: '20-20-2020',
        endDate: '20-20-2020',
        location: 'Station 2',
        cost: '30.000 AED',
        workshopManagerApproval: 'Approved'
      },
      {
        id: 1,
        statusColor: '#838BCE',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png'
        },
        task: 'Oil leaking, Oil leaking, Oil leaking..',
        startDate: '20-20-2020',
        endDate: '20-20-2020',
        location: 'Station 2',
        cost: '30.000 AED',
        workshopManagerApproval: 'Approved'
      },
      {
        statusColor: '#BA7967',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png'
        },
        task: 'Oil leaking, Oil leaking, Oil leaking..',
        startDate: '20-20-2020',
        endDate: '20-20-2020',
        location: 'Station 2',
        cost: '30.000 AED',
        workshopManagerApproval: 'Approved'
      },
      {
        statusColor: '#F75A4A',
        item: {
          title: 'Request No 123456',
          dpd: 'DPD 0000001',
          thumb: 'thumb1.png'
        },
        task: 'Oil leaking, Oil leaking, Oil leaking..',
        startDate: '20-20-2020',
        endDate: '20-20-2020',
        location: 'Station 2',
        cost: '30.000 AED',
        workshopManagerApproval: 'Approved'
      }
    ],
    rowSettings: {
      onClick: (col, data) => {
        console.log(col, data);
      },
      floatButton: [
        {
          button: 'external',
          onClick: (col, data) => {
            this.router.navigate(['/fleet/assets/' + data.id]).then();
          }
        }
      ]
    }
  };

  table3Setting: TableSetting = {
    columns: [
      {
        lable: 'tables.column.technician',
        field: 'technician',
        width: 180,
        renderer: 'userRenderer'
      },
      {
        lable: 'tables.column.skill',
        field: 'skill',
        width: 180,
        type: ColumnType.lable
      },
      {
        lable: 'tables.column.status',
        field: 'status',
        type: ColumnType.lable,
        width: 120,
        textColor: '#6870B4'
      },
      {
        lable: 'tables.column.task',
        field: 'tasks',
        type: ColumnType.lable,
        width: 80
      },
      {
        lable: 'tables.column.information',
        field: 'information',
        type: ColumnType.lable,
        width: 120,
        renderer: 'informationRenderer'
      },
      {
        lable: 'tables.column.rate_per_hour',
        field: 'ratePerHour',
        type: ColumnType.lable,
        width: 100,
        sortable: true
      }
    ],
    data: [
      {
        statusColor: '#6870B4',
        technician: {
          firstName: 'Sam',
          lastName: 'Smith',
          picture: 'man-in-suit2.png',
          id: '1234567890'
        },
        skill:
          'Electrician, Electrician, Electrician, Electrician, Electrician, Electrician',
        status: 'Available',
        tasks: '2',
        information: {
          email: 'sample@gmail.com',
          phoneNumber: '+971505653793'
        },
        ratePerHour: '0000 AED'
      },
      {
        statusColor: '#6870B4',
        technician: {
          firstName: 'Sam',
          lastName: 'Smith',
          picture: 'man-in-suit2.png',
          id: '1234567890'
        },
        skill:
          'Electrician, Electrician, Electrician, Electrician, Electrician, Electrician',
        status: 'Available',
        tasks: '2',
        information: {
          email: 'sample@gmail.com',
          phoneNumber: '+971505653793'
        },
        ratePerHour: '0000 AED'
      },
      {
        statusColor: '#6870B4',
        technician: {
          firstName: 'Sam',
          lastName: 'Smith',
          picture: 'man-in-suit2.png',
          id: '1234567890'
        },
        skill:
          'Electrician, Electrician, Electrician, Electrician, Electrician, Electrician',
        status: 'Available',
        tasks: '2',
        information: {
          email: 'sample@gmail.com',
          phoneNumber: '+971505653793'
        },
        ratePerHour: '0000 AED'
      },
      {
        statusColor: '#6870B4',
        technician: {
          firstName: 'Sam',
          lastName: 'Smith',
          picture: 'man-in-suit2.png',
          id: '1234567890'
        },
        skill:
          'Electrician, Electrician, Electrician, Electrician, Electrician, Electrician',
        status: 'Available',
        tasks: '2',
        information: {
          email: 'sample@gmail.com',
          phoneNumber: '+971505653793'
        },
        ratePerHour: '0000 AED'
      },
      {
        statusColor: '#6870B4',
        technician: {
          firstName: 'Sam',
          lastName: 'Smith',
          picture: 'man-in-suit2.png',
          id: '1234567890'
        },
        skill:
          'Electrician, Electrician, Electrician, Electrician, Electrician, Electrician',
        status: 'Available',
        tasks: '2',
        information: {
          email: 'sample@gmail.com',
          phoneNumber: '+971505653793'
        },
        ratePerHour: '0000 AED'
      },
      {
        statusColor: '#6870B4',
        technician: {
          firstName: 'Sam',
          lastName: 'Smith',
          picture: 'man-in-suit2.png',
          id: '1234567890'
        },
        skill:
          'Electrician, Electrician, Electrician, Electrician, Electrician, Electrician',
        status: 'Available',
        tasks: '2',
        information: {
          email: 'sample@gmail.com',
          phoneNumber: '+971505653793'
        },
        ratePerHour: '0000 AED'
      }
    ]
  };

  table4Setting: TableSetting = {
    columns: [
      { lable: 'tables.column.location_id', field: 'locationId', width: 200 },
      {
        lable: 'tables.column.service',
        field: 'service',
        type: ColumnType.lable,
        width: 200
      },
      {
        lable: 'tables.column.address',
        field: 'address',
        type: ColumnType.lable,
        width: 200
      },
      {
        lable: 'tables.column.section',
        field: 'section',
        type: ColumnType.lable,
        width: 120
      },
      {
        lable: 'tables.column.job_card',
        field: 'jobCard',
        type: ColumnType.lable,
        width: 100,
        sortable: true
      },
      {
        lable: 'tables.column.technician',
        field: 'technician',
        type: ColumnType.lable,
        width: 100,
        sortable: true
      },
      {
        lable: 'tables.column.asset',
        field: 'assets',
        type: ColumnType.lable,
        width: 100,
        sortable: true
      }
    ],
    data: [
      {
        locationId: '0023457687',
        service: 'Repair, Car-wash, Fuel',
        address: 'Bardubai, Street Number 2',
        section: '3',
        jobCard: '123456789',
        technician: '123',
        assets: '123456/1234'
      },
      {
        locationId: '0023457687',
        service: 'Repair, Car-wash, Fuel',
        address: 'Bardubai, Street Number 2',
        section: '3',
        jobCard: '123456789',
        technician: '123',
        assets: '123456/1234'
      },
      {
        locationId: '0023457687',
        service: 'Repair, Car-wash, Fuel',
        address: 'Bardubai, Street Number 2',
        section: '3',
        jobCard: '123456789',
        technician: '123',
        assets: '123456/1234'
      },
      {
        locationId: '0023457687',
        service: 'Repair, Car-wash, Fuel',
        address: 'Bardubai, Street Number 2',
        section: '3',
        jobCard: '123456789',
        technician: '123',
        assets: '123456/1234'
      },
      {
        locationId: '0023457687',
        service: 'Repair, Car-wash, Fuel',
        address: 'Bardubai, Street Number 2',
        section: '3',
        jobCard: '123456789',
        technician: '123',
        assets: '123456/1234'
      },
      {
        locationId: '0023457687',
        service: 'Repair, Car-wash, Fuel',
        address: 'Bardubai, Street Number 2',
        section: '3',
        jobCard: '123456789',
        technician: '123',
        assets: '123456/1234'
      },
      {
        locationId: '0023457687',
        service: 'Repair, Car-wash, Fuel',
        address: 'Bardubai, Street Number 2',
        section: '3',
        jobCard: '123456789',
        technician: '123',
        assets: '123456/1234'
      }
    ]
  };

  selectedTab;
  constructor(
    private _facadeRequest: BodyShopRequestFacade,
    private _facadeJobCard: BodyShopJobCardFacade,
    private _facadeTechnician: BodyShopTechnicianFacade,
    private _facadeLocation: BodyShopLocationFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._facadeRequest.loadAll();
    this._facadeJobCard.loadAll();
    this._facadeTechnician.loadAll();
    this._facadeLocation.loadAll();
  }

  addClicked(e: Event) {
    switch (this.selectedTab) {
      case 'jobcardTab':
        break;
      case 'technicianTab':
        this.router.navigate(['workshop/body-shop/add-technician'], {
          queryParams: { id: 'technicianTab' }
        });
        break;
      case 'locationTab':
        this.router.navigate(['workshop/body-shop/add-location'], {
          queryParams: { id: 'locationTab' }
        });
        break;
      default:
        this.router.navigate(['workshop/body-shop/add-request']);
        break;
    }
  }
}

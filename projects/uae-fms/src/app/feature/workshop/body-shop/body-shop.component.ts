import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FilterCardSetting } from '@core/filter';
import { TableSetting, ColumnType } from '@core/table';
import { BodyShopFacade } from "../+state/body-shop";
import { Router } from "@angular/router";
@Component({
  templateUrl: './body-shop.component.html',
  styleUrls: ['./body-shop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BodyShopComponent implements OnInit {
  filterSetting: FilterCardSetting[] = [
    {
      filterCount: '13',
      filterTagColor: '#6EBFB5',
      filterTitle: 'Total',
      onActive: () => { }
    },
    {
      filterCount: '8',
      filterTagColor: '#6870B4',
      filterTitle: 'Approved',
      onActive: () => { }
    },
    {
      filterCount: '13',
      filterTagColor: '#BA7967',
      filterTitle: 'Waiting For Approval',
      onActive: () => { }
    },
    {
      filterCount: '13',
      filterTagColor: '#DD5648',
      filterTitle: 'Rejected',
      onActive: () => { }
    }
  ];

  table1Setting: TableSetting = {
    columns: [
      { lable: 'Item', field: 'item', renderer: 'vehicleRenderer' },
      { lable: 'Issue', field: 'issue', type: ColumnType.lable, width: 70 },
      { lable: 'Source', field: 'source', type: ColumnType.lable, width: 120 },
      { lable: 'Reference No', field: 'refrenceNo', type: ColumnType.lable },
      {
        lable: 'Job Type',
        field: 'jobType',
        type: ColumnType.lable,
        width: 100
      },
      { lable: 'Date', field: 'date', type: ColumnType.lable },
      {
        lable: 'Accident',
        field: 'accident',
        type: ColumnType.lable,
        width: 100
      },
      { lable: 'Action', field: 'action', type: ColumnType.lable, width: 90 }
    ],
    data: [
      {
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
    ]
  };

  table2Setting: TableSetting = {
    columns: [
      { lable: 'Item', field: 'item', renderer: 'vehicleRenderer' },
      { lable: 'Task', field: 'task', type: ColumnType.lable },
      {
        lable: 'Start Date',
        field: 'startDate',
        type: ColumnType.lable,
        width: 120
      },
      {
        lable: 'End Date',
        field: 'endDate',
        type: ColumnType.lable,
        width: 120
      },
      {
        lable: 'Location',
        field: 'location',
        type: ColumnType.lable,
        width: 100
      },
      { lable: 'Cost', field: 'cost', type: ColumnType.lable, width: 100 },
      {
        lable: 'Workshop Manager Approval',
        field: 'workshopManagerApproval',
        type: ColumnType.lable
      }
    ],
    data: [
      {
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
    ]
  };

  table3Setting: TableSetting = {
    columns: [
      { lable: 'Technician', field: 'technician', renderer: 'userRenderer' },
      { lable: 'Skill', field: 'skill', type: ColumnType.lable },
      {
        lable: 'Status',
        field: 'status',
        type: ColumnType.lable,
        width: 120,
        textColor: '#6870B4'
      },
      { lable: 'Tasks', field: 'tasks', type: ColumnType.lable, width: 120 },
      {
        lable: 'Information',
        field: 'information',
        type: ColumnType.lable,
        width: 100,
        renderer: 'informationRenderer'
      },
      {
        lable: 'Rate Per Hour',
        field: 'ratePerHour',
        type: ColumnType.lable,
        width: 100
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
      { lable: 'Location Id', field: 'locationId' },
      { lable: 'Service', field: 'service', type: ColumnType.lable },
      {
        lable: 'Address',
        field: 'address',
        type: ColumnType.lable,
        width: 120
      },
      {
        lable: 'Section',
        field: 'section',
        type: ColumnType.lable,
        width: 120
      },
      {
        lable: 'Job Card',
        field: 'jobCard',
        type: ColumnType.lable,
        width: 100
      },
      {
        lable: 'Technician',
        field: 'technician',
        type: ColumnType.lable,
        width: 100
      },
      { lable: 'Assets', field: 'assets', type: ColumnType.lable, width: 100 }
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

  selectedTab
  constructor(private facade: BodyShopFacade, private router: Router) { }

  ngOnInit(): void {
    this.facade.loadAll()
  }

  addClicked() {
    switch (this.selectedTab) {
      case "Job Card":
        break;
      case "Technician":
        this.router.navigate(['workshop/body-shop/add-technician']);
        break;
      case "Location":
        this.router.navigate(['workshop/body-shop/add-location']);
        break;
      default:
        this.router.navigate(['workshop/body-shop/add-request']);
        break;
    }
  }
}

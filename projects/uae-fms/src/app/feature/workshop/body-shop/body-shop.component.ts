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
import { map } from 'rxjs/operators';
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
      filterCount: '15',
      filterTagColor: '#6EBFB5',
      filterTitle: 'statistic.total',
      filterSupTitle: 'statistic.insurance_claim',
      onActive: () => {}
    },
    {
      filterCount: '15',
      filterTagColor: '#6870B4',
      filterTitle: 'statistic.approved',
      filterSupTitle: 'statistic.insurance_claim',
      onActive: () => {}
    },
    {
      filterCount: '10',
      filterTagColor: '#BA7967',
      filterTitle: 'statistic.waiting_for_approval',
      filterSupTitle: 'statistic.insurance_claim',
      onActive: () => {}
    },
    {
      filterCount: '30',
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

  requestData$ = this._facadeRequest.bodyShop$.pipe(
    map((x) => {
      return x.map((y) => {
        return {
          ...y,
          department: y.department.name,
          operatorName: y.operator.firstName + ' ' + y.operator.lastName
        };
      });
    })
  );
  locationData$ = this._facadeLocation.bodyShop$.pipe(
    map((x) => {
      return x.map((y) => {
        return {
          ...y,
          locationId: y.locationThirdPartyId,
          service: y.services.join(','),
          address: y.address,
          section: '',
          jobCard: y.numOfJobCards,
          technician: y.numOfTechnicians,
          capacity: y.capacity
        };
      });
    })
  );
  technicianData$ = this._facadeTechnician.bodyShop$.pipe(
    map((x) => {
      return x.map((y) => {
        return {
          ...y,
          technician: {
            firstName: y.user.firstName,
            lastName: y.user.lastName,
            id: y.user.id
            // picture: 'assets/user-image.png',
          },
          skill: y.skills.map((s) => s.name).join(','),
          status: 'Available',
          tasks: y.numOfTasks,
          information: {
            email: y.user.emails[0],
            phoneNumber: y.user.phoneNumbers[0]
          },
          ratePerHour: y.payPerHour
        };
      });
    })
  );
  jobCardData$ = this._facadeJobCard.bodyShop$.pipe(
    map((x) => {
      return x.map((y) => {
        return {
          ...y,
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
        };
      });
    })
  );
  table1Setting: TableSetting = {
    columns: [
      {
        lable: 'Asset',
        field: 'dpd',
        width: 100,
        type: ColumnType.lable
      },
      {
        lable: 'Plate Number',
        field: 'plateNumber',
        width: 100,
        type: ColumnType.lable
      },
      {
        lable: 'Department',
        field: 'department',
        width: 100,
        type: ColumnType.lable
      },
      {
        lable: 'Operator Name',
        field: 'operatorName',
        width: 100,
        type: ColumnType.lable
      },
      {
        lable: 'َAsset Type',
        field: 'assetTypeName',
        width: 100,
        type: ColumnType.lable
      },
      {
        lable: 'َNumber Of Request',
        field: 'numberOfActiveRequests',
        width: 100,
        type: ColumnType.lable
      },
      // {
      //   lable: 'tables.column.item',
      //   field: 'item',
      //   width: 190,
      //   renderer: 'vehicleRenderer'
      // },
      // {
      //   lable: 'tables.column.issue',
      //   field: 'issue',
      //   type: ColumnType.lable,
      //   width: 70
      // },
      // {
      //   lable: 'tables.column.source',
      //   field: 'source',
      //   type: ColumnType.lable,
      //   width: 120
      // },
      // {
      //   lable: 'tables.column.reference_no',
      //   field: 'refrenceNo',
      //   width: 100,
      //   type: ColumnType.lable
      // },
      // {
      //   lable: 'tables.column.job_type',
      //   field: 'jobType',
      //   type: ColumnType.lable,
      //   width: 100
      // },
      // {
      //   lable: 'tables.column.date',
      //   field: 'date',
      //   width: 100,
      //   type: ColumnType.lable,
      //   sortable: true
      // },
      {
        lable: '',
        field: 'floatButton',
        width: 0,
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'floatButton',
        hasJobCardButton: true
      },
      // {
      //   lable: 'tables.column.accident',
      //   field: 'accident',
      //   type: ColumnType.lable,
      //   width: 100
      // },
      {
        lable: 'tables.column.action',
        field: '',
        type: ColumnType.lable,
        width: 120,
        renderer: 'button',
        buttonType: ButtonType.jobCard
      }
    ],
    data: [],
    rowSettings: {
      onClick: (col, data, button?) => {},
      floatButton: [
        {
          button: 'external',
          onClick: (col, data) => {
            this.router
              .navigate(['/workshop/body-shop/request-overview/' + data.id])
              .then();
          }
        }
        // {
        //   button: 'edit',
        //   color: '#3F3F3F',
        //   onClick: (col, data, button?) => {
        //     this._facadeRequest.resetParams();
        //     this.router.navigate([
        //       '/workshop/body-shop/edit-request/' + data.id
        //     ]);
        //   }
        // }
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
      // {
      //   id: 1,
      //   statusColor: '#838BCE',
      //   item: {
      //     title: 'Request No 123456',
      //     dpd: 'DPD 0000001',
      //     thumb: 'thumb1.png'
      //   },
      //   task: 'Oil leaking, Oil leaking, Oil leaking..',
      //   startDate: '20-20-2020',
      //   endDate: '20-20-2020',
      //   location: 'Station 2',
      //   cost: '30.000 AED',
      //   workshopManagerApproval: 'Approved'
      // },
      // {
      //   id: 1,
      //   statusColor: '#838BCE',
      //   item: {
      //     title: 'Request No 123456',
      //     dpd: 'DPD 0000001',
      //     thumb: 'thumb1.png'
      //   },
      //   task: 'Oil leaking, Oil leaking, Oil leaking..',
      //   startDate: '20-20-2020',
      //   endDate: '20-20-2020',
      //   location: 'Station 2',
      //   cost: '30.000 AED',
      //   workshopManagerApproval: 'Approved'
      // },
      // {
      //   id: 1,
      //   statusColor: '#838BCE',
      //   item: {
      //     title: 'Request No 123456',
      //     dpd: 'DPD 0000001',
      //     thumb: 'thumb1.png'
      //   },
      //   task: 'Oil leaking, Oil leaking, Oil leaking..',
      //   startDate: '20-20-2020',
      //   endDate: '20-20-2020',
      //   location: 'Station 2',
      //   cost: '30.000 AED',
      //   workshopManagerApproval: 'Approved'
      // },
      // {
      //   id: 1,
      //   statusColor: '#838BCE',
      //   item: {
      //     title: 'Request No 123456',
      //     dpd: 'DPD 0000001',
      //     thumb: 'thumb1.png'
      //   },
      //   task: 'Oil leaking, Oil leaking, Oil leaking..',
      //   startDate: '20-20-2020',
      //   endDate: '20-20-2020',
      //   location: 'Station 2',
      //   cost: '30.000 AED',
      //   workshopManagerApproval: 'Approved'
      // },
      // {
      //   id: 1,
      //   statusColor: '#838BCE',
      //   item: {
      //     title: 'Request No 123456',
      //     dpd: 'DPD 0000001',
      //     thumb: 'thumb1.png'
      //   },
      //   task: 'Oil leaking, Oil leaking, Oil leaking..',
      //   startDate: '20-20-2020',
      //   endDate: '20-20-2020',
      //   location: 'Station 2',
      //   cost: '30.000 AED',
      //   workshopManagerApproval: 'Approved'
      // },
      // {
      //   statusColor: '#BA7967',
      //   item: {
      //     title: 'Request No 123456',
      //     dpd: 'DPD 0000001',
      //     thumb: 'thumb1.png'
      //   },
      //   task: 'Oil leaking, Oil leaking, Oil leaking..',
      //   startDate: '20-20-2020',
      //   endDate: '20-20-2020',
      //   location: 'Station 2',
      //   cost: '30.000 AED',
      //   workshopManagerApproval: 'Approved'
      // },
      // {
      //   statusColor: '#F75A4A',
      //   item: {
      //     title: 'Request No 123456',
      //     dpd: 'DPD 0000001',
      //     thumb: 'thumb1.png'
      //   },
      //   task: 'Oil leaking, Oil leaking, Oil leaking..',
      //   startDate: '20-20-2020',
      //   endDate: '20-20-2020',
      //   location: 'Station 2',
      //   cost: '30.000 AED',
      //   workshopManagerApproval: 'Approved'
      // }
    ],
    rowSettings: {
      onClick: (col, data) => {
        // console.log(col, data);
      },
      floatButton: [
        {
          button: 'external',
          onClick: (col, data) => {
            this.router.navigate(['/fleet/assets/' + data.id]).then();
          }
        },
        {
          button: 'edit',
          color: '#3F3F3F',
          onClick: (col, data, button?) => {
            this._facadeJobCard.resetParams();
            this.router.navigate([
              '/workshop/body-shop/edit-job-card/' + data.id
            ]);
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
      },
      {
        lable: '',
        field: 'floatButton',
        width: 0,
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'floatButton',
        hasJobCardButton: false
      }
    ],
    data: [
      // {
      //   statusColor: '#6870B4',
      //   technician: {
      //     firstName: 'Sam',
      //     lastName: 'Smith',
      //     picture: 'man-in-suit2.png',
      //     id: '1234567890'
      //   },
      //   skill:
      //     'Electrician, Electrician, Electrician, Electrician, Electrician, Electrician',
      //   status: 'Available',
      //   tasks: '2',
      //   information: {
      //     email: 'sample@gmail.com',
      //     phoneNumber: '+971505653793'
      //   },
      //   ratePerHour: '0000 AED'
      // },
      // {
      //   statusColor: '#6870B4',
      //   technician: {
      //     firstName: 'Sam',
      //     lastName: 'Smith',
      //     picture: 'man-in-suit2.png',
      //     id: '1234567890'
      //   },
      //   skill:
      //     'Electrician, Electrician, Electrician, Electrician, Electrician, Electrician',
      //   status: 'Available',
      //   tasks: '2',
      //   information: {
      //     email: 'sample@gmail.com',
      //     phoneNumber: '+971505653793'
      //   },
      //   ratePerHour: '0000 AED'
      // },
      // {
      //   statusColor: '#6870B4',
      //   technician: {
      //     firstName: 'Sam',
      //     lastName: 'Smith',
      //     picture: 'man-in-suit2.png',
      //     id: '1234567890'
      //   },
      //   skill:
      //     'Electrician, Electrician, Electrician, Electrician, Electrician, Electrician',
      //   status: 'Available',
      //   tasks: '2',
      //   information: {
      //     email: 'sample@gmail.com',
      //     phoneNumber: '+971505653793'
      //   },
      //   ratePerHour: '0000 AED'
      // },
      // {
      //   statusColor: '#6870B4',
      //   technician: {
      //     firstName: 'Sam',
      //     lastName: 'Smith',
      //     picture: 'man-in-suit2.png',
      //     id: '1234567890'
      //   },
      //   skill:
      //     'Electrician, Electrician, Electrician, Electrician, Electrician, Electrician',
      //   status: 'Available',
      //   tasks: '2',
      //   information: {
      //     email: 'sample@gmail.com',
      //     phoneNumber: '+971505653793'
      //   },
      //   ratePerHour: '0000 AED'
      // },
      // {
      //   statusColor: '#6870B4',
      //   technician: {
      //     firstName: 'Sam',
      //     lastName: 'Smith',
      //     picture: 'man-in-suit2.png',
      //     id: '1234567890'
      //   },
      //   skill:
      //     'Electrician, Electrician, Electrician, Electrician, Electrician, Electrician',
      //   status: 'Available',
      //   tasks: '2',
      //   information: {
      //     email: 'sample@gmail.com',
      //     phoneNumber: '+971505653793'
      //   },
      //   ratePerHour: '0000 AED'
      // },
      // {
      //   statusColor: '#6870B4',
      //   technician: {
      //     firstName: 'Sam',
      //     lastName: 'Smith',
      //     picture: 'man-in-suit2.png',
      //     id: '1234567890'
      //   },
      //   skill:
      //     'Electrician, Electrician, Electrician, Electrician, Electrician, Electrician',
      //   status: 'Available',
      //   tasks: '2',
      //   information: {
      //     email: 'sample@gmail.com',
      //     phoneNumber: '+971505653793'
      //   },
      //   ratePerHour: '0000 AED'
      // }
    ],
    rowSettings: {
      onClick: (col, data, button?) => {},
      floatButton: [
        {
          button: 'edit',
          color: '#3F3F3F',
          onClick: (col, data, button?) => {
            this._facadeTechnician.resetParams();
            this.router.navigate([
              '/workshop/body-shop/edit-technician/' + data.id
            ]);
          }
        }
      ]
    }
  };

  table4Setting: TableSetting = {
    columns: [
      { lable: 'tables.column.location_id', field: 'locationId', width: 200 },
      {
        lable: 'tables.column.services',
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
        lable: 'tables.column.capacity',
        field: 'capacity',
        type: ColumnType.lable,
        width: 100,
        sortable: true
      }
    ],
    data: []
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
    // this._facadeRequest.loadStatistics();
    this._facadeRequest.statistics$.subscribe((x) => {
      if (x) {
        this.filterSetting.map((filter) => {
          switch (filter.filterTitle) {
            case 'statistic.total':
              filter.filterCount = x.total;
              break;
            case 'statistic.waiting_for_approval':
              filter.filterCount = x.waitingForApproval;
              break;
            case 'statistic.approved':
              filter.filterCount = x.approved;
              break;
            case 'statistic.rejected':
              filter.filterCount = x.rejected;
              break;
            default:
              break;
          }
        });
      }
    });
  }

  addClicked(e: Event) {
    switch (this.selectedTab) {
      case 'jobcardTab':
        this.router.navigate(['workshop/body-shop/add-job-card'], {
          queryParams: { id: 'jobcardTab' }
        });
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

  eventPagination_request() {
    this._facadeRequest.loadAll();
  }

  eventPagination_jobcard() {
    this._facadeJobCard.loadAll();
  }

  eventPagination_technician() {
    this._facadeTechnician.loadAll();
  }

  eventPagination_location() {
    this._facadeLocation.loadAll();
  }

}

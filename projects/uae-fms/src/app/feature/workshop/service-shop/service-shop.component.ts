import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild
} from '@angular/core';
import { FilterCardSetting } from '@core/filter';
import { TableSetting, ColumnType } from '@core/table';
import { map } from 'rxjs/operators';
import moment from 'moment';
import { Event, Router } from '@angular/router';
import { TableComponent } from '@core/table/table.component';
import {
  ServiceShopJobCardFacade,
  ServiceShopLocationFacade,
  ServiceShopRequestFacade,
  ServiceShopTechnicianFacade
} from '../+state/service-shop';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
@Component({
  templateUrl: './service-shop.component.html',
  styleUrls: ['./service-shop.component.scss']
})
export class ServiceShopComponent implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;
  downloadBtn = 'assets/icons/download-solid.svg';
  filterSetting: FilterCardSetting[] = [
    {
      filterCount: '',
      filterTagColor: '',
      filterTitle: 'statistic.calendar',
      isCalendar: true,
      onActive: () => { }
    },
    {
      filterCount: '15',
      filterTagColor: '#6EBFB5',
      filterTitle: 'statistic.total',
      filterSupTitle: 'statistic.insurance_claim',
      onActive: () => { }
    },
    {
      filterCount: '15',
      filterTagColor: '#6870B4',
      filterTitle: 'statistic.approved',
      filterSupTitle: 'statistic.insurance_claim',
      onActive: () => { }
    },
    {
      filterCount: '10',
      filterTagColor: '#BA7967',
      filterTitle: 'statistic.waiting_for_approval',
      filterSupTitle: 'statistic.insurance_claim',
      onActive: () => { }
    },
    {
      filterCount: '30',
      filterTagColor: '#DD5648',
      filterTitle: 'statistic.rejected',
      filterSupTitle: 'statistic.insurance_claim',
      onActive: () => { }
    }
  ];

  jobCardTabFilterSetting: FilterCardSetting[] = [
    {
      filterCount: '',
      filterTagColor: '',
      filterTitle: 'statistic.this_month',
      isCalendar: true,
      onActive: () => { }
    },
    {
      filterCount: '13',
      filterTagColor: '#6EBFB5',
      filterTitle: 'statistic.total',
      filterSupTitle: 'statistic.job_card',
      onActive: () => { }
    },
    {
      filterCount: '8',
      filterTagColor: '#6870B4',
      filterTitle: 'statistic.approved',
      filterSupTitle: 'statistic.workshop_manager',
      onActive: () => { }
    },
    {
      filterCount: '13',
      filterTagColor: '#BA7967',
      filterTitle: 'statistic.waiting_for_approval',
      filterSupTitle: 'statistic.workshop_manager',
      onActive: () => { }
    },
    {
      filterCount: '13',
      filterTagColor: '#DD5648',
      filterTitle: 'statistic.rejected',
      filterSupTitle: 'statistic.workshop_manager',
      onActive: () => { }
    }
  ];

  technicianTabFilterSetting: FilterCardSetting[] = [
    {
      filterCount: '',
      filterTagColor: '',
      filterTitle: 'statistic.this_month',
      isCalendar: true,
      onActive: () => { }
    },
    {
      filterCount: '13',
      filterTagColor: '#6EBFB5',
      filterTitle: 'statistic.total',
      filterSupTitle: 'statistic.technician',
      onActive: () => { }
    },
    {
      filterCount: '8',
      filterTagColor: '#6870B4',
      filterTitle: 'statistic.available',
      filterSupTitle: 'statistic.technician',
      onActive: () => { }
    },
    {
      filterCount: '13',
      filterTagColor: '#BA7967',
      filterTitle: 'statistic.unavailable',
      filterSupTitle: 'statistic.technician',
      onActive: () => { }
    }
  ];

  //#region Dialog
  errorDialogSetting: IDialogAlert = {
    header: '',
    message: '',
    confirmButton: 'Ok',
    isWarning: false,
    hasError: true,
    hasHeader: true,
    cancelButton: undefined
  };
  errorDialogModal = false;
  //#endregion

  //#region Data
  requestData$ = this._facadeRequest.serviceShop$.pipe(
    map((x) => {
      return x.map((y) => {
        return {
          ...y,
          asset: {
            img: 'assets/thumb.png',
            assetName: y.assetTypeName,
            assetSubName: y.dpd
          },
          plateNumber:
            y.plateNumber != null ? y.plateNumber : 'Without Plate Number',
          department: y.department.name,
          operatorName: y.operator.firstName + ' ' + y.operator.lastName,
          assetTypeName:y.assetConfigurationName
        };
      });
    })
  );
  locationData$ = this._facadeLocation.serviceShop$.pipe(
    map((x) => {
      console.log(x);
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
  technicianData$ = this._facadeTechnician.serviceShop$.pipe(
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
  jobCardData$ = this._facadeJobCard.serviceShop$.pipe(
    map((x) => {
      return x.map((y) => {
        return {
          ...y,
          asset: {
            img: 'assets/thumb.png',
            assetName: y.assetDpd,
            assetSubName: y.assetDpd
          },
          startDate: y.startDate
            ? moment.utc(y.startDate).local().format('DD-MM-YYYY')
            : 'ex: 20-20-2020',
          endDate: y.endDate
            ? moment.utc(y.endDate).local().format('DD-MM-YYYY')
            : 'ex: 20-20-2020',
          location: y.location.address ? y.location.address : 'ex: Dubai',
          cost: y.cost ? `${y.cost} AED` : 'ex: 30.000 AED ',
          technician: Math.floor(Math.random() * 20) + 1,
          task: Math.floor(Math.random() * 100) + 1
        };
      });
    })
  );
  //#endregion

  //#region Tables
  table1Setting: TableSetting = {
    columns: [
      {
        lable: 'tables.column.asset',
        field: 'asset',
        width: '18em',
        thumbField: '',
        type: ColumnType.lable,
        renderer: 'assetsRenderer'
      },
      {
        lable: 'tables.column.plate_number',
        field: 'plateNumber',
        type: ColumnType.lable
      },
      {
        lable: 'tables.column.department',
        field: 'department',
        type: ColumnType.lable
      },
      {
        lable: 'tables.column.operator_name',
        field: 'operatorName',
        type: ColumnType.lable
      },
      {
        lable: 'tables.column.asset_type',
        field: 'assetTypeName',
        type: ColumnType.lable
      },
      {
        lable: 'tables.column.number_of_request',
        field: 'numberOfActiveRequests',
        type: ColumnType.lable
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
    data: [],
    rowSettings: {
      onClick: (col, data, button?) => { },
      floatButton: [
        {
          button: 'folder-check',
          color: '#0da06e',
          tooltip: 'Create job card',
          condition: function (data) {
            return data.hasOpenJobCard ? false : true;
          },
          onClick: (col, data, button?) => {
            this._facadeRequest.resetParams();
            this.router.navigate(['/workshop/service-shop/'+data.id+'/add-job-card']);
          }
        },
        {
          button: 'external',
          onClick: (col, data) => {
            this._facadeRequest.getAssetRequest(data.assetId);
            this.router
              .navigate(['/workshop/service-shop/request-overview/' + data.id])
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
        lable: 'tables.column.asset',
        field: 'asset',
        width: '18em',
        thumbField: '',
        type: ColumnType.lable,
        renderer: 'assetsRenderer'
      },
      {
        lable: 'tables.column.start_date',
        field: 'startDate',
        type: ColumnType.lable
      },
      {
        lable: 'tables.column.end_date',
        field: 'endDate',
        type: ColumnType.lable
      },
      {
        lable: 'tables.column.location',
        field: 'location',
        type: ColumnType.lable
      },
      {
        lable: 'tables.column.cost',
        field: 'cost',
        type: ColumnType.lable,
        sortable: true
      },
      {
        lable: 'tables.column.technician',
        field: 'technician',
        type: ColumnType.lable
      },
      /* {
        lable: 'tables.column.task',
        field: 'task',
        width: '18em',
        type: ColumnType.lable,
        renderer: 'radialBar'
      } */
      {
        lable: '',
        field: 'floatButton',
        width: 0,
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'floatButton'
      }
    ],
    data: [],
    rowSettings: {
      onClick: (col, data) => {
        // console.log(col, data);
      },
      floatButton: [
        {
          button: 'external',
          onClick: (col, data) => {
            this.router.navigate(['/workshop/service-shop/job-card-overview/' + data.id]).then();
          }
        },
        {
          button: 'edit',
          color: '#3F3F3F',
          onClick: (col, data, button?) => {
            console.log(data)
            this._facadeJobCard.resetParams();
            this.router.navigate([
              '/workshop/service-shop/edit-job-card/' + data.id
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
    data: [],
    rowSettings: {
      onClick: (col, data, button?) => { },
      floatButton: [
        {
          button: 'edit',
          color: '#3F3F3F',
          onClick: (col, data, button?) => {
            this._facadeTechnician.resetParams();
            this.router.navigate([
              '/workshop/service-shop/edit-technician/' + data.id
            ]);
          }
        }
        /* {
          button: 'external',
          color: '#3F3F3F',
          onClick: (col, data, button?) => {
            this._facadeRequest.resetParams();
            this.router.navigate([
              '/workshop/service-shop/technician/' + data.id
            ]);
          }
        } */
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
      // {
      //   lable: 'tables.column.section',
      //   field: 'section',
      //   type: ColumnType.lable,
      //   width: 120
      // },
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
    data: [],
    rowSettings: {
      onClick: (col, data, button?) => {},
      floatButton: [
        {
          button: 'edit',
          color: '#3F3F3F',
          onClick: (col, data, button?) => {
            this._facadeLocation.resetParams();
            this.router.navigate([
              '/workshop/service-shop/edit-location/' + data.id
            ]);
          }
        }
        /* {
          button: 'external',
          color: '#3F3F3F',
          onClick: (col, data, button?) => {
            this._facadeRequest.resetParams();
            this.router.navigate([
              '/workshop/body-shop/technician/' + data.id
            ]);
          }
        } */
      ]
    }
  };
  //#endregion

  selectedTab;
  jobCardCount$ = this._facadeJobCard.conut$.pipe(
    map((x) => {
      return x;
    })
  );
  locationCount$ = this._facadeLocation.conut$.pipe(
    map((x) => {
      return x;
    })
  );
  requestCount$ = this._facadeRequest.conut$.pipe(
    map((x) => {
      return x;
    })
  );
  technicianCount$ = this._facadeTechnician.conut$.pipe(
    map((x) => {
      return x;
    })
  );
  constructor(
    private _facadeRequest: ServiceShopRequestFacade,
    private _facadeJobCard: ServiceShopJobCardFacade,
    private _facadeTechnician: ServiceShopTechnicianFacade,
    private _facadeLocation: ServiceShopLocationFacade,
    private router: Router
  ) { }

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
        this.router.navigate(['workshop/service-shop/add-job-card'], {
          queryParams: { id: 'jobcardTab' }
        });
        break;
      case 'technicianTab':
        this.router.navigate(['workshop/service-shop/add-technician'], {
          queryParams: { id: 'technicianTab' }
        });
        break;
      case 'locationTab':
        this.router.navigate(['workshop/service-shop/add-location'], {
          queryParams: { id: 'locationTab' }
        });
        break;
      default:
        this.router.navigate(['workshop/service-shop/add-request']);
        break;
    }
  }
  exportTable() {
    let filter;
    switch (this.selectedTab) {
      case 'requestTab':
        filter = {
          asset: 'asset.assetName|asset.assetSubName',
          plateNumber: 'plateNumber',
          department: 'department',
          operatorName: 'operatorName',
          assetTypeName: 'assetTypeName',
          numberOfActiveRequests: 'numberOfActiveRequests'
        };
        this.table.exportTable(this.table1Setting, 'Service Shop - Request Tab', filter);
        break;
      case 'jobcardTab':
        filter = {
          asset: 'asset.assetSubName',
          startDate: 'startDate',
          endDate: 'endDate',
          location: 'location',
          cost: 'cost',
          technician: 'technician'
        };
        this.table.exportTable(this.table2Setting, 'Service Shop - JobCard Tab', filter);
        break;
      case 'technicianTab':
        filter = {
          technician: 'technician.firstName|technician.lastName',
          skill: 'skill',
          status: 'status',
          tasks: 'tasks',
          information: 'information.email|information.phoneNumber',
          ratePerHour: 'ratePerHour'
        }
        this.table.exportTable(this.table3Setting, 'Service Shop - Technician Tab', filter);
        break;
      case 'locationTab':
        filter = {
          locationId: 'locationId',
          service: 'service',
          address: 'address',
          jobCard: 'jobCard',
          technician: 'technician',
          capacity: 'capacity'
        }
        this.table.exportTable(this.table4Setting, 'Service Shop - Location Tab', filter);
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

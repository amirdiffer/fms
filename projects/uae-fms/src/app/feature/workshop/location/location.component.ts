import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnType, TableSetting } from '@core/table';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BodyShopLocationFacade } from '../+state/body-shop/location';
import { ServiceShopLocationFacade } from '../+state/service-shop/location';
import { FilterType } from '@core/table/table.component';

@Component({
  selector: 'anms-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  downloadBtn = 'assets/icons/download-solid.svg';
  showCustomFilter = false;
  filtersColumns = [];
  bodyshop = [];
  serviceshop = [];

  locationData = new Subject();
  locationData$ = this.locationData.asObservable();

  tableSetting: TableSetting = {
    name: 'workshop_location',
    columns: [
      {
        lable: 'tables.column.location_id',
        field: 'locationId',
        filterApiKey: 'id'
      },
      {
        lable: 'tables.column.services',
        field: 'service',
        type: ColumnType.lable
      },
      {
        lable: 'tables.column.address',
        field: 'address',
        type: ColumnType.lable,
        filterApiKey: 'address'
      },
      {
        lable: 'tables.column.job_card',
        field: 'jobCard',
        type: ColumnType.lable,
        sortable: true
      },
      {
        lable: 'tables.column.technician',
        field: 'technician',
        type: ColumnType.lable,
        sortable: true
      },
      {
        lable: 'tables.column.type',
        field: 'type',
        type: ColumnType.lable,
        sortable: true,
        filterApiKey: 'shopType',
        filterType: FilterType.status
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
            this.bodyshopFacadeLocation.resetParams();
            this.serviceshopFacadeLocation.resetParams();
            this.router.navigate([
              '/workshop/location/edit-location/' +
                data.type.replace(' ', '-').toLowerCase() +
                '/' +
                data.id
            ]);
          },
          permission: [
            'WORKSHOP_BODY_SHOP_LOCATION_UPDATE',
            'WORKSHOP_SERVICE_SHOP_LOCATION_UPDATE'
          ]
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

  constructor(
    private bodyshopFacadeLocation: BodyShopLocationFacade,
    private serviceshopFacadeLocation: ServiceShopLocationFacade,
    private router: Router
  ) {
    this.locationData.next([]);
  }

  ngOnInit(): void {
    this.setFiltersColumns();
    this.bodyshopFacadeLocation.bodyShop$
      .pipe(
        map((x) => {
          return x.map((y) => {
            return {
              ...y,
              locationId: y.locationThirdPartyId,
              service: y.services.join(','),
              address: y.address,
              type: 'Body Shop',
              jobCard: y.numOfJobCards,
              technician: y.numOfTechnicians,
              capacity: y.capacity
            };
          });
        })
      )
      .subscribe((x) => {
        this.bodyshop = x;
        this.locationData.next([...this.bodyshop, ...this.serviceshop]);
      });

    this.serviceshopFacadeLocation.serviceShop$
      .pipe(
        map((x) => {
          return x.map((y) => {
            return {
              ...y,
              locationId: y.locationThirdPartyId,
              service: y.services.join(','),
              address: y.address,
              type: 'Service Shop',
              jobCard: y.numOfJobCards,
              technician: y.numOfTechnicians,
              capacity: y.capacity
            };
          });
        })
      )
      .subscribe((x) => {
        this.serviceshop = x;
        this.locationData.next([...this.bodyshop, ...this.serviceshop]);
      });
  }

  eventPagination_location() {}

  addClicked($event) {
    this.router.navigate(['workshop/location/add-location']);
  }

  exportTable() {}

  setFiltersColumns() {
    let removeField = ['service', 'technician', 'jobCard'];
    let filtersColumns = Object.values({ ...this.tableSetting.columns });
    let addition = [];
    filtersColumns = filtersColumns.concat(addition);
    this.filtersColumns = filtersColumns.filter(
      (x) => !removeField.includes(x['field'])
    );
  }

  customFilterEvent(data: object[]) {
    this.bodyshopFacadeLocation.loadAll();
    this.serviceshopFacadeLocation.loadAll();
  }
}

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ColumnDifinition } from '@core/table';
import { FilterType } from '@core/table/table.component';
import { TableFacade } from '@core/table/+state/table.facade';
import {
  AssetTypeFacade,
  AssetTypeService
} from '@feature/configuration/+state/fleet-configuration/asset-type';
import { map } from 'rxjs/operators';
import { SubAssetTypeService } from '@feature/configuration/+state/fleet-configuration/sub-asset-type';
import { SubAssetService } from '@feature/fleet/+state/sub-asset';
import { TableFilterService } from '@core/table/table-filter/table-filter.service';
import { OrganizationService } from '@feature/fleet/+state/organization';
import { OperatorService } from '@feature/fleet/+state/operator';
import { BusinessCategoryService } from '@feature/configuration/+state/business-category';
import { RolePermissionService } from '@feature/configuration/+state/role-permission';
import { AssetsService } from '@feature/fleet/assets/assets.service';
import { AssetSearchThroughService } from '@feature/fleet/+state/assets/search-through';
import { UsersService } from '@feature/configuration/+state/users';
import {
  BodyShopLocationService,
  ServiceShopLocationService
} from '@feature/workshop/+state';

@Component({
  selector: 'anms-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss']
})
export class TableFilterComponent implements OnInit {
  @Input() entity: string;
  @Input() show = false;
  @Input() columns: ColumnDifinition[] = [];
  @Output() customFilterEvent = new EventEmitter<object[]>();

  allColumns = [];

  filterType = FilterType;

  keyLocalStorage = 'custom_filter';

  items = [];
  customizeFilter = [];
  customizeFilterBox_show = false;

  itemsBoolean = [
    { name: 'Yes', id: true },
    { name: 'No', id: false }
  ];

  constructor(
    private _subAssetTypeService: SubAssetTypeService,
    private _assetService: AssetSearchThroughService,
    private _subAssetService: SubAssetService,
    private _assetTypeService: AssetTypeService,
    private _organizationService: OrganizationService,
    private _operatorService: OperatorService,
    private _bodyShopLocationService: BodyShopLocationService,
    private _serviceShopLocationService: ServiceShopLocationService,
    private _rolePermissionService: RolePermissionService,
    private _usersService: UsersService,
    private _businessCategoryService: BusinessCategoryService,
    private tableFacade: TableFacade,
    private _tblFilterService: TableFilterService
  ) {}

  getAllColumns(): object[] {
    let data = this.columns.map((y) => {
      this.apiCall(y?.filterApiKey, y?.filterType);
      return {
        lable: y.lable,
        name: y.field,
        filterType: y?.filterType,
        filterApiKey: y?.filterApiKey,
        value: ''
      };
    });
    return data;
  }

  ngOnInit(): void {
    this.tableFacade.initialFilters(this.entity);
    this.allColumns = this.getAllColumns();
    this.hiddenFilterBox();
    if (this.getSavedDataFilter().length > 0 && this.entity) {
      let columns = this.getSavedDataFilter();
      columns = (<Array<object>>columns).filter(
        (x) => x['name'] == this.entity
      )[0]['value'];
      this.items = (<Array<object>>columns)
        .map((x) => {
          return {
            ...x,
            lable: x['lable'],
            name: x['name'],
            value: x['value']
          };
        })
        .filter((x) => x['lable'] != '');
    } else {
      this.items = this.columns
        .map((x) => {
          return {
            ...x,
            lable: x.lable,
            name: x.field,
            value: ''
          };
        })
        .filter((x) => x.lable != '');
    }
    this.allColumns = this.items;
    this.showColumns = this.items.map((x) => x.name);
    this.updateColumn();
    this.applyFilter();
  }

  showColumns = [];
  updateColumn(e?) {
    if (e) {
      let column = e.target.id;
      if (this.showColumns.includes(column)) {
        let index = this.showColumns.indexOf(column);
        if (index > -1) {
          this.showColumns.splice(index, 1);
        }
      } else {
        this.showColumns.push(column);
      }
    }

    this.customizeFilter = this.allColumns
      .map((x) => {
        let setValue = () => {
          if (x?.filterType == FilterType.range_date) {
            return this._tblFilterService.convertDate(x?.value);
          }
          return x?.value;
        };
        return {
          lable: x.lable,
          name: x.name,
          filterType: x?.filterType,
          filterApiKey: x?.filterApiKey,
          value: setValue()
        };
      })
      .filter((x) => {
        if (this.showColumns.includes(x.name) && x.lable != '') return x;
      });
  }

  applyFilter() {
    console.log(this.customizeFilter);
    this.tableFacade.setFilters(
      this.entity,
      JSON.parse(JSON.stringify(this.customizeFilter))
    );
    this.customFilterEvent.emit(this.customizeFilter);
  }

  saveFilter() {
    if (this.entity) {
      if (this.getSavedDataFilter().length > 0) {
        let allFiltersComponent = this.getSavedDataFilter();
        let data = (<Array<object>>allFiltersComponent).filter(
          (x) => x['name'] == this.entity
        );
        let withoutEntity = (<Array<object>>this.getSavedDataFilter()).filter(
          (x) => x['name'] != this.entity
        );
        let arr = [...withoutEntity];
        if (data.length) {
          data[0]['value'] = this.customizeFilter;
          arr = arr.concat(data);
        } else {
          arr = arr.concat([
            {
              name: this.entity,
              value: this.customizeFilter
            }
          ]);
        }
        localStorage.setItem(this.keyLocalStorage, JSON.stringify(arr));
      } else {
        let arr = [
          {
            name: this.entity,
            value: this.customizeFilter
          }
        ];
        localStorage.setItem(this.keyLocalStorage, JSON.stringify(arr));
      }
    } else {
      console.error('entity not fined');
    }
  }

  getSavedDataFilter() {
    let data = localStorage.getItem(this.keyLocalStorage);
    if (data) {
      return JSON.parse(data);
    } else return [];
  }

  clearFilter() {
    if (this.getSavedDataFilter().length > 0 && this.entity) {
      let allFiltersComponent = this.getSavedDataFilter();
      let data = (<Array<object>>allFiltersComponent).filter(
        (x) => x['name'] != this.entity
      );
      localStorage.setItem(this.keyLocalStorage, JSON.stringify(data));
    }
    this.items.forEach((x) => (x.value = ''));
    this.showColumns = this.allColumns.map((x) => x.name);
    this.updateColumn();
  }

  checkedColumn(col): boolean {
    if (this.entity && this.getSavedDataFilter().length > 0) {
      return this.items.filter((x) => x.name == col).length > 0;
    } else return true;
  }

  hiddenFilterBox() {
    window.addEventListener('click', (e) => {
      let cus = document.getElementById('customizeFilterBox-show__button');
      if (
        cus.id != e.target['id'] &&
        !document
          .getElementById('customizeFilterBox-show__box')
          .contains(<HTMLElement>e.target)
      ) {
        this.customizeFilterBox_show = false;
      }
    });
  }

  searchInputList: object = {};
  searchInputFiltered: object = {};
  searchInput(event, inputName: string) {
    let query = event.query;
    let filtered = [];
    if (this.searchInputList[inputName].length) {
      for (
        let index = 0;
        index < this.searchInputList[inputName].length;
        index++
      ) {
        let items = this.searchInputList[inputName][index];
        if (items.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(items);
        }
      }
      this.searchInputFiltered[inputName] = filtered;
    }
  }

  searchInputChanged(event, inputName: string) {
    switch (inputName) {
      case 'type':
      case 'sub-asset-type': {
        if (this.entity == 'sub-asset') {
          this.searchInputList['MakeName'] = event.makes;
        }
        this.searchInputList['make'] = event.makes;
        break;
      }
      case 'make':
      case 'MakeName': {
        if (this.entity == 'sub-asset') {
          this.searchInputList['model'] = event.models;
        }
        break;
      }
      case 'organization': {
        this.searchInputList['department'] = event.departments;
        break;
      }
    }

    if (!event.id) return;

    this.customizeFilter = this.customizeFilter.map((x) => {
      if (x.filterApiKey == inputName) {
        return {
          ...x,
          value: event
        };
      }
      return x;
    });
  }

  fillSearchInput(key, data) {
    this.searchInputList[key] = data;
    this.searchInputFiltered[key] = data;
  }

  apiCall(key, type): void {
    if (
      type == this.filterType.list ||
      type == this.filterType.checkbox_list ||
      type == this.filterType.status
    ) {
      this.searchInputList[key] = [];
      this.searchInputFiltered[key] = [];
    }
    if (type == this.filterType.status) {
      this.fillSearchInput(key, this.statusList(key));
    }
    switch (key) {
      case 'sub-asset-type': {
        this._subAssetTypeService.loadAll().subscribe((x) => {
          this.fillSearchInput(key, x.message);
        });
        break;
      }
      case 'asset': {
        this._assetService.loadAvailableAsset().subscribe((x) => {
          let data = x.message.map((y) => {
            return {
              ...y,
              name: y.dpd
            };
          });
          this.fillSearchInput(key, data);
        });
        break;
      }
      case 'policyType': {
        this._subAssetService.getPolicyTypes().subscribe((x) => {
          this.fillSearchInput(key, x.message);
        });
        break;
      }
      case 'assetConfiguration':
      case 'type': {
        if (
          this.entity == 'assetMaster' ||
          this.entity == 'pendingRegistration' ||
          this.entity == 'pendingCustomization' ||
          this.entity == 'movement_permanent_request' ||
          this.entity == 'movement_temporary_request' ||
          this.entity == 'partList' ||
          this.entity == 'serviceShop_request' ||
          this.entity == 'bodyShop_request'
        ) {
          this._assetTypeService.loadAll().subscribe((x) => {
            this.fillSearchInput(key, x.message);
          });
        }
        break;
      }
      case 'businessCategory': {
        this._businessCategoryService.loadAll().subscribe((x) => {
          this.fillSearchInput(key, x.message);
        });
        break;
      }
      case 'organization': {
        this._organizationService.loadAll().subscribe((x) => {
          let data = x.message.map((y) => {
            return {
              ...y,
              name: y.organizationName
            };
          });
          this.fillSearchInput(key, data);
        });
        break;
      }
      case 'operator': {
        this._operatorService.loadAll().subscribe((x) => {
          let data = x.message.map((y) => {
            return {
              ...y,
              name: y.firstName + ' ' + y.lastName
            };
          });
          this.fillSearchInput(key, data);
        });
        break;
      }
      case 'location': {
        if (this.entity == 'bodyShop_jobCard') {
          this._bodyShopLocationService.loadAll().subscribe((x) => {
            this.fillSearchInput(key, x.message);
          });
        } else if (this.entity == 'serviceShop_jobCard') {
          this._serviceShopLocationService.loadAll().subscribe((x) => {
            this.fillSearchInput(key, x.message);
          });
        }

        break;
      }
      case 'roles': {
        this._rolePermissionService.loadAll().subscribe((x) => {
          let data = x.message.map((y) => {
            return {
              ...y,
              name: y.roleName,
              id: y.roleId
            };
          });
          this.fillSearchInput(key, data);
        });
        break;
      }
      case 'userName':
      case 'requester': {
        this._usersService.loadAll().subscribe((x) => {
          let data = x.message.map((y) => {
            return {
              ...y,
              name: y.userName
            };
          });
          this.fillSearchInput(key, data);
        });
        break;
      }
      default: {
      }
    }
  }

  statusList(key): object[] {
    switch (this.entity) {
      case 'movement_temporary_request':
      case 'movement_permanent_request': {
        if (key == 'movementType')
          return [
            { id: 'PERMANENT', name: 'PERMANENT' },
            { id: 'TEMPORARY', name: 'TEMPORARY' }
          ];
        else if (key == 'requestType')
          return [
            { id: 'NEW', name: 'NEW' },
            { id: 'REPLACEMENT', name: 'REPLACEMENT' }
          ];
        else if (key == 'status')
          return [{ id: 'REQUESTED', name: 'REQUESTED' }];
        break;
      }
      case 'workshop_location': {
        if (key == 'shopType')
          return [
            { id: 'body-shop', name: 'Body Shop' },
            { id: 'service-shop', name: 'Service Shop' }
          ];
        break;
      }
      case 'users':
      case 'businessCategory': {
        if (key == 'isActive')
          return [
            { id: true, name: 'Active' },
            { id: false, name: 'Inactive' }
          ];
        if (key == 'status')
          return [
            { id: true, name: 'Active' },
            { id: false, name: 'Inactive' }
          ];
        break;
      }
      case 'partStore_request':
      case 'partStore_order': {
        if (key == 'status')
          return [
            { id: 'JUST_REGISTERED', name: 'JUST_REGISTERED' },
            { id: 'RECEIVED', name: 'RECEIVED' },
            { id: 'ARCHIVED', name: 'ARCHIVED' }
          ];
        break;
      }
      case 'ownership': {
        if (key == 'type')
          return [
            { id: 'EXTERNAL', name: 'External' },
            { id: 'RENT', name: 'Rent' },
            { id: 'DEMO', name: 'Demo' },
            { id: 'OWNED', name: 'Owned' }
          ];
      }
    }
    return [];
  }
}

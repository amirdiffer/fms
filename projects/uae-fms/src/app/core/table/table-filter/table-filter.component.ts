import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ColumnDifinition } from '@core/table';
import { FilterType } from '@core/table/table.component';
import { TableFacade } from '@core/table/+state/table.facade';
import { AssetTypeFacade } from '@feature/configuration/+state/fleet-configuration/asset-type';
import { map } from 'rxjs/operators';
import { SubAssetTypeService } from '@feature/configuration/+state/fleet-configuration/sub-asset-type';
import { SubAssetService } from '@feature/fleet/+state/sub-asset';

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
    private _subAssetService: SubAssetService,
    private tableFacade: TableFacade
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
            lable: x['lable'],
            name: x['name'],
            value: ''
          };
        })
        .filter((x) => x['lable'] != '');
    } else {
      this.items = this.columns
        .map((x) => {
          return {
            lable: x.lable,
            name: x.field,
            value: ''
          };
        })
        .filter((x) => x.lable != '');
    }
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
        return {
          lable: x.lable,
          name: x.name,
          filterType: x?.filterType,
          filterApiKey: x?.filterApiKey,
          value: ''
        };
      })
      .filter((x) => {
        if (this.showColumns.includes(x.name) && x.lable != '') return x;
      });
  }

  applyFilter() {
    console.log(JSON.parse(JSON.stringify(this.customizeFilter)));
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
        !cus &&
        !cus.contains(<HTMLElement>e.target) &&
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
      case 'sub-asset-type': {
        if (this.entity == 'sub-asset') {
          this.searchInputList['MakeName'] = event.makes;
          this.customizeFilter = this.customizeFilter.map((x) => {
            console.log(event);
            if (x.name == 'sub-asset-type') {
              return {
                ...x,
                value: event
              };
            }
            return x;
          });
        }
        break;
      }
      case 'MakeName': {
        if (this.entity == 'sub-asset') {
          this.searchInputList['model'] = event.models;
        }
        break;
      }
      default: {
      }
    }
  }

  apiCall(key, type): void {
    if (type == this.filterType.list || type == this.filterType.checkbox_list) {
      this.searchInputList[key] = [];
      this.searchInputFiltered[key] = [];
    }
    switch (key) {
      case 'sub-asset-type': {
        if (this.entity == 'sub-asset') {
          this._subAssetTypeService.loadAll().subscribe((x) => {
            this.searchInputList['sub-asset-type'] = x.message;
            this.searchInputFiltered['sub-asset-type'] = x.message;
          });
        }
        break;
      }
      case 'policyType': {
        this._subAssetService.getPolicyTypes().subscribe((x) => {
          this.searchInputList[key] = x.message;
          this.searchInputFiltered[key] = x.message;
        });
        break;
      }
      default: {
      }
    }
  }
}

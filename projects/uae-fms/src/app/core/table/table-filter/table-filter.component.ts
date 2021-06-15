import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ColumnDifinition } from '@core/table';

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

  keyLocalStorage = 'custom_filter';

  items = [];
  customizeFilter = [];
  customizeFilterBox_show = false;

  constructor() {}

  getAllColumns(): object[] {
    let data = this.columns.map((y) => {
      return {
        lable: y.lable,
        name: y.field,
        value: ''
      };
    });
    // if ((<Array<object>>this.getSavedDataFilter()).length)
    //   return data.concat((<Array<object>>this.getSavedDataFilter()).filter(x => x['name'] == this.entity)[0]['value']);
    // else
    return data;
  }

  ngOnInit(): void {
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
          value: ''
        };
      })
      .filter((x) => {
        if (this.showColumns.includes(x.name) && x.lable != '') return x;
      });
  }

  applyFilter() {
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
}
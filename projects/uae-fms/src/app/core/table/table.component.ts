import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
  AfterViewInit,
  Renderer2
} from '@angular/core';
import { environment } from '@environments/environment';
import { SortEvent } from 'primeng/api';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { SettingsFacade } from '@core/settings/settings.facade';
import { Observable, Subscription, TimeInterval } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { TableFacade } from '@core/table/+state/table.facade';
import { ITablePagination } from '@core/table/+state/table.entity';
import { ofType } from '@ngrx/effects';
import { TableServiceS } from '@core/table/table.service';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { CSVExport } from '@core/export';
import { CSVExportColumn } from '@core/export/csv.component';
import { ColumnRendererComponent } from '@core/table/column-renderer-component/column-renderer.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy, AfterViewInit {
  baseFileServer = environment.baseFileServer;
  rowIndexTable = -1;
  activeLang: string;
  activePage: number;
  @Input() ipp = 10;
  @Input() setting: TableSetting;
  @Input() tableData: Observable<any>;
  count: number;
  @Input() pagination: string;
  @Input() showPagination: boolean = true;
  arrowIcon = 'assets/icons/arrow-down.svg';
  subscribePagination$: Subscription;
  pagesCount: number;
  @Output() onSelectItems = new EventEmitter();
  @Output() onPagination = new EventEmitter();
  selectedIds = [];
  initialSearchBox = false;
  @Input() searchInput: string = '';
  @Output() onSearch = new EventEmitter();
  @Input() subTable: TableSetting;
  dropdownItemSelected = null;
  @Output() selectedSubTable: EventEmitter<number> = new EventEmitter<number>();
  @Output() customFilterEvent: EventEmitter<object[]> = new EventEmitter<
    object[]
  >();
  @Input() showCustomFilter = false;
  @Input() filtersColumns = [];

  allData = [];
  currentContext;
  constructor(
    private settingFacade: SettingsFacade,
    private translate: TranslateService,
    private _tableFacade: TableFacade,
    private _tableService: TableServiceS,
    private renderer: Renderer2
  ) {
    this.currentContext = this;
  }

  getSearchBoxData() {
    this._tableService.getSearchBoxData(this.searchInput).subscribe((x) => {
      this.initialSearchBox = true;
      this.searchText = x;
      this.filterBySearchBox();
    });
  }

  ngOnInit() {
    if (this.pagination) {
      this.initialPagination();
    }
    this.settingFacade.language.subscribe((lang) => {
      this.activeLang = lang;
    });

    if (this.tableData)
      this.tableData?.subscribe((x) => {
        !this.initialSearchBox ? this.getSearchBoxData() : null;
        if (x) {
          this.allData = x;
          this.setting.data = x;
        }
      });
  }

  getCol(col, data) {
    if (col.type) {
      switch (col.type) {
        case 1:
          return data[col.field];
        // case 2: {
        //   return data[col.thumbField]
        //     ? `<div class='d-inline-flex cell-with-image'><img class='thumb' src='${
        //       col.override
        //         ? 'assets/' + col.override
        //         : '/fms-api/document/' + data[col.thumbField]
        //         // : environment.baseFileServer + data[col.thumbField]
        //     }'> <p class='text-of-cell-with-image'>${
        //       data[col.field]
        //     }</p></div>`
        //     : data[col.field];
        // }
        case 3:
          return data[col.thumbField]
            ? `<img class='thumb' src='${
                '/fms-api/document/' + data[col.thumbField]
              }'>`
            : '';
      }
    } else {
      return data[col.field];
    }
  }

  click(col: ColumnDifinition, data: any) {
    if (this.setting.rowSettings?.onClick instanceof Function)
      this.setting.rowSettings.onClick(col, data);
  }

  rowIsHover(Index: number) {
    this.rowIndexTable = Index;
  }

  foundStatusColor(data) {
    for (let element of data) {
      if (element.statusColor) return true;
    }
    return false;
  }

  hasRendere(columns: ColumnDifinition[]): boolean {
    for (let col of columns) {
      if (col.renderer) return true;
    }
    return false;
  }

  handleSort(event: SortEvent, tableSetting: TableSetting) {
    event.data.sort((data1, data2) => {
      const value1 = data1[event.field];
      const value2 = data2[event.field];
      let result: number;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string') {
        result = value1.localeCompare(value2);
      } else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      tableSetting.columns.map((col) => {
        if (col.field === event.field) {
          col.isAsc = event.order === 1;
        }
      });

      return event.order * result;
    });
  }

  getText(key: string, obj) {
    let selectionArray = key.split('.');
    selectionArray.forEach((key) => {
      obj = obj[key];
    });
    return obj;
  }

  exportTable(
    tableSetting: TableSetting,
    title: string,
    filter?: object
  ): void {
    const exportColumns: CSVExportColumn[] = tableSetting.columns
      .filter((x) => !x.isIconLable)
      .map((col) => {
        return {
          title:
            col.lable && this.translate.instant(col.lable)
              ? this.translate.instant(col.lable)
              : col.lable,
          field: col.field
        };
      });

    const exportRows: any[] = tableSetting.data.map((data) => {
      let objKey = Object.keys(filter);
      let dataKey = Object.keys(data);
      let map = new Map();
      objKey.forEach((x) => {
        let func = [];
        let columnMultiData = [];
        if (typeof filter[x] == 'string') {
          columnMultiData = (<string>filter[x]).split('|');
          func = (<string>filter[x]).split('?func:');
        }
        columnMultiData.forEach((y) => {
          let hasFunc = false;
          let returnedFunc: string;
          if (func.length == 2) {
            hasFunc = true;
            let f = filter[func[1]];
            returnedFunc = f(this.getText(func[0], data));
          }
          if ((<string>y).includes('.')) {
            if (map.has(x)) {
              map.set(x, map.get(x) + ' ' + this.getText(y, data));
            } else {
              map.set(x, this.getText(y, data));
            }
          } else {
            if (dataKey.includes(y)) {
              if (map.has(x)) {
                map.set(x, map.get(x) + ' ' + data[y]);
              } else {
                map.set(x, data[y]);
              }
            } else {
              if (map.has(x)) {
                map.set(x, map.get(x) + ' ' + y);
              } else {
                map.set(x, hasFunc ? returnedFunc : y);
              }
            }
          }
        });
      });
      let d = Array.from(map).reduce(
        (obj, [key, value]) => Object.assign(obj, { [key]: value }),
        {}
      );
      return d;
    });

    // tableSetting.columns.map((col) => {
    //   if (title === 'assetMasterTab') {
    //     if (col.renderer === 'assetsRenderer') {
    //       exportRows.map((data) => {
    //         data[col.field] = `${data[col.field].assetName}\n${data[col.field].assetSubName
    //           }\n${data[col.field].ownership}`;
    //       });
    //     }
    //   }
    //   if (title === 'pendingRegistrationTab') {
    //     if (col.renderer === 'assetsRenderer') {
    //       exportRows.map((data) => {
    //         data[col.field] = `${data[col.field].assetName}\n${data[col.field].assetSubName
    //           }\nprogress: ${data[col.field].progress}/6`;
    //       });
    //     }
    //   }
    //   if (title === 'pendingCustomizationTab') {
    //     if (col.renderer === 'assetsRenderer') {
    //       exportRows.map((data) => {
    //         data[col.field] = `${data[col.field].assetName}\n${data[col.field].assetSubName
    //           }\nprogress: ${data[col.field].progress}/6`;
    //       });
    //     }
    //   }
    // });

    new CSVExport(exportRows, { columns: exportColumns }).export(title, title);

    /* const pdf = new jsPDF('p', 'pt', 'a4');
    pdf.text(title, 20, 20);

    autoTable(pdf, {
      columns: exportColumns,
      body: exportRows,
      columnStyles: { 0: { cellWidth: 100 } }
    });

    pdf.save(`${title}.pdf`); */
  }
  isNumber(val): boolean {
    return typeof val === 'number';
  }

  showButton(col, i): boolean {
    if (col.showOnHover)
      return col.renderer == 'button' && i == this.rowIndexTable;
    else return col.renderer == 'button';
  }

  selectedTRS = [];
  selectTR(data) {
    if (data[0] == 'open') {
      this.selectedTRS.push(data[1]);
    } else {
      this.selectedTRS = this.selectedTRS.filter((x) => x != data[1]);
    }
  }
  isSelected(index): boolean {
    return this.selectedTRS.includes(index);
  }

  lastIpp = 0;
  initialPagination() {
    let i = 0;
    this.subscribePagination$ = this._tableFacade
      .getPaginationByName(this.pagination)
      .subscribe((x) => {
        x['count'] ? (this.count = x['count']) : null;
        if (
          x != null &&
          (this.activePage != x['page'] || this.lastIpp != x['ipp'])
        ) {
          i++;
          this.activePage = x['page'];
          this.ipp = x['ipp'];
          this.lastIpp = this.ipp;
          i > 1 ? this.onPagination.emit() : null;
        }
      });
  }

  paginationEvent(action) {
    switch (action) {
      case 'next': {
        this._tableFacade.next(this.pagination);
        break;
      }
      case 'previous': {
        this._tableFacade.previous(this.pagination);
        break;
      }
      case 'rowCount': {
        this._tableFacade.rowCount(this.ipp, this.pagination);
        break;
      }
      case 'count': {
        this._tableFacade.count(this.count, this.pagination);
        break;
      }
    }
  }

  trackingShowRow(): string {
    this.pagesCount =
      this.count > this.ipp ? Math.ceil(this.count / this.ipp) - 1 : 0;
    let leftOver = this.count % this.ipp;
    let start = this.activePage * this.ipp;
    let end = start + this.ipp;
    leftOver > 0 && this.pagesCount == this.activePage
      ? (end = end - this.ipp + leftOver)
      : null;

    if (!isNaN(start) && !isNaN(end)) {
      return `${start}-${end}`;
    }
    return '';
  }

  searchText = '';

  filterBySearchBox() {
    let data = this.allData.filter((x) => {
      let find = JSON.stringify(x)
        .toLocaleLowerCase()
        .includes(this.searchText.toLocaleLowerCase());
      if (find) return x;
    });
    this.setting.data = data;
  }

  filterByStatistics(statistic: string): void {
    switch (statistic) {
      case 'total':
        break;
      case 'active':
        break;
    }
  }

  changeItemDropdownSelected(obj) {
    let data = Object.values(obj);
    this.dropdownItemSelected = data[1];
    this.selectedSubTable.emit(<number>data[0]);
  }

  ngOnDestroy(): void {
    if (this.pagination) {
      this.subscribePagination$.unsubscribe();
    }
  }

  ngAfterViewInit(): void {}

  updatedSelectedIds(data, field) {
    if (data[field].checkbox) this.selectedIds.push(data.id);
    else {
      let index = this.selectedIds.findIndex((x) => x == data.id);
      this.selectedIds.splice(index, 1);
    }
    this.onSelectItems.emit(this.selectedIds);
  }

  customFilter(e) {
    this.customFilterEvent.emit(e);
  }
}

export interface TableSetting {
  columns: ColumnDifinition[];
  rows?: RowDefinition[];
  data?: any[];
  rowSettings?: RowSettings;
  name?: string;
}

export interface ColumnDifinition {
  lable: string;
  isIconLable?: boolean;
  sortable?: boolean;
  isAsc?: boolean;
  field?: string;
  width?: any;
  type?: ColumnType;
  thumbField?: string;
  override?: string;
  renderer?: string;
  rendererOptions?: RendererOptions;
  buttonType?: ButtonType;
  showOnHover?: boolean;
  textColor?: string;
  onClick?: Function;
  hasJobCardButton?: boolean;
  hasPadding5?: boolean;
  hasPadding3?: boolean;
  isHeaderHidden?: boolean;
  hasExpandedInfo?: boolean;
  filterType?: FilterType;
  filterApiKey?: string;
}

export interface RowDefinition {
  foldableRowOption: FoldableRowOptions | undefined;
}

export enum ColumnType {
  lable = 1,
  labelWithThumb = 2,
  thumb = 3
}

export interface RowSettings {
  onClick?: Function;
  floatButton?: FloatButtonType[];
  renderer?: String;
  rendererOptions?: RendererOptions;
}

export interface FoldableRowOptions {
  isFolded?: boolean;
  foldableData?: any[];
}

export interface RendererOptions {
  condition?: Function;
  color?: string;
  line1?: string;
  line2?: string;
  type?: string;
}

export enum ButtonType {
  add,
  action,
  makeDecision,
  jobCard,
  reject,
  orderListReject,
  approve,
  confirm,
  receive,
  receiveAndEdit,
  playAndPause
}


export enum FilterType {
  list = 'list',
  checkbox_list = 'checkbox_list',
  date = 'date',
  range_date = 'range_date',
  number = 'number',
  string = 'string',
  boolean = 'boolean'
}

export interface FloatButtonType {
  button: string;
  color?: string;
  tooltip?: string;
  onClick?: Function;
  condition?: Function;
  permission?: string[];
}

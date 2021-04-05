import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { SortEvent } from 'primeng/api';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { SettingsFacade } from '@core/settings/settings.facade';
import { Observable, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { TableFacade } from '@core/table/+state/table.facade';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, OnDestroy {
  rowIndexTable = -1;
  activeLang: string;
  activePage: number;
  @Input() ipp = 50;
  @Input() setting: TableSetting;
  @Input() tableData: Observable<any>;
  @Input() count: number;
  @Input() pagination: string;
  arrowIcon = 'assets/icons/arrow-down.svg';
  subscribePagination$: Subscription
  pagesCount: number;

  constructor(
    private settingFacade: SettingsFacade,
    private changeDetection: ChangeDetectorRef,
    private translate: TranslateService,
    private _tableFacade: TableFacade
  ) { }


  ngOnInit() {
    if (this.pagination && this.count) {
      this.paginationEvent('rowCount');
      this.paginationEvent('count');
      this.subscribePagination$ = this._tableFacade.getPaginationByName(this.pagination).subscribe(x => {
        this.activePage = x['page'];
      });
    }
    this.settingFacade.language.subscribe((lang) => {
      this.activeLang = lang;
    });

    this.tableData?.subscribe(x => {
      console.log(x)
      this.setting.data = x;
      this.changeDetection.detectChanges();
    })
  }

  getCol(col, data) {
    if (col.type) {
      switch (col.type) {
        case 1:
          return data[col.field];
        case 2:
          return data[col.thumbField]
            ? `<div class='d-inline-flex cell-with-image'><img class='thumb' src='${environment.baseFileServer + data[col.thumbField]
            }'> <p class='text-of-cell-with-image'>${data[col.field]
            }</p></div>`
            : data[col.field];
        case 3:
          return data[col.thumbField]
            ? `<img class='thumb' src='${environment.baseFileServer + data[col.thumbField]
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

  exportTable(tableSetting: TableSetting, title: string): void {
    const exportColumns = tableSetting.columns.map((col) => {
      /* if (col.thumbField?.length) {
        return;
      } */
      return { title: (col.lable && this.translate.instant(col.lable)) ? this.translate.instant(col.lable) : col.lable, dataKey: col.field };
    });

    const exportRows: any[] = tableSetting.data.map((data) => ({ ...data }));

    tableSetting.columns.map((col) => {
      if (title === 'assetMasterTab') {
        if (col.renderer === 'assetsRenderer') {
          exportRows.map((data) => {
            data[col.field] = `${data[col.field].assetName}\n${data[col.field].assetSubName
              }\n${data[col.field].ownership}`;
          });
        }
      }
      if (title === 'pendingRegistrationTab') {
        if (col.renderer === 'assetsRenderer') {
          exportRows.map((data) => {
            data[col.field] = `${data[col.field].assetName}\n${data[col.field].assetSubName
              }\nprogress: ${data[col.field].progress}/6`;
          });
        }
      }
      if (title === 'pendingCustomizationTab') {
        if (col.renderer === 'assetsRenderer') {
          exportRows.map((data) => {
            data[col.field] = `${data[col.field].assetName}\n${data[col.field].assetSubName
              }\nprogress: ${data[col.field].progress}/6`;
          });
        }
      }
    });

    const pdf = new jsPDF('p', 'pt', 'a4');
    autoTable(pdf, {
      columns: exportColumns,
      body: exportRows,
      columnStyles: { 0: { cellWidth: 100 } }
    });

    pdf.save(`${title}.pdf`);
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
    this.pagesCount = Math.ceil(this.count / this.ipp);
    let leftOver = this.count % this.ipp;
    let start = (this.activePage * this.ipp) - this.ipp;
    let end = start + this.ipp;
    (leftOver > 0 && this.pagesCount == this.activePage) ? end = (end - this.ipp) + leftOver: null;
    return `${start}-${end}`
  }

  ngOnDestroy(): void {
    if (this.pagination && this.count) {
      this.subscribePagination$.unsubscribe();
    }
  }

}

export interface TableSetting {
  columns: ColumnDifinition[];
  data?: any[];
  rowSettings?: RowSettings;
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
  renderer?: string;
  rendererOptions?: RendererOptions;
  buttonType?: ButtonType;
  showOnHover?: boolean;
  textColor?: string;
  onClick?: Function;
  hasJobCardButton?: boolean;
}

export enum ColumnType {
  lable = 1,
  labelWithThumb = 2,
  thumb = 3
}

export interface RowSettings {
  onClick?: Function;
  floatButton?: FloatButtonType[];
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
  receive
}

export interface FloatButtonType {
  button: string;
  color?: string;
  onClick?: Function;
}

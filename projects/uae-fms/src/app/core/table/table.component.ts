import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { SortEvent } from 'primeng/api';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  rowIndexTable = -1;

  constructor() {}
  @Input() setting: TableSetting;
  ngOnInit() {}

  getCol(col, data) {
    if (col.type) {
      switch (col.type) {
        case 1:
          return data[col.field];
        case 2:
          return data[col.thumbField]
            ? `<div class='d-inline-flex cell-with-image'><img class='thumb' src='${
                environment.baseFileServer + data[col.thumbField]
              }'> <p class='text-of-cell-with-image'>${
                data[col.field]
              }</p></div>`
            : data[col.field];
        case 3:
          return data[col.thumbField]
            ? `<img class='thumb' src='${
                environment.baseFileServer + data[col.thumbField]
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

  exportTable(): void {
    const exportColumns = this.setting.columns.map((col) => {
      if (col.thumbField?.length) {
        return;
      }
      return { title: col.lable, dataKey: col.field };
    });

    const exportRows: any[] = this.setting.data.map((data) => ({ ...data }));

    this.setting.columns.map((col) => {
      if (col.renderer === 'assetsRenderer') {
        exportRows.map((data) => {
          data[col.field] = `${data[col.field].assetName}\n${
            data[col.field].assetSubName
          }\n${data[col.field].ownership}`;
        });
      }
    });

    const pdf = new jsPDF('p', 'pt', 'a4');
    autoTable(pdf, {
      columns: exportColumns,
      body: exportRows,
      columnStyles: { 0: { cellWidth: 100 } }
    });

    pdf.save('angular-demo.pdf');
  }
  isNumber(val): boolean {
    return typeof val === 'number';
  }
}

export interface TableSetting {
  columns: ColumnDifinition[];
  data: any[];
  rowSettings?: RowSettings;
}

export interface ColumnDifinition {
  lable: string;
  isIconLable?: boolean;
  sortable?: boolean;
  isAsc?: boolean;
  field?: string;
  width?: number | string;
  type?: ColumnType;
  thumbField?: string;
  renderer?: string;
  textColor?: string;
  onClick?: Function;
}

export enum ColumnType {
  lable = 1,
  labelWithThumb = 2,
  thumb = 3
}

export interface RowSettings {
  onClick: Function;
}

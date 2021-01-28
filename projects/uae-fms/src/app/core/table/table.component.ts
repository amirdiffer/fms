import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  faSortDown = faSortDown;

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
            ? `<div class="d-inline-flex cell-with-image"><img class="thumb" src="${
                environment.baseFileServer + data[col.thumbField]
              }"> <p class="text-of-cell-with-image">${
                data[col.field]
              }</p></div>`
            : data[col.field];
        case 3:
          return data[col.thumbField]
            ? `<img class="thumb" src="${
                environment.baseFileServer + data[col.thumbField]
              }">`
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
  field?: string;
  width?: number;
  type?: ColumnType;
  thumbField?: string;
  renderer?: string;
  textColor?: string;
}

export enum ColumnType {
  lable = 1,
  labelWithThumb = 2,
  thumb = 3
}

export interface RowSettings {
  onClick: Function;
}

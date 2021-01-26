import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
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
            ? `<div class="d-inline-flex"><img class="thumb" src="${
                environment.baseFileServer + data[col.thumbField]
<<<<<<< HEAD
              }"> <p>${data[col.field]}</p></div>`
=======
              }"> <p class="text-of-cell-with-image">${
                data[col.field]
              }</p></div>`
>>>>>>> afe28c2c16b89bb238712bae5d9adaa74f5a6d3d
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
}

export interface TableSetting {
  columns: ColumnDifinition[];
  data: any[];
  rowSettings?: RowSettings;
}

export interface ColumnDifinition {
  lable: string;
  field?: string;
  width?: number;
  type?: ColumnType;
  thumbField?: string;
  renderer?: string;
}

export enum ColumnType {
  lable = 1,
  labelWithThumb = 2,
  thumb = 3
}

export interface RowSettings {
  onClick: Function;
}

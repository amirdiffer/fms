import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-fuel-card-table',
  templateUrl: './fuel-card-table.component.html',
  styleUrls: ['./fuel-card-table.component.scss']
})
export class FuelCardTableComponent implements OnInit, OnChanges {
  @Input() settings: FuelTableSettings;

  plusIcon = 'assets/media/plus_square.svg';

  faEllipsisV = faEllipsisV;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  ngOnChanges(): void {}

  clicked(index: number): void {
    const row = this.settings.data[index];

    if (row.isExpanded) {
      this.plusIcon = 'assets/media/plus_fill.svg';
      row.isExpanded = false;
    } else {
      this.plusIcon = 'assets/media/plus_square.svg';
      row.isExpanded = true;
    }
  }
}

export interface FuelTableSettings {
  columns: FuelCardTableColumnDefinition[];
  data: FuelCardTableData[];
  hasMenu?: boolean;
}

export interface FuelCardTableColumnDefinition {
  title: string;
  dataFieldKey: FuelDataType;
  isSortable?: boolean;
}

export interface FuelCardTableData {
  tagNo: string;
  used: string;
  usageLimit: string;
  asset: string;
  cardType: string;
  expireDate: string;
  rowSubData?: string[]; // TODO: to be changed later
  isExpanded: boolean;
}

export enum FuelDataType {
  tagNo = 'tagNo',
  used = 'used',
  usageLimit = 'usageLimit',
  asset = 'asset',
  cardType = 'cardType',
  expireDate = 'expireDate',
  rowSubData = 'rowSubData'
}

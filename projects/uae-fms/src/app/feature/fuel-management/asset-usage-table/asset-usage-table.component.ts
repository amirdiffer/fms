import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-asset-usage-table',
  templateUrl: './asset-usage-table.component.html',
  styleUrls: ['./asset-usage-table.component.scss']
})
export class AssetUsageTableComponent implements OnInit {
  @Input() settings: AssetUsageTableSettings;

  faEllipsisV = faEllipsisV;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  ngOnChanges(): void {}

  clicked(index: number): void {}
}

export interface AssetUsageTableSettings {
  columns: AssetUsageTableColumnDefinition[];
  data: AssetUsageTableData[];
  hasMenu?: boolean;
}

export interface AssetUsageTableColumnDefinition {
  title: string;
  dataFieldKey: AssetUsageDataType;
  isSortable?: boolean;
}

export interface AssetUsageTableData {
  asset: string;
  assetSubData: AssetFirstColumnDataModel;
  plateNumber: string;
  tagNo: string;
  date: string;
  amount: string;
  mileage: string;
  totalUsage: string;
  cost: string;
  cardType: string;
}

export interface AssetFirstColumnDataModel {
  dpdNumber: string;
  status: string;
  statusColor: string;
}

export enum AssetUsageDataType {
  asset = 'asset',
  dpdNumber = 'dpdNumber',
  status = 'status',
  statusColor = 'statusColor',
  plateNumber = 'plateNumber',
  tagNo = 'tagNo',
  date = 'date',
  amount = 'amount',
  mileage = 'mileage',
  totalUsage = 'totalUsage',
  cost = 'cost',
  cardType = 'cardType'
}

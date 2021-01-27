import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { faEllipsisV, faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'anms-fleet-status-asset-table',
  templateUrl: './fleet-status-asset-table.component.html',
  styleUrls: ['./fleet-status-asset-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FleetStatusAssetTableComponent implements OnInit {
  @Input() setting: FleetStatusTableSetting;

  faEllipsisV = faEllipsisV;
  faCircle = faCircle;

  constructor() {}

  ngOnInit(): void {}

  clicked(index: number): void {}
}

export interface FleetStatusTableSetting {
  columns: FleetStatusTableColumnDefinition[];
  data: FleetStatusTableData[];
  hasMenu?: boolean;
}

export interface FleetStatusTableColumnDefinition {
  title: string;
  dataFieldKey: FleetStatusDataType;
  isSortable?: boolean;
}

export interface FleetStatusTableData {
  statusCategory: FleetStatusAssetStatusCategory;
  status: string;
  tag: string;
  usage: string;
}

export interface FleetStatusAssetStatusCategory {
  leftTagColor: string;
  dotColor: string;
  statusCategoryName: string;
}

export enum FleetStatusDataType {
  statusCategory = 'statusCategory',
  status = 'status',
  tag = 'tag',
  usage = 'usage'
}

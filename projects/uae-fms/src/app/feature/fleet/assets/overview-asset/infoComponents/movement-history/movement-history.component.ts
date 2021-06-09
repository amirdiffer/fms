import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ColumnType, TableComponent } from '@core/table';
import { AssetMasterService } from '@feature/fleet/+state/assets/asset-master';
import moment from 'moment';

@Component({
  selector: 'app-asset-overview-movement-history',
  templateUrl: './movement-history.component.html',
  styleUrls: ['./movement-history.component.scss']
})
export class MovementHistoryComponent implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';

  @Input() assetID;

  tableSetting = {
    columns: [
      {
        lable: 'tables.column.duration',
        field: 'duration',
        type: ColumnType.lable,
        thumbField: ''
      },
      {
        lable: 'tables.column.start_date',
        field: 'start_date',
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'dateRenderer'
      },
      {
        lable: 'tables.column.end_date',
        field: 'end_date',
        type: ColumnType.lable,
        width: 300,
        thumbField: '',
        renderer: 'dateRenderer'
      },
      {
        lable: 'tables.column.department',
        field: 'department',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.operator',
        field: 'Operator',
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'doubleLineRenderer'
      },
      {
        lable: 'tables.column.type',
        field: 'type',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      }
    ],
    data: [],
    rowSettings: {}
  };

  constructor(private assetMasterService: AssetMasterService) {}

  date(y) {
    let createdDate = moment
      .utc(y * 1000)
      .local()
      .toDate();
    let nowDate = new Date();
    let newDate = nowDate.getTime() - createdDate.getTime();
    return {
      day: Math.floor(newDate / (1000 * 3600 * 24))
    };
  }

  ngOnInit(): void {
    this.assetMasterService
      .getAssetMovementTemporaryByID(this.assetID)
      .subscribe((x) => {
        let data = x.message;
        this.tableSetting.data = (<Array<object>>data).map((d) => {
          return {
            duration: this.date(d['createdAt']),
            start_date: d['request']['endDate'],
            end_date: d['request']['startDate'],
            department: d['department']['name'],
            Operator: {
              line1:
                d['operator']['firstName'] + ' ' + d['operator']['lastName'],
              line2: d['operator']['id']
            },
            type: 'Temporary'
          };
        });
      });
  }

  exportTable(): void {
    let filter = {
      duration: 'duration',
      start_date: 'start_date',
      end_date: 'end_date',
      department: 'department',
      Operator: 'Operator',
      type: 'type'
    };
    this.table.exportTable(
      this.tableSetting,
      'Asset OverView  - Asset ID ' + this.assetID,
      filter
    );
  }
}

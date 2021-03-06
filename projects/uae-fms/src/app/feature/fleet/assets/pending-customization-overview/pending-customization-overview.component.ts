import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ITableData } from '@feature/toll/toll.component';
import { AnyCnameRecord, AnySrvRecord } from 'dns';

@Component({
  selector: 'anms-pending-customization-overview',
  templateUrl: './pending-customization-overview.component.html',
  styleUrls: ['./pending-customization-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PendingCustomizationOverviewComponent implements OnInit {
  tableSetting;
  tableData: any[];
  searchIcon = 'assets/icons/search-solid.svg';
  downloadBtn = 'assets/icons/download-solid.svg';
  showCustomizationForm = false;
  firstCameraChecked = false;
  secondCameraChecked = false;
  thirdCameraChecked = false;
  firstCameraSerialNumber: string;
  secondCameraSerialNumber: string;
  thirdCameraSerialNumber: string;
  showFirstCameraForm = true;
  showSecondCameraForm = true;
  showThirdCameraForm = true;
  constructor() {}

  ngOnInit(): void {
    this.tableData = [
      {
        item: 'Camera',
        type: 'Sub asset',
        quantity: 4,
        attachment: ''
      },
      {
        item: 'Gps',
        type: 'Sub asset',
        quantity: 4,
        attachment: ''
      },
      {
        item: 'Sticker',
        type: 'Accessory',
        quantity: 4,
        attachment: ''
      },
      {
        item: 'Camera',
        type: 'Sub asset',
        quantity: 4,
        attachment: ''
      },
      {
        item: 'Camera',
        type: 'Sub asset',
        quantity: 4,
        attachment: ''
      }
    ];
    this.tableSetting = {
      columns: [
        {
          lable: 'tables.column.item',
          field: 'item',
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.type',
          field: 'type',
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.quantity',
          field: 'quantity',
          type: 2,
          thumbField: '',
          renderer: '',
          sortable: true
        },
        {
          lable: 'tables.column.attachment',
          field: 'attachment',
          type: 1,
          thumbField: '',
          renderer: ''
        }
      ],
      data: this.tableData
    };
  }
}

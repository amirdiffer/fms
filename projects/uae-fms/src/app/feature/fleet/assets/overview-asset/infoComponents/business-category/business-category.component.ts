import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ColumnType } from '@core/table';

@Component({
  selector: 'app-asset-overview-business-category',
  templateUrl: './business-category.component.html',
  styleUrls: ['./business-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessCategoryComponent implements OnInit {

  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';

  business_category = {
    columns: [
      {
        lable: 'tables.column.item',
        field: 'item',
        type: ColumnType.lable,
        thumbField: '',
      },
      {
        lable: 'tables.column.type',
        field: 'type',
        type: ColumnType.lable,
        thumbField: '',
      },
      {
        lable: 'tables.column.quantity',
        field: 'quantity',
        type: ColumnType.lable,
        sortable: true,
        thumbField: '',
      },
      {
        lable: 'tables.column.description',
        field: 'description',
        type: ColumnType.lable,
        thumbField: '',
      },
      {
        lable: 'tables.column.attachment',
        field: 'attachment',
        type: ColumnType.lable,
        thumbField: '',
      }
    ],
    data: [
      {
        item: 'Camera',
        type: 'Asset',
        quantity: '21',
        description: 'Description is Here',
        attachment: 'Spec Document'
      },
      {
        item: 'Camera',
        type: 'Asset',
        quantity: '21',
        description: 'Description is Here',
        attachment: 'Spec Document'
      },
      {
        item: 'Camera',
        type: 'Asset',
        quantity: '21',
        description: 'Description is Here',
        attachment: 'Spec Document'
      },
      {
        item: 'Camera',
        type: 'Asset',
        quantity: '21',
        description: 'Description is Here',
        attachment: 'Spec Document'
      },
      {
        item: 'Camera',
        type: 'Asset',
        quantity: '21',
        description: 'Description is Here',
        attachment: 'Spec Document'
      },
      {
        item: 'Camera',
        type: 'Asset',
        quantity: '21',
        description: 'Description is Here',
        attachment: 'Spec Document'
      }
    ],
    rowSettings: {
      floatButton: [
      ]
    }
  }

  constructor() {}

  ngOnInit(): void {}
}

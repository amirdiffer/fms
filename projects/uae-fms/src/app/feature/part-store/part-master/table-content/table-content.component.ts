import { Component, OnInit } from '@angular/core';
import { ColumnType } from '@core/table';
import { IPartMaster } from '../part-master.model';

@Component({
  selector: 'anms-table-content',
  templateUrl: './table-content.component.html',
  styleUrls: ['./table-content.component.scss']
})
export class TableContentComponent implements OnInit {
  itemTypes = [
    { name: 'Item type 1', id: 1 },
    { name: 'Item type 2', id: 2 },
    { name: 'Item type 3', id: 3 },
    { name: 'Item type 4', id: 4 },
    { name: 'Item type 5', id: 5 },
    { name: 'Item type 6', id: 6 }
  ];
  private partMasterData = (): IPartMaster[] => {
    const data = [];
    for (let index = 0; index < 7; index++) {
      const el = {
        thumbImage: 'TILE2._CB1564607297_.png',
        thumbText: 'Item No 123456',
        make: 'BMW',
        model: 'X6',
        quantity: 122,
        status: 'Available',
        statusColor: '#838BCE'
      };
      data.push(el);
    }
    return data;
  };
  partMastertableSetting = {
    columns: [
      {
        lable: 'tables.column.item',
        type: 1,
        field: 'thumbText',
        renderer: 'thumbTextRenderer',
        thumbField: 'thumbImage'
      },
      {
        lable: 'tables.column.make',
        field: 'make',
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.model',
        field: 'model',
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.quantity',
        field: 'quantity',
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.status',
        field: 'status',
        type: 1,
        thumbField: '',
        renderer: '',
        textColor: '#8088CC'
      },
      {
        lable: '',
        field: 'floatButton',
        width: 0,
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'floatButton'
      }
    ],
    data: this.partMasterData(),
    rowSettings: {
      onClick: (col, data) => {
      },
      // floatButton: [
      //   {
      //     button: 'edit'
      //   }
      // ]
    }
  };
  constructor() { }
  ngOnInit(): void {
   
  }

}

import { Injectable } from '@angular/core';
import { IPartMaster } from './part-master.model';
import { ColumnType } from '@core/table';

@Injectable({
  providedIn: 'root'
})
export class PartMasterService {
  private partMasterData = (): IPartMaster[] => {
    const data = [];
    for (let index = 0; index < 7; index++) {
      const el = {
        thumbImage: 'TILE2._CB1564607297_.png',
        thumbText: 'Item No 123456',
        model: 'BMW',
        quantity: 122,
        status: 'Available',
        statusColor: '#838BCE'
      };
      data.push(el);
    }
    return data;
  };
  public partMastertableSetting = () => {
    return {
      columns: [
        {
          lable: 'tables.column.item',
          type: 1,
          field: 'thumbText',
          renderer: 'thumbTextRenderer',
          thumbField: 'thumbImage'
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
          width: 120,
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
          console.log(col, data);
        },
        floatButton: [
          {
            button: 'external',
          }
        ]
      }
    };
  };

  constructor() {}
}

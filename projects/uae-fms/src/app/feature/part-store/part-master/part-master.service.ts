import { Injectable } from '@angular/core';
import { IPartMaster } from './part-master.model';

@Injectable({
  providedIn: 'root'
})
export class PartMasterService {
  private  partMasterData = () :IPartMaster [] =>{
    const data = [];
    for (let index = 0; index < 7; index++) {
      const el = {
          img:'TILE2._CB1564607297_.png',
          itemName:'Item No 123456',
          model:'BMW',
          quantity:122,
          status:'Available',
          statusColor:'#838BCE'
          };
      data.push(el)
    }
  return data
  }
  public partMastertableSetting = () =>{
    return  {
      columns:[
        {
          lable: 'Item',
          field: 'itemName',
          width: 140,
          type:2,
          thumbField: 'img',
          renderer: ''
        },
        {
          lable: 'Model',
          field: 'model',
          width: 100,
          type:1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'Quantity',
          field: 'quantity',
          width: 100,
          type:1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'Status',
          field: 'status',
          width: 100,
          type:1,
          thumbField: '',
          renderer: '',
          textColor:'#8088CC'
        },
      ],
      data: this.partMasterData(),
      rowSettings: {
        onClick: (col, data)=>{
          console.log(col, data)
        }
      }
    }
  }

  
  constructor() {}

}
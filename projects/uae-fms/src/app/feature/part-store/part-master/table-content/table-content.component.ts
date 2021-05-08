import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnType } from '@core/table';
import { PartMasterFacade, PartMasterService } from '@feature/part-store/+state/part-master';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPartMaster } from '../part-master.model';

@Component({
  selector: 'anms-table-content',
  templateUrl: './table-content.component.html',
  styleUrls: ['./table-content.component.scss']
})
export class TableContentComponent implements OnInit {
  tableData$:Observable<any>;
  title$:Observable<any>;
  currentCategory;
  itemTypes = [
    { name: 'Item type 1', id: 1 },
    { name: 'Item type 2', id: 2 },
    { name: 'Item type 3', id: 3 },
    { name: 'Item type 4', id: 4 },
    { name: 'Item type 5', id: 5 },
    { name: 'Item type 6', id: 6 }
  ];
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
      },
      {
        lable: '',
        field: 'floatButton',
        width: 1,
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'floatButton'
      }
    ],
    data: [],
    rowSettings: {
      onClick: (col, data) => {
      },
      floatButton: [
        {
          button: 'edit',
          onClick: (col, data ,  button?) => {
            this._router.navigate([`/part-store/part-master/edit-item/${data.id}`]);
            this._partMasterService.setCategoryData({
              ...this.currentCategory,
              isEdit:true,
              id:data.id,
              isItemForm:true
            })
          }
        }
      ]
    }
  };
  constructor(
              private _partMasterFacade : PartMasterFacade,
              private _partMasterService : PartMasterService,
              private _router : Router) { }
  ngOnInit(): void {
    this._partMasterService.getCategoryData().subscribe(
      x=>{
        if(x){
          this.currentCategory = x;
        }
      }
    )
    this.tableData$ = this._partMasterFacade.partMasterItem$.pipe(
      map(
        result => {
          return result.map(
            item =>{
              return {
                id:item.id,
                thumbText:item.name,
                make: item.makeName,
                model: item.modelName,
                quantity:1,
                status:'Available',
                thumbImage:'assets/thumb.png'
              }
            }
          )
        }
      )
    )
    this.title$ = this._partMasterService.getSelectedCategory().pipe(map(name=>{return name}))
  }

}

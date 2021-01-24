import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'anms-toll',
  templateUrl: './toll.component.html',
  styleUrls: ['./toll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TollComponent implements OnInit {

  tableSetting;
  tableData:ITableData[];
  faSearch = faSearch;

  constructor() { }

  ngOnInit(): void {
    this.tableData = [
      {tag:'123456789' , status:'Assigned' ,  assets:{assetName:'Asset Name' , subAsset:'Sub Asset'}, purshateDate: '02/02/2020'},
      {tag:'123456789' , status:'Assigned' ,  assets:{assetName:'Asset Name' , subAsset:'Sub Asset'}, purshateDate: '02/02/2020'},
      {tag:'123456789' , status:'Assigned' ,  assets:{assetName:'Asset Name' , subAsset:'Sub Asset'}, purshateDate: '02/02/2020'},
      {tag:'123456789' , status:'Assigned' ,  assets:{assetName:'Asset Name' , subAsset:'Sub Asset'}, purshateDate: '02/02/2020'},
      {tag:'123456789' , status:'Assigned' ,  assets:{assetName:'Asset Name' , subAsset:'Sub Asset'}, purshateDate: '02/02/2020'},
    ]
    this.tableSetting = {
      columns:[
        {
          lable: 'Toll Tag',
          field: 'tag',
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
          renderer: ''
        },
        {
          lable: 'Assets',
          field: 'assets',
          width: 300,
          type:2,
          thumbField: '',
          renderer: 'subtextRenderer'
        },
        {
          lable: 'Purshate Date',
          field: 'purshateDate',
          width: 100,
          type:1,
          thumbField: '',
          renderer: ''
        }
      ],
      data: this.tableData,
    }
    
  }
  
}

export interface ITableData{
  tag:string;
  status:string;
  assets:{
    assetName:string;
    subAsset:string;
  }
  purshateDate: string;
}

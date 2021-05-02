import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'anms-part-master',
  templateUrl: './part-master.component.html',
  styleUrls: ['./part-master.component.scss']
})
export class PartMasterComponent implements OnInit {
  
  
  searchIcon = 'assets/icons/search-solid.svg';
  downloadBtn = 'assets/icons/download-solid.svg';
  filterSetting = [];
  partMasterTableSetting;
  selectedCategory;
  hasForm:boolean= false;
  itemTypes = [
    { name: 'Item type 1', id: 1 },
    { name: 'Item type 2', id: 2 },
    { name: 'Item type 3', id: 3 },
    { name: 'Item type 4', id: 4 },
    { name: 'Item type 5', id: 5 },
    { name: 'Item type 6', id: 6 }
  ];
  categoryItem=[
    {
      name:'Filter'
    },
    {
      name:'Engine'
    },
    {
      name:'Air Condition'
    },
    {
      name:'Tire'
    },
    {
      name:'Door'
    },
    {
      name:'Hood'
    },
  ]
  constructor(public _router : Router) {}

  ngOnInit(): void {
    this.filterSetting = [
      {
        filterTitle: 'statistic.total',
        filterCount: '13',
        filterTagColor: '#6EBFB5'
      },
      {
        filterTitle: 'statistic.available',
        filterCount: '08',
        filterTagColor: '#848CCF'
      },
      {
        filterTitle: 'statistic.unavailable',
        filterCount: '02',
        filterTagColor: '#BA7967'
      }
    ];
    
  }
  categorySelect(index){
    if(this._router.url != '/part-store/part-master'){
      return
    }
    this.selectedCategory = index
  }


}

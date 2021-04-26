import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartMasterService } from './part-master.service';

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
  constructor(private _partMasterService: PartMasterService,
              private _activateRouter : ActivatedRoute) {}

  ngOnInit(): void {
    this.checkChildrenUrl();
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
    this.partMasterTableSetting = this._partMasterService.partMastertableSetting();
  }
  categorySelect(index){
    this.selectedCategory = index
  }
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    setTimeout(()=>{
      this.checkChildrenUrl();
    })
    console.log(event)
  }
  checkChildrenUrl(){
    if(this._activateRouter.snapshot.children.length > 0) {
      this.hasForm = true;
    }else{
      this.hasForm = false;
    }
  }
}

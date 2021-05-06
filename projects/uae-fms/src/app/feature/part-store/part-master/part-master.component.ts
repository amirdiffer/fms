import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetTypeFacade, SubAssetTypeFacade } from '@feature/configuration/+state/fleet-configuration';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { PartMasterFacade, PartMasterService } from '../+state/part-master';

@Component({
  selector: 'anms-part-master',
  templateUrl: './part-master.component.html',
  styleUrls: ['./part-master.component.scss']
})
export class PartMasterComponent implements OnInit {
  searchIcon = 'assets/icons/search-solid.svg';
  downloadBtn = 'assets/icons/download-solid.svg';
  filterSetting = [];
  isAsset:boolean = true;
  partMasterTableSetting;
  selectedCategory = 0;
  selectedSubCategoryType;
  selectedCategoryType={ name: 'Asset', id: 'ASSET' };
  subCatrgotyType$:Observable<any>
  categoryList$ : Observable<any> = this._partMasterFacade.partMasterCategory$
  hoverIndex=-1;
  addCategoryData = {fleetType:'' , fleetConfigurationId:null}
  hasForm:boolean= false;
  itemTypes = [
    { name: 'Asset', id: 'ASSET' },
    { name: 'Sub Asset', id: 'SUB_ASSET' },
  ];
  constructor(public router : Router,
              private _activatedRoute : ActivatedRoute,
              private _partMasterFacade:PartMasterFacade,
              private _partMasteService : PartMasterService,
              private _fleetConfigurationAssetTypeFacade : AssetTypeFacade,
              private _fleetConfigurationSubAssetTypeFacade: SubAssetTypeFacade) {}

  ngOnInit(): void {
    this._fleetConfigurationAssetTypeFacade.loadAll();
    this._fleetConfigurationSubAssetTypeFacade.loadAll();
    this.categoryTypeChanges(this.selectedCategoryType)
    // this.filterSetting = [
    //   {
    //     filterTitle: 'statistic.total',
    //     filterCount: '13',
    //     filterTagColor: '#6EBFB5'
    //   },
    //   {
    //     filterTitle: 'statistic.available',
    //     filterCount: '08',
    //     filterTagColor: '#848CCF'
    //   },
    //   {
    //     filterTitle: 'statistic.unavailable',
    //     filterCount: '02',
    //     filterTagColor: '#BA7967'
    //   }
    // ];
  }
  categorySelect(index){
    if(this.router.url != '/part-store/part-master'){
      return
    }
    this.selectedCategory = index;
  }

  addItemForm(category){
    this._partMasteService.setCategoryData(
      {
        fleetType:this.addCategoryData.fleetType , 
        categoryId:category.id,
        makes:this.selectedSubCategoryType.makes
      }
    );
    this.router.navigate(['add-item'],{relativeTo:this._activatedRoute})
  }


  /* Category Changes Asset Or Sub Asset */
  categoryTypeChanges(event){
    this.selectedCategory = 0
    this.selectedSubCategoryType = event
    this.addCategoryData.fleetConfigurationId = null
    if(event.id === 'ASSET'){
      this.selectedCategoryType = { name: 'Asset', id: 'ASSET' };
      this.isAsset = true;
      this.subCatrgotyType$ = this._fleetConfigurationAssetTypeFacade.assetType$.pipe(
        map( x => {
          return x.map(
            (y , i) => {
              if(i == 0 ) {
                this.selectedSubCategoryType = {...y};
                this.typeChanges(y);
              }
              return {...y}
            }
          )
        })
      )
    }else{
      this.selectedCategoryType = { name: 'Sub Asset', id: 'SUB_ASSET' };
      this.isAsset = false;
      this.subCatrgotyType$ = this._fleetConfigurationSubAssetTypeFacade.subAssetType$.pipe(
        map( x => {
          return x.map(
            (y , i) => {
              if(i == 0 ) {
                this.selectedSubCategoryType = {...y};
                this.typeChanges(y)
              }
              return {...y}}
            )
        }),
      )
    }
    this.addCategoryData.fleetType = this.selectedCategoryType.id;
  };

  typeChanges(event){
    this.selectedCategory = 0
    this.addCategoryData.fleetConfigurationId = event.id;
    this.selectedCategoryType.id === 'ASSET' 
      ?
      this._partMasterFacade.loadAllCategoryOfAsset(event.id)
      :
      this._partMasterFacade.loadAllCategoryOfSubAsset(event.id)
  }

  addCategoryForm(){
    console.log(this.addCategoryData)
    if(this.addCategoryData.fleetConfigurationId == null){
      return;
    };
    console.log(this.addCategoryData)

    this.hasForm = true;
    this.router.navigate(['add-category'],{relativeTo:this._activatedRoute})
    this._partMasteService.setCategoryData(this.addCategoryData)
  }
  editCategoryForm(category){
    console.log(category)
  }
  hover(index){
    this.hoverIndex = index
  }
  leaveMouse(){
    this.hoverIndex = -1
  }
}

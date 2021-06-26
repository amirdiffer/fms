import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubAssetTypeFacade } from '@feature/configuration/+state/fleet-configuration/sub-asset-type';
import { AssetTypeFacade } from '@feature/configuration/+state/fleet-configuration/asset-type';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PartMasterFacade, PartMasterService } from '../+state/part-master';

@Component({
  selector: 'anms-part-master',
  templateUrl: './part-master.component.html',
  styleUrls: ['./part-master.component.scss']
})
export class PartMasterComponent implements OnInit , OnDestroy {
  searchIcon = 'assets/icons/search-solid.svg';
  downloadBtn = 'assets/icons/download-solid.svg';
  filterSetting = [];
  isAsset:boolean = true;
  partMasterTableSetting;

  selectedCategory = 0;
  hoverIndex=-1;
  selectedSubCategoryType:any;
  selectedCategoryType={ name: 'Asset', id: 'ASSET' };
  addCategoryData = {fleetType:'' , fleetConfigurationId:null}

  subCatrgotyType$:Observable<any>
  categoryList$ : Observable<any> = this._partMasterFacade.partMasterCategory$;
  categoryListSubscription$:Subscription;
  categoryForm: Observable<any>;
  itemForm:Observable<any>;

  itemFormPath:string = '/part-store/part-master/add-item';
  categoryFormPath:string = '/part-store/part-master/add-category';


  itemTypes = [
    { name: 'Asset', id: 'ASSET' },
    { name: 'Sub Asset', id: 'SUB_ASSET' },
  ];


  constructor(public router : Router,
              public activatedRoute : ActivatedRoute,
              private _partMasterFacade:PartMasterFacade,
              private _partMasteService : PartMasterService,
              private _fleetConfigurationAssetTypeFacade : AssetTypeFacade,
              private _fleetConfigurationSubAssetTypeFacade: SubAssetTypeFacade) {}

  ngOnInit(): void {
    this._fleetConfigurationAssetTypeFacade.loadAll();
    this._fleetConfigurationSubAssetTypeFacade.loadAll();

    this._partMasterFacade.submittedCategory$.subscribe(
      x => {if(x){this.categoryTypeChanges(this.selectedCategoryType , true)}}
    );


    this._partMasterFacade.submittedItem$.subscribe(
      x => {if(x){this.loadCategoryList()}}
    );

    /* Check Form in children route is OPEN or not */
    this.categoryForm = this._partMasteService.getCategoryData().pipe(map(
      x=>{
        if (x && x.isForm){return true;} else{ return false;}
      }
    ));
    this.itemForm = this._partMasteService.getCategoryData().pipe(map(
      x=>{
        if (x && x.isItemForm){return true;} else{ return false;}
      }
    ));
    this.categoryTypeChanges(this.selectedCategoryType , true);
    this.loadCategoryList();
  }
  categorySelect(index , category , reload:boolean = false){
    if(this.router.url != '/part-store/part-master' && !reload){
      return
    }
    this.selectedCategory = index
    this.selectedCategoryType.id === 'ASSET'
    ?
    this._partMasterFacade.loadAllItemOfAsset(category.id)
    :
    this._partMasterFacade.loadAllItemOfSubAsset(category.id)
    this.selectedCategory = index;
    this._partMasteService.setSelectedCategory(category.name);
    if(this.selectedSubCategoryType){
      this._partMasteService.setCategoryData(
        {
          fleetType:this.addCategoryData.fleetType ,
          categoryId:category.id,
          makes:this.selectedSubCategoryType.makes
        }
      )
    }

  }

  loadCategoryList(){
    this.categoryListSubscription$ = this.categoryList$.subscribe(
      x =>{
        if(x.length > 0){
          this.categorySelect(this.selectedCategory,x[this.selectedCategory],true);
        }else{
          this._partMasterFacade.resetItemEntities();
        }
      }
    );
  }
  addItemForm(category){
    this._partMasteService.setCategoryData(
      {
        fleetType:this.addCategoryData.fleetType ,
        categoryId:category.id,
        makes:this.selectedSubCategoryType.makes
      }
    );
    this.router.navigate(['add-item'],{relativeTo:this.activatedRoute})
  }


  /* Category Changes Asset Or Sub Asset */
  categoryTypeChanges(event, isLoaded:boolean=false){

    this.selectedCategory = 0
    this.addCategoryData.fleetConfigurationId = null;
    if(event.id === 'ASSET'){
      this.selectedCategoryType = { name: 'Asset', id: 'ASSET' };
      this.isAsset = true;
      this.subCatrgotyType$ = this._fleetConfigurationAssetTypeFacade.assetType$.pipe(
        map( x => {
          return x.map(
            (y , i) => {
              if(isLoaded && this.selectedSubCategoryType){
                this.typeChanges(this.selectedSubCategoryType);
              }else{
                if(i == 0 ) {
                  this.selectedSubCategoryType = {...y};
                  this.typeChanges(y);
                }
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
              if(isLoaded && this.selectedSubCategoryType){
                this.typeChanges(this.selectedSubCategoryType);
              }else{
                if(i == 0 ) {
                  this.selectedSubCategoryType = {...y};
                  this.typeChanges(y);
                }
              }
              return {...y}}
            )
        }),
      )
    }
    this.addCategoryData.fleetType = this.selectedCategoryType.id;
  };

  typeChanges(event){
    this.selectedSubCategoryType = event;
    this.selectedCategory = 0
    this.addCategoryData.fleetConfigurationId = event.id;
    this.selectedCategoryType.id === 'ASSET'
      ?
      this._partMasterFacade.loadAllCategoryOfAsset(event.id)
      :
      this._partMasterFacade.loadAllCategoryOfSubAsset(event.id);
  }

  addCategoryForm(){
    if(this.addCategoryData.fleetConfigurationId == null){
      return;
    };
    this.router.navigate(['add-category'],{relativeTo:this.activatedRoute})
    this._partMasteService.setCategoryData({...this.addCategoryData , isForm:true})
  }
  editCategoryForm(category){
    this._partMasteService.setCategoryData({...category , ...this.addCategoryData , isEdit:true , isForm:true})
    this.router.navigate(['edit-category/' +category.id],{relativeTo:this.activatedRoute})
  }
  hover(index){
    this.hoverIndex = index
  }
  leaveMouse(){
    this.hoverIndex = -1
  }

  ngOnDestroy(){
    this._partMasterFacade.resetCategory();
    this._partMasterFacade.resetItem();
    this._fleetConfigurationAssetTypeFacade.resetEntities();
    this._partMasteService.setCategoryData(null)
    this.categoryListSubscription$.unsubscribe();
  }

}

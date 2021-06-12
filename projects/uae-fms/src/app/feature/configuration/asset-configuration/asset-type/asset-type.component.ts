import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input, ChangeDetectorRef
} from '@angular/core';
import { AccessoryTypeFacade } from '../../+state/fleet-configuration/accessory-type';
import { SubAssetTypeFacade } from '../../+state/fleet-configuration/sub-asset-type';
import { AssetTypeFacade } from '../../+state/fleet-configuration/asset-type';
import { Subject, Observable } from 'rxjs';
import { IAssetType, Make, MakeModel } from '@models/asset-type.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '@feature/configuration/asset-configuration/data.service';
import { map, tap } from 'rxjs/operators';
import { SettingsFacade } from '@core/settings/settings.facade';
import { ISubAssetType } from '@models/sub-asset';
import { AddMakeComponent } from '@feature/configuration/asset-configuration/add-make/add-make.component';
import { Location } from '@angular/common';
import { relative } from 'path';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'configuration-asset-type',
  templateUrl: './asset-type.component.html',
  styleUrls: ['./asset-type.component.scss']
})

export class AssetTypeComponent implements OnInit, OnDestroy {
  //#region Inputs and Outputs
  @Output() selectTrim = new EventEmitter();
  @Output() selectMake = new EventEmitter();
  @Output() selectModel = new EventEmitter();
  @Output() select = new EventEmitter<activeCat>();

  activeCat: activeCat = {
    manufacturer: null,
    category: null
  }

  //#endregion

  //#region Variables
  // assetType$ = new Observable();
  loaded$ = this._assetTypefacade.loaded$;
  filter = new Subject();
  arrowIcon = 'assets/icons/arrow-down.svg';
  categoryType$;
  activeLang = '';
  activeAssetType;
  openedAssetTypeArray: AssetTypeExtension[] = []
  //#endregion

  tree = [];
  refresh:boolean = false

  assetTypeArray: AssetTypeExtension[] = []
  assetType$: Observable<AssetTypeExtension[]>
  assetTypeSubject$: Subject<AssetTypeExtension[]> = new Subject()

  selectedCategory:number = -1;
  selectedMake:number = -1;
  selectedModel:number = -1;
  constructor(
    private _assetTypefacade: AssetTypeFacade,
    private _subAssetTypeFacade: SubAssetTypeFacade,
    private _accessoryTypeFacade: AccessoryTypeFacade,
    private router: Router,
    private dataService: DataService,
    private settingFacade: SettingsFacade,
    private location: Location,
    public activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    /* Load Data */
    this._assetTypefacade.loadAll();
    this._subAssetTypeFacade.loadAll();
    this._subAssetTypeFacade.loadAll();

    this.refreshData()

    this.assetTypeSubject$.subscribe((assetTypeArray) => {
      this.assetTypeArray = assetTypeArray
    })



    this.categoryType$ = this.dataService.watchType().pipe((type) => {
      type.subscribe((y) => {
        if(y !== this.activeAssetType){
          this.refresh = false
        }
        this.activeAssetType = y
        this.changeType(y , this.refresh);
      });
      return type;
    });
    this.filter.next('ASSET');

    setTimeout(() => {
      this.filter.next('SUB_ASSET');
    }, 4000);

    this.settingFacade.language.subscribe((lang) => {
      this.activeLang = lang;
    });
  }

  createMake(assetType: AssetTypeExtension): void {
    this.dataService.selectedTypeId = assetType.id;
    this.dataService.selectedTypeName = assetType.name;
    this.onTypeClick(assetType);

    this.router.navigate([this.activeAssetType+'/add-make/' +assetType.id] , {relativeTo:this.activatedRoute}).then(()=>{
      this.refreshData();
    })
  }

  createModel(assetTypeId, make: MakeExtension): void {
    this.onMakeClick({...make , isSelected:false},assetTypeId)
    this.router.navigate([`${this.activeAssetType}/add-model/${assetTypeId}/${make.id}`] , {relativeTo:this.activatedRoute})
  }

  createTrim(assetTypeId, makeId , model): void {
    this.onModelClick(model , makeId , assetTypeId);
    this.router.navigate([`${this.activeAssetType}/add-trim/${assetTypeId}/${makeId}/${model.id}`] , {relativeTo:this.activatedRoute})
  }

  onTypeClick(item: AssetTypeExtension): void {
    console.log(item)
    if(this.activeAssetType == 'ACCESSORY') return;
    this.selectedCategory = +item.id
    this.selectedMake = -1;
    this.assetType$.forEach((assetType: AssetTypeExtension[]) => {
      this.openedAssetTypeArray = []
      assetType.forEach(iAssetType => {
        if (iAssetType.id === item.id) {
          if (item.isSelected) {
            iAssetType.isSelected = false;
            iAssetType.iconSvgClass = 'right-arrow';
          } else {
            iAssetType.isSelected = true;
            iAssetType.iconSvgClass = 'down-arrow';
          }
          this.openedAssetTypeArray.push(iAssetType)
        } else {
          iAssetType.isSelected = false
          iAssetType.iconSvgClass = 'right-arrow'
          this.openedAssetTypeArray.push(iAssetType)
          this.activeCat.category = item.id;
        }
        this.select.emit(this.activeCat);
        this.selectMake.emit({typeId : item.id , makes : item.makes});
        this.assetTypeSubject$.next(this.openedAssetTypeArray);

      })
    }).then()
  }

  onMakeClick(make: MakeExtension, assetTypeId: number): void {
    this.selectedMake = make.id
    this.selectedModel = -1;
    this.openedAssetTypeArray.map((iAssetType) => {
      if (iAssetType.id == assetTypeId) {
        iAssetType.makes.map((iAssetTypeMake => {
          if (iAssetTypeMake.id == make.id) {
            if (make.isSelected) {
              iAssetTypeMake.isSelected = false;
              iAssetTypeMake.iconSvgClass = 'right-arrow';
            } else {
              iAssetTypeMake.isSelected = true;
              iAssetTypeMake.iconSvgClass = 'down-arrow';
            }
            this.activeCat.manufacturer = make.id;
            this.select.emit(this.activeCat);
            this.selectModel.emit({makeId: make.id , models:make.models});
          } else {
            iAssetTypeMake.isSelected = false
            iAssetTypeMake.iconSvgClass = 'right-arrow'
          }
        }))
      }
    })
  }

  onModelClick(model: ModelExtension, makeId: number, assetTypeId: number): void {
    this.selectedModel = model.id;
    this.openedAssetTypeArray.map((iAssetType) => {
      if (iAssetType.id === assetTypeId) {
        iAssetType.makes.map((iAssetTypeMake => {
          if (iAssetTypeMake.id === makeId) {
            iAssetTypeMake.models.map((iAssetTypeMakeModel) => {
              if (iAssetTypeMakeModel.id === model.id) {
                iAssetTypeMakeModel.isSelected = !iAssetTypeMakeModel.isSelected;
                this.select.emit(this.activeCat)
                this.selectTrim.emit({modelId:model.id , trims:model.trims});
              } else {
                iAssetTypeMakeModel.isSelected = false
              }
            })
          }
        }))
      }
    })
  }

  getStatusColor(id: number): string {
    if (id === this.selectedModel) {
      return '#0DA06E';
    } else {
      return '#868686';
    }
  }

  changeType(type: string , refresh:boolean = false) {
    this.selectedCategory = -1;
    this.selectedMake = -1;
    this.selectedModel = -1;
    let assetTypeArray: AssetTypeExtension[] = []
    this.assetTypeSubject$.next([])
    if (type == 'ASSET' || type == 'SUB_ASSET') {
      this.assetType$ = (type == 'ASSET' ? this._assetTypefacade.assetType$ : this._subAssetTypeFacade.subAssetType$).pipe(
        map((response) => {
          assetTypeArray = []
          return response.map((obj) => {
            const assetType = {
              ...obj,
              isSelected:false,
              iconSvgClass: 'right-arrow',
              makes: []
            };
            obj.makes.map((make) => {
              const x: MakeExtension = {
                ...make,
                isSelected: false,
                iconSvgClass: 'right-arrow',
                models: []
              };
              make.models.map((model) => {
                const y: ModelExtension = {...model , isSelected: false};
                x.models.push(y);
              });
              assetType.makes.push({...x , isSelected: false});
            });
            assetTypeArray.push(assetType)
            return assetType as AssetTypeExtension;
          })
        })
      );
    }
    if (type == 'ACCESSORY') {
      this.assetType$ = this._accessoryTypeFacade.accessoryType$.pipe(
        map((response) => {
          assetTypeArray = []
          return response.map((obj) => {
            const assetType = {
              ...obj,
              isSelected: false,
              iconSvgClass: false,
              makes: [],
              models: []
            };
            assetTypeArray.push(assetType)
            return assetType as AssetTypeExtension;
          })
        })
      );

    }

    this.assetType$.subscribe(x=>{if(x){this.assetTypeSubject$.next(assetTypeArray)};});
  }

  ngOnDestroy(): void { }

  getAssetText() {
    if (this.activeAssetType == "ASSET") return "configuration.asset_configuration.add_asset_type";
    if (this.activeAssetType == "SUB_ASSET") return "configuration.asset_configuration.add_sub_asset_type";
    if (this.activeAssetType == "ACCESSORY") return "configuration.asset_configuration.add_accessory_type";
  }


  addCategoryType(){
    switch (this.activeAssetType) {
      case 'ASSET':
        this.router.navigate(['add-asset-configuration'] , {relativeTo:this.activatedRoute})
        break;

      case 'SUB_ASSET':
        this.router.navigate(['add-sub-asset-configuration'], {relativeTo:this.activatedRoute})
        break;

      case 'ACCESSORY':
        this.router.navigate(['add-accessory-configuration'], {relativeTo:this.activatedRoute})
        break;
    }
  }

  editCategoryType(asset){
    this.onTypeClick({...asset , isSelected:false})
    switch (this.activeAssetType) {
      case 'ASSET':
        this.router.navigate(['edit-asset-configuration/'+asset.id] , {relativeTo:this.activatedRoute})
        break;

      case 'SUB_ASSET':
        this.router.navigate(['edit-sub-asset-configuration/'+asset.id], {relativeTo:this.activatedRoute})
        break;

      case 'ACCESSORY':
        this.router.navigate(['edit-accessory-configuration/'+asset.id], {relativeTo:this.activatedRoute})
        break;
    }
  }

  editMake(make , assetType){
    this.router.navigate([`${this.activeAssetType}/edit-make/${assetType.id}/${make.id}`] , {relativeTo:this.activatedRoute}).then(()=>{
      this.onTypeClick(assetType)
      this.onMakeClick(make, assetType.id);
      this.refreshData();
    })
  }

  editModel(model, makeId , assetTypeId){
    this.router.navigate([`${this.activeAssetType}/edit-model/${assetTypeId}/${makeId}/${model.id}`] , {relativeTo:this.activatedRoute}).then(()=>{
      this.onModelClick(model , makeId , assetTypeId);
    })
  }

  refreshData(){
    /* Refresh */
    this.activatedRoute.children.map(
      x=>{

        let fleetType=x.snapshot.params.fleetType;
        let assetTypeId = x.snapshot.params.assetTypeId;
        let makeId = x.snapshot.params.makeId;
        let modelId = x.snapshot.params.modelId;
        let id = x.snapshot.params.id
        let type;
        let make;
        let model;
        this.refresh = true
        this.dataService.selectType(fleetType);
        this.assetTypeSubject$.subscribe(y=>{
          if(y && y.length>0){
            this.openedAssetTypeArray = y
            if(assetTypeId && !type){
              type = y.find(z => z.id == assetTypeId) ?(y.find(z => z.id == assetTypeId)):null;
              type != null ? this.onTypeClick(type): null;
            }
            if(assetTypeId && (makeId || id) && !make ){
              let makes = y.find(z => z.id == assetTypeId) ? y.find(z => z.id == assetTypeId).makes : null;
              makes != null ? (make = makes.find(make => make.id == (makeId ? makeId : id)) , this.onMakeClick(make , assetTypeId )): null
            }
            if(assetTypeId && makeId && (modelId || id) && !model){
              make ?(model = make.models.find(model => model.id == (modelId ? modelId : id )) , this.onModelClick(model , makeId , assetTypeId)): null
            }
          }
        })
      }
    )
  }
}

export interface AssetTypeExtension extends IAssetType {
  isSelected?: boolean;
  iconSvgClass?: string;
  makes?: MakeExtension[];
}


export interface MakeExtension extends Make {
  isSelected?: boolean;
  iconSvgClass?: string;
  models?: ModelExtension[];
}

export interface ModelExtension extends MakeModel {
  isSelected?: boolean;
}

export interface activeCat {
  category?: number,
  manufacturer?: number;
}

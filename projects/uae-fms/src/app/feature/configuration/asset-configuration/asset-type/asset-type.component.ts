import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input, ChangeDetectorRef
} from '@angular/core';
import { AccessoryTypeFacade, AssetTypeFacade, SubAssetTypeFacade } from '../../+state/fleet-configuration/index';
import { Subject, Observable } from 'rxjs';
import { IAssetType, Make, MakeModel } from '@models/asset-type.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '@feature/configuration/asset-configuration/data.service';
import { map, tap } from 'rxjs/operators';
import { SettingsFacade } from '@core/settings/settings.facade';
import { ISubAssetType } from '@models/sub-asset';
import { AddMakeComponent } from '@feature/configuration/asset-configuration/add-make/add-make.component';
import { Location } from '@angular/common';

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
  loaded$ = this.facade.loaded$;
  filter = new Subject();
  arrowIcon = 'assets/icons/arrow-down.svg';
  categoryType$;
  activeLang = '';
  activeAssetType = '';
  openedAssetTypeArray: AssetTypeExtension[] = []
  //#endregion

  tree = [];

  assetTypeArray: AssetTypeExtension[] = []
  assetType$: Observable<AssetTypeExtension[]>
  assetTypeSubject$: Subject<AssetTypeExtension[]> = new Subject()

  constructor(
    private facade: AssetTypeFacade,
    private _subAssetTypeFacade : SubAssetTypeFacade,
    private _accessoryTypeFacade : AccessoryTypeFacade,
    private router: Router,
    private dataService: DataService,
    private settingFacade: SettingsFacade,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.assetTypeSubject$.subscribe((assetTypeArray) => {
      this.assetTypeArray = assetTypeArray
    })

    this.categoryType$ = this.dataService.watchType().pipe((type) => {
      type.subscribe((y) => {
        this.activeAssetType = y
        this.changeType(y)
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
    this.router
      .navigate(['/configuration/asset-configuration/add-make/' + assetType.id])
      .then();
  }

  createModel(assetType, make: MakeExtension): void {
    this.dataService.selectedMakeId = make.id;
    this.dataService.selectedMakeName = make.name;
    this.router
      .navigate([
        `/configuration/asset-configuration/add-model/${assetType.id}/${make.id}`
      ])
      .then();
  }

  createTrim(assetType, model: ModelExtension, make: MakeExtension): void {
    this.dataService.selectedModelId = model.id;
    this.dataService.selectedModelName = model.name;
    this.dataService.selectedMakeId = make.id;
    this.dataService.selectedMakeName = make.name;
    this.router
      .navigate([
        `/configuration/asset-configuration/add-trim/${assetType.id}/${make.id}/${model.id}`
      ])
      .then();
  }

  onTypeClick(item: AssetTypeExtension): void {
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: { type: item.id } }).then()
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
        } else  {
          iAssetType.isSelected = false
          iAssetType.iconSvgClass = 'right-arrow'
          this.openedAssetTypeArray.push(iAssetType)
          this.activeCat.category = item.id;
          this.select.emit(this.activeCat);
          this.selectMake.emit(item.makes);
        }
        this.assetTypeSubject$.next(this.openedAssetTypeArray)
      })
    }).then()
  }

  onMakeClick(make: MakeExtension, assetTypeId: number): void {
    this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: { type: assetTypeId, make: make.id } }).then()
    this.openedAssetTypeArray.map((iAssetType) => {
      if (iAssetType.id === assetTypeId) {
        iAssetType.makes.map((iAssetTypeMake => {
          if (iAssetTypeMake.id === make.id) {
            if (make.isSelected) {
              iAssetTypeMake.isSelected = false;
              iAssetTypeMake.iconSvgClass = 'right-arrow';
            } else {
              iAssetTypeMake.isSelected = true;
              iAssetTypeMake.iconSvgClass = 'down-arrow';
            }
            this.activeCat.manufacturer = make.id;
            this.select.emit(this.activeCat);
            this.selectModel.emit(make.models);
          } else  {
            iAssetTypeMake.isSelected = false
            iAssetTypeMake.iconSvgClass = 'right-arrow'
          }
        }))
      }
    })
  }

  onModelClick(model: ModelExtension, makeId: number, assetTypeId: number): void {
    this.router.navigate([], {relativeTo: this.activatedRoute, queryParams: { model: model.id }, queryParamsHandling: 'merge'}).then()
    this.openedAssetTypeArray.map((iAssetType) => {
      if (iAssetType.id === assetTypeId) {
        iAssetType.makes.map((iAssetTypeMake => {
          if (iAssetTypeMake.id === makeId) {
            iAssetTypeMake.models.map((iAssetTypeMakeModel) => {
              if (iAssetTypeMakeModel.id === model.id) {
                iAssetTypeMakeModel.isSelected = !iAssetTypeMakeModel.isSelected;
                this.select.emit(this.activeCat)
                this.selectTrim.emit(model.trims);
              } else {
                iAssetTypeMakeModel.isSelected = false
              }
            })
          }
        }))
      }
    })
  }

  getStatusColor(status: boolean): string {
    if (status) {
      return '#0DA06E';
    } else {
      return '#868686';
    }
  }

  changeType(type:string){
    let assetTypeArray: AssetTypeExtension[]= []
    if(type == 'ASSET' || type == 'SUB_ASSET'){
      this.assetType$ =  (type == 'ASSET' ? this.facade.assetType$:this._subAssetTypeFacade.subAssetType$).pipe(
        map((response) => {
          assetTypeArray = []
          return response.map((obj) => {
            const assetType = {
              ...obj,
              isSelected: false,
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
                const y: ModelExtension = { ...model, isSelected: false };
                x.models.push(y);
              });
              assetType.makes.push(x);
            });
            assetTypeArray.push(assetType)
            this.assetTypeSubject$.next(assetTypeArray)
            return assetType as AssetTypeExtension;
          })
        })
      );
    }
    if(type == 'ACCESSORY'){
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
            this.assetTypeSubject$.next(assetTypeArray)
            return assetType as AssetTypeExtension;
          })
        })
      );

    }

    this.assetType$.subscribe()
  }

  ngOnDestroy(): void {}
}

export interface AssetTypeExtension extends IAssetType {
  isSelected: boolean;
  iconSvgClass: string;
  makes: MakeExtension[];
}


export interface MakeExtension extends Make {
  isSelected: boolean;
  iconSvgClass: string;
  models: ModelExtension[];
}

export interface ModelExtension extends MakeModel {
  isSelected: boolean;
}

export interface activeCat {
  category: number,
  manufacturer: number;
}

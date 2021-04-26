import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { AssetTypeFacade } from '../../+state/asset-configuration';
import { Subject, Observable } from 'rxjs';
import { IAssetType, Make, MakeModel } from '@models/asset-type.model';
import { Router } from '@angular/router';
import { DataService } from '@feature/configuration/asset-configuration/data.service';
import { map, tap } from 'rxjs/operators';
import { SettingsFacade } from '@core/settings/settings.facade';

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
  assetTypes: AssetTypeExtension[] = [];
  arrowIcon = 'assets/icons/arrow-down.svg';
  categoryType$;
  activeLang = '';
  //#endregion

  tree = [];

  assetType$ = this.facade.assetType$.pipe(
    map((response) =>
      response.map((obj) => {
        const assetType = {
          ...obj,
          isSelected:
            this.returnItemTree(obj.id, obj.type, obj).isSelected || false,
          iconSvgClass:
            this.returnItemTree(obj.id, obj.type, obj).iconSvgClass ||
            'right-arrow',
          makes: []
        };
        obj.makes.map((make) => {
          const x: MakeExtension = {
            ...make,
            isSelected:
              this.returnItemTree(make.id, 'make', make).isSelected || false,
            iconSvgClass:
              this.returnItemTree(make.id, 'make', make).iconSvgClass ||
              'right-arrow',
            models: []
          };
          make.models.map((model) => {
            const y: ModelExtension = { ...model, isSelected: false };
            x.models.push(y);
          });
          assetType.makes.push(x);
        });
        return assetType as AssetTypeExtension;
      })
    )
  );

  constructor(
    private facade: AssetTypeFacade,
    private router: Router,
    private dataService: DataService,
    private settingFacade: SettingsFacade
  ) {}

  ngOnInit(): void {
    this.facade.loadAll();

    this.categoryType$ = this.dataService.watchType().pipe((type) => {
      type.subscribe((y) => {
        console.log(y);
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
    this.dataService.selectedMakeName = make.make;
    this.router
      .navigate([
        `/configuration/asset-configuration/add-model/${assetType.id}/${make.id}`
      ])
      .then();
  }

  createTrim(assetType, model: ModelExtension, make: MakeExtension): void {
    this.dataService.selectedModelId = model.id;
    this.dataService.selectedModelName = model.model;
    this.dataService.selectedMakeId = make.id;
    this.dataService.selectedMakeName = make.make;
    this.router
      .navigate([
        `/configuration/asset-configuration/add-trim/${assetType.id}/${make.id}/${model.id}`
      ])
      .then();
  }

  onTypeClick(item: AssetTypeExtension): void {
    if (item.isSelected) {
      item.isSelected = false;
      item.iconSvgClass = 'right-arrow';
    } else {
      item.isSelected = true;
      item.iconSvgClass = 'down-arrow';
    }
    this.activeCat.category = item.id;
    this.select.emit(this.activeCat);
    this.selectMake.emit(item.makes);
    this.dataService.updateTree(item.id, item.type, item);
  }

  onMakeClick(make: MakeExtension): void {
    if (make.isSelected) {
      make.isSelected = false;
      make.iconSvgClass = 'right-arrow';
    } else {
      make.isSelected = true;
      make.iconSvgClass = 'down-arrow';
    }
    this.activeCat.manufacturer = make.id;
    this.select.emit(this.activeCat);
    this.selectModel.emit(make.models);
    this.dataService.updateTree(make.id, 'make', make);
  }

  onModelClick(model: ModelExtension): void {
    this.select.emit(this.activeCat)
    this.selectTrim.emit(model.trims);
    model.isSelected = !model.isSelected;
    this.dataService.updateTree(model.id, 'model', model);
  }

  returnItemTree(id, type, orgData) {
    if (this.dataService.returnTreeItem(id, type)) {
      return this.dataService.returnTreeItem(id, type).data;
    } else return orgData;
  }

  getStatusColor(status: boolean): string {
    if (status) {
      return '#0DA06E';
    } else {
      return '#868686';
    }
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

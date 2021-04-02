import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { AssetTypeFacade } from '../../+state/asset-configuration';
import { Subject, merge } from 'rxjs';
import { IAssetType, Make, MakeModel } from '@models/asset-type.model';
import { Router } from '@angular/router';
import { DataService } from '@feature/configuration/asset-configuration/data.service';

@Component({
  selector: 'configuration-asset-type',
  templateUrl: './asset-type.component.html',
  styleUrls: ['./asset-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetTypeComponent implements OnInit, OnDestroy {
  assetType$ = this.facade.assetType$;
  filter = new Subject();

  assetData$ = merge(this.assetType$, this.filter.asObservable());

  assetTypes: AssetTypeExtension[] = [];
  arrowIcon = 'assets/icons/arrow-down.svg';

  constructor(
    private facade: AssetTypeFacade,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.facade.loadAll();

    this.assetType$.subscribe((response) => {
      response.map((obj) => {
        const assetType: AssetTypeExtension = {
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
        this.assetTypes.push(assetType);
        console.log(this.assetTypes);
      });
      console.log(this.assetTypes);
      this.changeDetectorRef.markForCheck();
    });
    this.assetData$.subscribe((x) => {
      console.log(x);
    });
    this.filter.next('ASSET');

    setTimeout(() => {
      this.filter.next('SUB_ASSET');
    }, 4000);
  }

  createMake(assetType: AssetTypeExtension): void {
    this.dataService.selectedTypeId = assetType.id;
    this.router
      .navigate(['/configuration/asset-configuration/add-make'])
      .then();
  }

  createModel(make: MakeExtension): void {
    this.dataService.selectedMakeId = make.id;
    this.router
      .navigate(['/configuration/asset-configuration/add-model'])
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
  }

  onMakeClick(make: MakeExtension): void {
    if (make.isSelected) {
      make.isSelected = false;
      make.iconSvgClass = 'right-arrow';
    } else {
      make.isSelected = true;
      make.iconSvgClass = 'down-arrow';
    }
  }

  onModelClick(model: ModelExtension): void {
    if (model.isSelected) {
      model.isSelected = false;
    } else {
      model.isSelected = true;
    }
  }

  getStatusColor(status: boolean): string {
    if (status) {
      return '#0DA06E';
    } else {
      return '#868686';
    }
  }

  ngOnDestroy(): void {
    // this.getAssetTypeSubscription?.unsubscribe();
  }
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

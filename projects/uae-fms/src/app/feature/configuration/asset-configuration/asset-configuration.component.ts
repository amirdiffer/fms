import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject, Subscription, SubscriptionLike } from 'rxjs';
import { AssetConfigurationService } from './asset-configuration.service';
// import {
//   AssetConfigurationFacade,
//   AssetTypeFacade
// } from '../+state/asset-configuration';

import { AccessoryTypeFacade, AssetTypeFacade, SubAssetTypeFacade } from '../+state/fleet-configuration/index'
import { FilterCardSetting } from '@core/filter';
import { Make, MakeModel, MakeModelTrim } from '@models/asset-type.model';
import { map } from 'rxjs/operators';
import { TableComponent } from '@core/table';
import { Router } from '@angular/router';
import { DataService } from '@feature/configuration/asset-configuration/data.service';
@Component({
  selector: 'anms-asset-configuration',
  templateUrl: './asset-configuration.component.html',
  styleUrls: ['./asset-configuration.component.scss']
})
export class AssetConfigurationComponent implements OnInit, OnDestroy {
  //#region Variables
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  searchIcon = 'assets/icons/search-solid.svg';
  downloadBtn = 'assets/icons/download-solid.svg';

  activeTypeCategory: string = 'ASSET';

  filterCard: FilterCardSetting[] = [
    {
      filterTitle: 'statistic.total',
      filterCount: '356',
      filterTagColor: '#6EBFB5',
      filterSupTitle: 'statistic.part',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.available',
      filterCount: '124',
      filterTagColor: '#6870B4',
      filterSupTitle: 'statistic.part',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.unavailable',
      filterCount: '12',
      filterTagColor: '#BA7967',
      filterSupTitle: 'statistic.part',
      onActive(index: number) {}
    }
  ];

  assetConfigurationableSetting = {
    columns: [
      {
        lable: 'tables.column.category',
        field: 'name',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.type_status',
        field: 'isActive',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.description',
        field: 'typeDescription',
        width: 100,
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: '<img src="assets/icons/car-solid.svg">',
        type: 1,
        isIconLable: true,
        field: 'makes',
        width: 100
      },
      {
        lable: '',
        field: 'floatButton',
        width: 0,
        type: 1,
        thumbField: '',
        renderer: 'floatButton'
      }
    ],
    data: [],
    rowSettings: {
      onClick: (col, data, button?) => { },
      floatButton: [
        {
          onClick: (col, data) => {
            this.router.navigate(
              ['/configuration/edit-asset-configuration/' + data.id]
            );
          },
          button: 'edit'
        }
      ]
    } || {}
  };
  addOpen;
  addOpen$: Subscription;
  dataTable = [];
  tableData$ = new Subject<any>()
  assetType$:Subscription;
  subAssetType$:Subscription;
  accessoryType$:Subscription;
  assetType:IConfigurationTable[];
  subAssetType:IConfigurationTable[];
  accessoryType:IConfigurationTable[];
  assetConfiguration$ = this._assetTypefacade.assetType$;
  //#endregion

  constructor(
    private _assetTypefacade: AssetTypeFacade,
    private _accessoryTypeFacade: AccessoryTypeFacade,
    private _subAssetTypeFacade: SubAssetTypeFacade,
    public router: Router,
    // private assetConfigurationFacade: AssetConfigurationFacade,
    private _assetConfigurationService: AssetConfigurationService,
    private _dataService: DataService
  ) {}

  ngOnInit(): void {
    this._assetTypefacade.loadAll();
    this._accessoryTypeFacade.loadAll();
    this._subAssetTypeFacade.loadAll();
    this.assetType$ = this._assetTypefacade.assetType$.subscribe(
      (x) => {
        console.log(x)
        this.assetType = x.map(
          y => {
            const value = {
              isSelected: false,
              iconSvgClass: 'right-arrow',
              name : y.name,
              description: y.description,
              isActive: y.isActive,
              numberOfAsset:+y.makes.length
            }
            return value
          }
        )
        if(this.activeTypeCategory == "ASSET"){
          this.tableData$.next(this.assetType);
        }
      }
    );
    this.subAssetType$ = this._subAssetTypeFacade.subAssetType$.subscribe(
      (x) => {
        this.subAssetType = x.map(
          y => {
            const value = {
              isSelected: false,
              iconSvgClass: 'right-arrow',
              name : y.name,
              description: y.description,
              isActive: y.isActive,
              numberOfAsset:+y.makes.length
            }
            
            return value
          }
        )
      }
    );
    this.accessoryType$= this._accessoryTypeFacade.accessoryType$.subscribe(
      (x) => {
        this.accessoryType = x.map(
          y => {
            const value = {
              name : y.name,
              description: y.description,
              isActive: y.isActive,
            }
            return value
          }
        )
      }
    );
    this._dataService.watchType().subscribe((x) => {
      this.activeTypeCategory = x;
      switch (x) {
        case 'ASSET':
          this.tableData$.next(this.assetType);
          break;
        case 'SUB_ASSET':
          this.tableData$.next(this.subAssetType);
          break;
        case 'ACCESSORY':
          this.tableData$.next(this.accessoryType);
          break;
        default:
          break;
      }
      this.filterTable();
    });
    this.addOpen$ = this._assetConfigurationService
      .getAddForm()
      .subscribe((open) => {
        this.addOpen = open;
      });
  }

  openAdd() {
    this._assetConfigurationService.loadAddForm(true);
  }

  makes(makes: Make[]): void {
    this.assetConfigurationableSetting = {
      columns: [
        {
          lable: 'tables.column.make',
          field: 'name',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.description',
          field: 'description',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.models',
          field: 'models',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        }
      ],
      data: [],
      rowSettings: {}
    };
    const data = [];
    makes.map((make) => {
      const x = {
        ...make,
        models: make.models.length
      };
      data.push(x);
    });
    this.assetConfigurationableSetting.data = data;
  }

  models(models: MakeModel[]): void {
    this.assetConfigurationableSetting = {
      columns: [
        {
          lable: 'tables.column.model',
          field: 'name',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.description',
          field: 'description',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.trims',
          field: 'trims',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        }
      ],
      data: [],
      rowSettings: {}
    };
    const data = [];
    models.map((model) => {
      const x = {
        ...model,
        trims: model.trims ? model.trims.length : null
      };
      data.push(x);
    });
    this.assetConfigurationableSetting.data = data;
  }

  trims(trims: MakeModelTrim[]): void {
    this.assetConfigurationableSetting = {
      columns: [
        {
          lable: 'tables.column.trim',
          field: 'name',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.color',
          field: 'color',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: 'trimColorRenderer'
        },
        {
          lable: 'tables.column.status',
          field: 'status',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        }
      ],
      data: [],
      rowSettings: {}
    };
    const data = [];
    trims? (trims.map((trim) => {
      data.push({
        name: trim.name,
        color: trim.colors,
        status: 'Available'
      })
      this.assetConfigurationableSetting.data = data;
    })):null
  }

  exportTable() {
    this.table.exportTable(this.assetConfigurationableSetting, 'Asset Type');
  }

  eventPagination() {
    // this.assetConfigurationFacade.loadAll();
  }

  filterTable(): void {
    if(this.activeTypeCategory == 'ACCESSORY') {
      this.assetConfigurationableSetting.columns = [
        {
          lable: 'tables.column.category',
          field: 'name',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.type_status',
          field: 'isActive',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.description',
          field: 'description',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: '',
          field: 'floatButton',
          width: 0,
          type: 1,
          thumbField: '',
          renderer: 'floatButton'
        }
      ]
    }else{
      this.assetConfigurationableSetting.columns = [
        {
          lable: 'tables.column.category',
          field: 'name',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.type_status',
          field: 'isActive',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.description',
          field: 'description',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: '<img src="assets/icons/car-solid.svg">',
          type: 1,
          isIconLable: true,
          field: 'numberOfAsset',
          width: 100
        },
        {
          lable: '',
          field: 'floatButton',
          width: 0,
          type: 1,
          thumbField: '',
          renderer: 'floatButton'
        }
      ]
    }
  }


  checkType(){
  }
  ngOnDestroy() {
    this.addOpen$.unsubscribe();
    this.assetConfigurationableSetting.data = [];
  }
}

export interface IConfigurationTable {
  isSelected?: boolean;
  iconSvgClass?:string;
  name:string;
  isActive:boolean;
  description: string;
  numberOfAsset?:number;
}

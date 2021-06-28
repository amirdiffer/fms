import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable, of, Subject, Subscription, SubscriptionLike } from 'rxjs';
import { AssetConfigurationService } from './asset-configuration.service';

import { AccessoryTypeFacade } from '../+state/fleet-configuration/accessory-type';
import { AssetTypeFacade } from '../+state/fleet-configuration/asset-type';
import { SubAssetTypeFacade } from '../+state/fleet-configuration/sub-asset-type';
import { FilterCardSetting } from '@core/filter';
import { Make, MakeModel, MakeModelTrim } from '@models/asset-type.model';
import { map } from 'rxjs/operators';
import { TableComponent } from '@core/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from '@feature/configuration/asset-configuration/data.service';
import { AssetTypeComponent } from './asset-type/asset-type.component';
@Component({
  selector: 'anms-asset-configuration',
  templateUrl: './asset-configuration.component.html',
  styleUrls: ['./asset-configuration.component.scss']
})
export class AssetConfigurationComponent implements OnInit, OnDestroy {
  //#region Variables
  @ViewChild(TableComponent, { static: false }) table: TableComponent;
  @ViewChild(AssetTypeComponent, { static: false })
  AssetTypeComponent: AssetTypeComponent;

  searchIcon = 'assets/icons/search-solid.svg';
  downloadBtn = 'assets/icons/download-solid.svg';

  activeTypeCategory: string = 'ASSET';

  /* Tables */
  data$: Observable<any>;
  typeCategoryTableSetting = {
    columns: [
      {
        lable: 'tables.column.category',
        field: 'name',
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.type_status',
        field: 'isActive',
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.description',
        field: 'description',
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: '<img src="assets/icons/car-solid.svg">',
        type: 1,
        isIconLable: true,
        field: 'numberOfAsset'
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
      onClick: (col, data, button?) => {},
      floatButton: [
        {
          onClick: (col, data) => {
            switch (this.activeTypeCategory) {
              case 'ASSET':
                this.router.navigate(['edit-asset-configuration/' + data.id], {
                  relativeTo: this.activatedRoute
                });
                break;

              case 'SUB_ASSET':
                this.router.navigate(
                  ['edit-sub-asset-configuration/' + data.id],
                  { relativeTo: this.activatedRoute }
                );
                break;

              case 'ACCESSORY':
                this.router.navigate(
                  ['edit-accessory-configuration/' + data.id],
                  { relativeTo: this.activatedRoute }
                );
                break;
            }
          },
          permission: ['FLEET_CONFIGURATION_UPDATE'],
          button: 'edit'
        }
      ]
    }
  };

  makeCategoryTableSetting = {
    columns: [
      {
        lable: 'tables.column.make',
        field: 'name',
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.description',
        field: 'description',
        type: 1,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.models',
        field: 'models',
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
    ],
    data: [],
    rowSettings: {
      onClick: (col, dataArg, button?) => {},
      floatButton: [
        {
          onClick: (col, colData) => {
            this.router
              .navigate(
                [
                  `${this.activeTypeCategory}/edit-make/${this.typeId}/${colData.id}`
                ],
                { relativeTo: this.activatedRoute }
              )
              .then(() => {
                this.AssetTypeComponent.refreshData();
              });
          },
          button: 'edit',
          permission: ['FLEET_CONFIGURATION_UPDATE']
        }
      ]
    }
  };

  modelCategoryTableSetting = {
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
      onClick: (col, dataArg, button?) => {},
      floatButton: [
        {
          onClick: (col, colData) => {
            this.router.navigate(
              [
                `${this.activeTypeCategory}/edit-model/${this.typeId}/${this.makeId}/${colData.id}`
              ],
              { relativeTo: this.activatedRoute }
            );
          },
          button: 'edit',
          permission: ['FLEET_CONFIGURATION_UPDATE']
        }
      ]
    }
  };

  trimCategoryTableSetting = {
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
    ],
    data: [],
    rowSettings: {
      onClick: (col, dataArg, button?) => {},
      floatButton: [
        {
          onClick: (col, colData) => {
            this.router.navigate(
              [
                `${this.activeTypeCategory}/edit-trim/${this.typeId}/${this.makeId}/${this.modelId}/${colData.id}`
              ],
              { relativeTo: this.activatedRoute }
            );
          },
          button: 'edit',
          permission: ['FLEET_CONFIGURATION_UPDATE']
        }
      ]
    }
  };

  assetConfigurationableSetting = {
    columns: [],
    data: [],
    rowSettings: {}
  };

  addOpen;
  addOpen$: Subscription;
  dataTable = [];
  tableData$ = new Subject<any>();
  assetType$: Subscription;
  subAssetType$: Subscription;
  accessoryType$: Subscription;
  assetType: IConfigurationTable[];
  subAssetType: IConfigurationTable[];
  accessoryType: IConfigurationTable[];
  assetConfiguration$ = this._assetTypefacade.assetType$;
  //#endregion

  /* Ids */
  typeId;
  makeId;
  modelId;
  trimId;
  constructor(
    private _assetTypefacade: AssetTypeFacade,
    private _accessoryTypeFacade: AccessoryTypeFacade,
    private _subAssetTypeFacade: SubAssetTypeFacade,
    public router: Router,
    private _assetConfigurationService: AssetConfigurationService,
    private _dataService: DataService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    /* Load All type */
    this._assetTypefacade.loadAll();
    this._accessoryTypeFacade.loadAll();
    this._subAssetTypeFacade.loadAll();

    /* Async Data */
    this._dataService.watchType().subscribe((type) => {
      this.activeTypeCategory = type;
      this.typeChanger(type);
    });

    /* Render First Table Setting */
    this.assetConfigurationableSetting.columns = this.typeCategoryTableSetting.columns;
    this.assetConfigurationableSetting.rowSettings = this.typeCategoryTableSetting.rowSettings;
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
    if (this.activeTypeCategory == 'ASSET') {
      let typeId: number;
      let makeId: number;
      let modelId: number;
      const queryParamsSubscription = this.activatedRoute.queryParams.subscribe(
        (queryParams: Params) => {
          typeId = queryParams.type;
          makeId = queryParams.make;
          modelId = queryParams.model;
        }
      );
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
        rowSettings: {}
      };
      const data = [];
      trims
        ? trims.map((trim) => {
            data.push({
              name: trim.name,
              color: trim.colors,
              status: 'Available'
            });
            this.assetConfigurationableSetting.data = data;
            this.assetConfigurationableSetting.rowSettings = {
              onClick: (col, dataArg, button?) => {},
              floatButton: [
                {
                  onClick: (col, colData) => {
                    this.router
                      .navigate([
                        '/configuration/asset-configuration/edit-trim/' +
                          typeId +
                          '/' +
                          makeId +
                          '/' +
                          modelId
                      ])
                      .then((_) => {
                        queryParamsSubscription?.unsubscribe();
                      });
                  },
                  permission: ['FLEET_CONFIGURATION_UPDATE'],
                  button: 'edit'
                }
              ]
            };
          })
        : null;
      // queryParamsSubscription.unsubscribe()
    }
  }

  exportTable() {
    let filterSetting = [];
    this.assetConfigurationableSetting.columns.forEach((x) => {
      if (x.renderer != 'floatButton') {
        if (!x.isIconLable) {
          filterSetting.push(x.field);
        }
      }
    });
    let filter = {
      ...filterSetting
    };

    this.table.exportTable(
      this.assetConfigurationableSetting,
      'Export',
      filter
    );
  }

  eventPagination() {
    // this.assetConfigurationFacade.loadAll();
  }

  /* Show Manufacture data in table */
  makesTable(makes) {
    this.typeId = makes.typeId;
    this.assetConfigurationableSetting.columns = this.makeCategoryTableSetting.columns;
    this.assetConfigurationableSetting.rowSettings = this.makeCategoryTableSetting.rowSettings;
    let data = makes.makes.map((x) => {
      return {
        ...x,
        models: x.models.length
      };
    });
    this.data$ = of(data);
  }

  /* Show Models data in table */
  modelTable(models) {
    this.makeId = models.makeId;
    this.assetConfigurationableSetting.columns = this.modelCategoryTableSetting.columns;
    this.assetConfigurationableSetting.rowSettings = this.modelCategoryTableSetting.rowSettings;
    let data = models.models.map((x) => {
      return {
        ...x,
        trims: this.activeTypeCategory == 'ASSET' ? x.trims.length : ''
      };
    });
    this.data$ = of(data);
  }

  /* Show Trims data in table */
  trimTable(trims) {
    this.modelId = trims.modelId;
    if (this.activeTypeCategory == 'SUB_ASSET') return;
    this.assetConfigurationableSetting.columns = this.trimCategoryTableSetting.columns;
    this.assetConfigurationableSetting.rowSettings = this.trimCategoryTableSetting.rowSettings;
    let data = trims.trims.map((x) => {
      return {
        ...x,
        name: x.name,
        color: x.colors
      };
    });
    this.data$ = of(data);
  }

  /* Filter for accessory Type */
  filterTable(): void {
    if (this.activeTypeCategory == 'ACCESSORY') {
      this.assetConfigurationableSetting.columns = [
        {
          lable: 'tables.column.category',
          field: 'name',
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.type_status',
          field: 'isActive',
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.description',
          field: 'description',
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
      ];
    } else {
      this.assetConfigurationableSetting.columns = [
        {
          lable: 'tables.column.category',
          field: 'name',
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.type_status',
          field: 'isActive',
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.description',
          field: 'description',
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: '<img src="assets/icons/car-solid.svg">',
          type: 1,
          isIconLable: true,
          field: 'numberOfAsset'
        },
        {
          lable: '',
          field: 'floatButton',
          width: 0,
          type: 1,
          thumbField: '',
          renderer: 'floatButton'
        }
      ];
    }
  }

  typeChanger(type) {
    this.filterTable();
    switch (type) {
      case 'ASSET':
        this.data$ = this._assetTypefacade.assetType$.pipe(
          map((x) => {
            return x.map((y) => {
              let numberOfAsset = y.makes.length;
              return {
                ...y,
                id: y.id,
                isSelected: false,
                iconSvgClass: 'right-arrow',
                name: y.name,
                description: y.description,
                isActive: y.isActive,
                numberOfAsset: numberOfAsset
              };
            });
          })
        );
        break;
      case 'SUB_ASSET':
        this.data$ = this._subAssetTypeFacade.subAssetType$.pipe(
          map((x) => {
            return x.map((y) => {
              let numberOfAsset = y.makes.length;
              return {
                ...y,
                id: y.id,
                isSelected: false,
                iconSvgClass: 'right-arrow',
                name: y.name,
                description: y.description,
                isActive: y.isActive,
                numberOfAsset: numberOfAsset
              };
            });
          })
        );
        break;
      case 'ACCESSORY':
        this.data$ = this._accessoryTypeFacade.accessoryType$.pipe(
          map((x) => {
            return x.map((y) => {
              return {
                ...y,
                id: y.id,
                isSelected: false,
                iconSvgClass: 'right-arrow',
                name: y.name,
                description: y.description,
                isActive: y.isActive
              };
            });
          })
        );
        break;
    }
  }
  ngOnDestroy() {
    this.addOpen$?.unsubscribe();
    this.assetConfigurationableSetting.data = [];
  }
}

export interface IConfigurationTable {
  isSelected?: boolean;
  iconSvgClass?: string;
  name: string;
  isActive: boolean;
  description: string;
  numberOfAsset?: number;
}

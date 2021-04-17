import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AssetConfigurationService } from './asset-configuration.service';
import { AssetConfigurationFacade, AssetTypeFacade } from '../+state/asset-configuration';
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
      onActive(index: number) { }
    },
    {
      filterTitle: 'statistic.available',
      filterCount: '124',
      filterTagColor: '#6870B4',
      filterSupTitle: 'statistic.part',
      onActive(index: number) { }
    },
    {
      filterTitle: 'statistic.unavailable',
      filterCount: '12',
      filterTagColor: '#BA7967',
      filterSupTitle: 'statistic.part',
      onActive(index: number) { }
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
      }
    ],
    data: []
  };
  addOpen;
  addOpen$: Subscription;
  dataTable = [];

  assetType$ = this.facade.assetType$.pipe(
    map((response) => {
      this.dataTable = response.map((obj) => {
        const assetType = {
          ...obj,
          isSelected: false,
          iconSvgClass: 'right-arrow',
          makes: obj.makes.length
        };
        return assetType;
      });
      this.filterTable();
      return response.map((obj) => {
        const assetType = {
          ...obj,
          isSelected: false,
          iconSvgClass: 'right-arrow',
          makes: obj.makes.length
        };
        return assetType;
      })
    })
  );

  assetConfiguration$ = this.facade.assetType$;
  //#endregion

  constructor(
    private facade: AssetTypeFacade,
    public router: Router,
    private assetConfigurationFacade: AssetConfigurationFacade,
    private _assetConfigurationService: AssetConfigurationService,
    private _dataService: DataService,
  ) {}

  ngOnInit(): void {
    this._dataService.watchType().subscribe((x) => {
      this.activeTypeCategory = x;
      this.filterTable();
    });
    this.assetConfigurationFacade.loadAll();
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
          field: 'make',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.description',
          field: 'makeDescription',
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
      data: []
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
          field: 'model',
          width: 100,
          type: 1,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.description',
          field: 'modelDescription',
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
      data: []
    };
    const data = [];
    models.map((model) => {
      const x = {
        ...model,
        trims: model.trims.length
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
          field: 'trim',
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
      data: []
    };
    const data = [];
    trims.map((trim) => {
      data.push({
        trim: trim.trim,
        color: trim.colors,
        status: 'Available'
      });
      this.assetConfigurationableSetting.data = data;
    });
  }

  exportTable() {
    this.table.exportTable(this.assetConfigurationableSetting, 'Asset Type');
  }

  eventPagination() {
    this.assetConfigurationFacade.loadAll();
  }

  filterTable(): void {
    this.assetConfigurationableSetting = {
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
        }
      ],
      data: []
    };
    this.assetConfigurationableSetting.data = this.dataTable.filter(x => x.type == this.activeTypeCategory);
  }

  ngOnDestroy() {
    this.addOpen$.unsubscribe();
    this.assetConfigurationableSetting.data = [];
  }
}

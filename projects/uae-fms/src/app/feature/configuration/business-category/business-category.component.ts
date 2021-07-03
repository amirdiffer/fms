import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ColumnType, TableComponent, TableSetting } from '@core/table';
import { BusinessCategoryFacade } from '../+state/business-category';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterType } from '@core/table/table.component';

@Component({
  selector: 'anms-business-category',
  templateUrl: './business-category.component.html',
  styleUrls: ['./business-category.component.scss']
})
export class BusinessCategoryComponent implements OnInit, OnDestroy {
  //#region Variables
  @ViewChild(TableComponent, { static: false }) table: TableComponent;
  getBusinessCategorySubscription!: Subscription;
  filtersColumns = [];
  showCustomFilter = false;

  downloadBtn = 'assets/icons/download-solid.svg';
  businessCategory$ = this.facade.businessCategory$.pipe(
    map((x) =>
      x.map((responseObject: any) => {
        return {
          id: responseObject.id,
          Category_Name: responseObject.name,
          Status: responseObject.status,
          Description: responseObject.description,
          Asset_Type: responseObject.assetConfigurationName,
          Sub_Asset: responseObject.numOfSubAssetConfigurations,
          Accessory: responseObject.numOfAccessoryConfigurations,
          assetTypeName: responseObject.assetTypeName
        };
      })
    )
  );

  businessCategory_Table: TableSetting = {
    name: 'businessCategory',
    columns: [
      {
        lable: 'tables.column.category_name',
        type: 1,
        field: 'Category_Name',
        filterApiKey: 'name'
      },
      {
        lable: 'tables.column.status',
        type: 1,
        field: 'Status',
        renderer: 'statusRenderer',
        filterApiKey: 'status',
        filterType: FilterType.status
      },
      {
        lable: 'tables.column.description',
        type: 1,
        field: 'Description',
        filterApiKey: 'description'
      },
      {
        lable: 'tables.column.asset_type',
        type: 1,
        field: 'Asset_Type',
        filterApiKey: 'assetConfiguration'
      },
      {
        lable: 'tables.column.num_subasset',
        type: 1,
        field: 'Sub_Asset',
        filterApiKey: 'subAssetConfigurations'
      },
      {
        lable: 'tables.column.num_accessory',
        type: 1,
        field: 'Accessory',
        filterApiKey: 'accessoryConfigurations'
      },
      {
        lable: '',
        field: 'floatButton',
        width: 0,
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'floatButton'
      }
    ],
    data: [],
    rowSettings: {
      floatButton: [
        {
          button: 'edit',
          color: '#3F3F3F',
          onClick: (col, data, button?) => {
            this.router
              .navigate([
                '/configuration/usage-category/edit-usage-category/' + data.id
              ])
              .then();
          },
          permission: ['BUSINESS_CATEGORY_UPDATE']
        }
      ]
    }
  };
  //#endregion

  constructor(private facade: BusinessCategoryFacade, private router: Router) { }

  ngOnInit(): void {
    this.setFiltersColumns();
    this.facade.loadAll();
  }

  ngOnDestroy(): void {
    this.getBusinessCategorySubscription?.unsubscribe();
  }

  exportTable() {
    let filter = {
      Category_Name: 'Category_Name',
      Status: 'Status',
      Description: 'Description',
      Asset_Type: 'Asset_Type',
      Sub_Asset: 'Sub_Asset',
      Accessory: 'Accessory'
    };
    this.table.exportTable(
      this.businessCategory_Table,
      'Business Category',
      filter
    );
  }

  eventPagination() {
    this.facade.loadAll();
  }

  setFiltersColumns() {
    let removeField = [];
    let filtersColumns = Object.values({
      ...this.businessCategory_Table.columns
    });
    let addition = [];
    filtersColumns = filtersColumns.concat(addition);
    this.filtersColumns = filtersColumns.filter(
      (x) => !removeField.includes(x['field'])
    );
  }

  customFilterEvent(data: object[]) {
    this.facade.loadAll();
  }
}

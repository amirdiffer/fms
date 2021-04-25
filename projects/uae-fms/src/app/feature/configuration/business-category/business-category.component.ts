import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ColumnType, TableComponent, TableSetting } from '@core/table';
import { BusinessCategoryFacade } from '../+state/business-category';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'anms-business-category',
  templateUrl: './business-category.component.html',
  styleUrls: ['./business-category.component.scss']
})
export class BusinessCategoryComponent implements OnInit, OnDestroy {
  //#region Variables
  @ViewChild(TableComponent, { static: false }) table: TableComponent;
  getBusinessCategorySubscription!: Subscription;

  downloadBtn = 'assets/icons/download-solid.svg';
  businessCategory$ = this.facade.businessCategory$.pipe(
    map((x) =>
      x.map((responseObject) => {
        return {
          id: responseObject.id,
          Category_Name: responseObject.name,
          Status: responseObject.status,
          Description: responseObject.description,
          Asset_Type: responseObject.assetTypeId,
          Sub_Asset: responseObject.numOfSubAssets,
          Accessory: responseObject.numOfAccessories,
          assetTypeName: responseObject.assetTypeName
        };
      })
    )
  );

  businessCategory_Table: TableSetting = {
    columns: [
      { lable: 'tables.column.category_name', type: 1, field: 'Category_Name' },
      { lable: 'tables.column.status', type: 1, field: 'Status' },
      { lable: 'tables.column.description', type: 1, field: 'Description' },
      { lable: 'tables.column.asset_type', type: 1, field: 'Asset_Type' },
      { lable: 'tables.column.sub_asset', type: 1, field: 'Sub_Asset' },
      { lable: 'tables.column.accessory', type: 1, field: 'Accessory' },
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
      onClick: (col, data, button?) => {
        this.router
          .navigate(
            ['/configuration/usage-category/edit-usage-category/'+data.id])
          .then();
      },
      floatButton: [
        {
          button: 'edit',
          color: '#3F3F3F'
        }
      ]
    }
  };
  //#endregion

  constructor(private facade: BusinessCategoryFacade, private router: Router) {}

  ngOnInit(): void {
    this.facade.loadAll();
  }

  ngOnDestroy(): void {
    this.getBusinessCategorySubscription?.unsubscribe();
  }

  exportTable() {
    this.table.exportTable(this.businessCategory_Table, 'Business Category');
  }

  eventPagination() {
    this.facade.loadAll();
  }
}

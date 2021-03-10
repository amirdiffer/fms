import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { TableSetting } from '@core/table';
import { BusinessCategoryFacade } from '../+state/business-category';
import { Subscription } from 'rxjs';

@Component({
  selector: 'anms-business-category',
  templateUrl: './business-category.component.html',
  styleUrls: ['./business-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessCategoryComponent implements OnInit, OnDestroy {
  getBusinessCategorySubscription!: Subscription;

  downloadBtn = 'assets/icons/download-solid.svg';
  businessCategory_Table: TableSetting = {
    columns: [
      { lable: 'tables.column.category_name', type: 1, field: 'Category_Name' },
      { lable: 'tables.column.status', type: 1, field: 'Status' },
      { lable: 'tables.column.description', type: 1, field: 'Description' },
      { lable: 'tables.column.asset_type', type: 1, field: 'Asset_Type' },
      { lable: 'tables.column.sub_asset', type: 1, field: 'Sub_Asset' },
      { lable: 'tables.column.accessory', type: 1, field: 'Accessory' }
    ],
    data: [
      {
        Category_Name: 'Category Name is here',
        Status: 'Active',
        Description: 'Text is here',
        Asset_Type: 'Car',
        Sub_Asset: '12',
        Accessory: '24'
      },
      {
        Category_Name: 'Category Name is here',
        Status: 'Active',
        Description: 'Text is here',
        Asset_Type: 'Car',
        Sub_Asset: '12',
        Accessory: '24'
      },
      {
        Category_Name: 'Category Name is here',
        Status: 'Active',
        Description: 'Text is here',
        Asset_Type: 'Car',
        Sub_Asset: '12',
        Accessory: '24'
      },
      {
        Category_Name: 'Category Name is here',
        Status: 'Active',
        Description: 'Text is here',
        Asset_Type: 'Car',
        Sub_Asset: '12',
        Accessory: '24'
      },
      {
        Category_Name: 'Category Name is here',
        Status: 'Active',
        Description: 'Text is here',
        Asset_Type: 'Car',
        Sub_Asset: '12',
        Accessory: '24'
      },
      {
        Category_Name: 'Category Name is here',
        Status: 'Active',
        Description: 'Text is here',
        Asset_Type: 'Car',
        Sub_Asset: '12',
        Accessory: '24'
      },
      {
        Category_Name: 'Category Name is here',
        Status: 'Active',
        Description: 'Text is here',
        Asset_Type: 'Car',
        Sub_Asset: '12',
        Accessory: '24'
      }
    ]
  };

  constructor(private facade: BusinessCategoryFacade) {}

  ngOnInit(): void {
    this.facade.loadAll();

    this.getBusinessCategorySubscription = this.facade.businessCategory$.subscribe(
      (response) => {
        console.log(response);
        this.businessCategory_Table.data = [];
        response.map((responseObject) => {
          const trafficFineTableData = {
            Category_Name: responseObject.name,
            Status: responseObject.status,
            Description: responseObject.description,
            Asset_Type: responseObject.assetTypeId,
            Sub_Asset: responseObject.subAssetsCount,
            Accessory: responseObject.accessoriesCount
          };
          this.businessCategory_Table.data.push(trafficFineTableData);
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.getBusinessCategorySubscription?.unsubscribe();
  }
}

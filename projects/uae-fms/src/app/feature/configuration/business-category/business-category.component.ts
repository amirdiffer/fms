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
      { lable: 'Category Name', type: 1, field: 'Category_Name' },
      { lable: 'Status', type: 1, field: 'Status' },
      { lable: 'Description', type: 1, field: 'Description' },
      { lable: 'Asset Type', type: 1, field: 'Asset_Type' },
      { lable: 'Sub Asset', type: 1, field: 'Sub_Asset' },
      { lable: 'Accessory', type: 1, field: 'Accessory' }
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
      }
    );
  }

  ngOnDestroy(): void {
    this.getBusinessCategorySubscription?.unsubscribe();
  }
}

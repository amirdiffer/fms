import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ColumnType, TableSetting } from '@core/table';
import { BusinessCategoryFacade } from '../+state/business-category';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'anms-business-category',
  templateUrl: './business-category.component.html',
  styleUrls: ['./business-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessCategoryComponent implements OnInit, OnDestroy {
  getBusinessCategorySubscription!: Subscription;

  downloadBtn = 'assets/icons/download-solid.svg';
  businessCategory$ = this.facade.businessCategory$.pipe(map(x => x.map((responseObject) => {
    return {
      Category_Name: responseObject.name,
      Status: responseObject.status,
      Description: responseObject.description,
      Asset_Type: responseObject.assetTypeId,
      Sub_Asset: responseObject.numOfSubAssets,
      Accessory: responseObject.numOfAccessories
    };
  })));

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
        console.log(col, data, button);
        this.dataService.dataToEditFromTable = data;
        this.dataService.isEditing = true;
        this.router
          .navigate(['/configuration/business-category/add-business-category'])
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

  constructor(
    private facade: BusinessCategoryFacade,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.facade.loadAll();
  }

  ngOnDestroy(): void {
    this.getBusinessCategorySubscription?.unsubscribe();
  }
}

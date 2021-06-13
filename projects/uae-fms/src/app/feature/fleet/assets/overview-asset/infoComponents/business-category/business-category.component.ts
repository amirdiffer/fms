import { Component, Input, OnInit } from '@angular/core';
import { ColumnType } from '@core/table';
import { ActivatedRoute } from '@angular/router';
import {
  BusinessCategoryService
} from '@feature/configuration/+state/business-category';

@Component({
  selector: 'app-asset-overview-business-category',
  templateUrl: './business-category.component.html',
  styleUrls: ['./business-category.component.scss']
})
export class BusinessCategoryComponent implements OnInit {
  @Input() bcID;

  assetId = this.route.snapshot.params['id'];
  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';
  penIcon = 'assets/icons/pencil.svg';
  business_category = {
    columns: [
      {
        lable: 'tables.column.item',
        field: 'item',
        type: ColumnType.lable,
        thumbField: ''
      },
      {
        lable: 'tables.column.type',
        field: 'type',
        type: ColumnType.lable,
        thumbField: ''
      },
      {
        lable: 'tables.column.quantity',
        field: 'quantity',
        type: ColumnType.lable,
        sortable: true,
        thumbField: ''
      },
      {
        lable: 'tables.column.description',
        field: 'description',
        type: ColumnType.lable,
        thumbField: ''
      },
      {
        lable: 'tables.column.attachment',
        type: 1,
        field: 'attachment',
        renderer: 'downloadButtonRenderer'
      }
    ],
    data: [],
    rowSettings: {
      floatButton: []
    }
  };

  constructor(
    private route: ActivatedRoute,
    private businessCategoryService: BusinessCategoryService
  ) {}

  ngOnInit(): void {
    this.businessCategoryService.getOne(this.bcID).subscribe((x) => {
      let data_subAsset = (<Array<object>>(
        x.message['bcSubAssetConfigurations']
      )).map((d) => {
        return {
          item: 'Test',
          type: 'Sub Asset'
        };
      });
      let data_accessories = (<Array<object>>(
        x.message['bcAccessoryConfigurations']
      )).map((d) => {
        return {
          item: 'Test',
          type: 'Accessory'
        };
      });
      let data = (<Array<object>>data_subAsset).concat(data_accessories);
      this.business_category.data = data.map((d) => {
        return {
          item: d['item'],
          type: d['type'],
          quantity: d['quantity'],
          description: 'Description is Here',
          attachment: [1]
        };
      });
    });
  }
}

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injector
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableSetting } from '@core/table';
import { Utility } from '@shared/utility/utility';
import { BusinessCategoryFacade } from '../../+state/business-category';
import { IBusinessCategoryPostModel } from '@models/business-category.model';

@Component({
  selector: 'anms-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCategoryComponent extends Utility implements OnInit {
  addCategory_Table: TableSetting = {
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

  addCategoryForm: FormGroup;
  submited = false;
  assetTypes = [
    { name: 'Asset type 1', id: 1 },
    { name: 'Asset type 2', id: 2 },
    { name: 'Asset type 3', id: 3 },
    { name: 'Asset type 4', id: 4 },
    { name: 'Asset type 5', id: 5 },
    { name: 'Asset type 6', id: 6 }
  ];
  subAssets = [
    { name: 'Asset type 1', id: 1 },
    { name: 'Asset type 2', id: 2 },
    { name: 'Asset type 3', id: 3 },
    { name: 'Asset type 4', id: 4 },
    { name: 'Asset type 5', id: 5 },
    { name: 'Asset type 6', id: 6 }
  ];

  accessories = [
    { name: 'Accessory 1', id: 1 },
    { name: 'Accessory 2', id: 2 },
    { name: 'Accessory 3', id: 3 },
    { name: 'Accessory 4', id: 4 },
    { name: 'Accessory 5', id: 5 },
    { name: 'Accessory 6', id: 6 }
  ];

  constructor(
    private _fb: FormBuilder,
    private facade: BusinessCategoryFacade,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.addCategoryForm = this._fb.group({
      name: ['', [Validators.required]],
      assetType: ['', [Validators.required]],
      activeCategory: [''],
      description: [''],
      subAsset: ['', [Validators.required]],
      assetQuantity: [''],
      accessory: ['', [Validators.required]],
      accessoryQuantity: ['']
    });
  }
  submit() {
    this.submited = true;
    if (this.addCategoryForm.invalid) {
      return;
    }

    const formValues = this.addCategoryForm.value;

    const contentToPost: IBusinessCategoryPostModel = {
      name: formValues.name,
      assetTypeId: formValues.assetType.id,
      status: formValues.activeCategory,
      description: formValues.description,
      subAssets: [
        {
          subAssetId: formValues.subAsset.id,
          quantity: 0,
          specDocId: 0
        }
      ],
      accessories: [
        {
          accessoryId: formValues.accessory.id,
          quantity: 0,
          specDocId: 0
        }
      ]
    };

    this.facade.addCategory(contentToPost);
    this.goToList();

    /*
     * the object need by API
     *
     * "name": "<string>",
     * "assetTypeId": "<integer>",
     * "status": "<string>",
     * "description": "<string>",
     * "subAssets": [
     *     {
     *         "subAssetId": "<integer>",
     *         "quantity": "<integer>",
     *         "specDocId": "<integer>"
     *     }
     * ],
     * "accessories": [
     *     {
     *         "accessoryId": "<integer>",
     *         "quantity": "<integer>",
     *         "specDocId": "<integer>"
     *     }
     * ]
     *
     *
     * the object we provide
     *
     * accessory: {name: "Old asset type 1", id: 1}
     * accessoryQuantity: "24"
     * activeCategory: true
     * assetQuantity: "123"
     * assetType:
     * id: 1
     * name: "Old asset type 1"
     * description: "desc"
     * name: "name"
     * subAsset:
     * id: 1
     * name: "Old asset type 1"
     *
     */
  }

  filterAssets(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    this.assetTypes = [
      { name: 'Old asset type 1', id: 1 },
      { name: 'Old asset type 2', id: 2 },
      { name: 'Old asset type 3', id: 3 },
      { name: 'Old asset type 4', id: 4 },
      { name: 'Old asset type 5', id: 5 },
      { name: 'Old asset type 6', id: 6 }
    ];
  }
  filterSubAssets(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    this.subAssets = [
      { name: 'Old asset type 1', id: 1 },
      { name: 'Old asset type 2', id: 2 },
      { name: 'Old asset type 3', id: 3 },
      { name: 'Old asset type 4', id: 4 },
      { name: 'Old asset type 5', id: 5 },
      { name: 'Old asset type 6', id: 6 }
    ];
  }
  filterAccessories(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    this.accessories = [
      { name: 'Old asset type 1', id: 1 },
      { name: 'Old asset type 2', id: 2 },
      { name: 'Old asset type 3', id: 3 },
      { name: 'Old asset type 4', id: 4 },
      { name: 'Old asset type 5', id: 5 },
      { name: 'Old asset type 6', id: 6 }
    ];
  }
}

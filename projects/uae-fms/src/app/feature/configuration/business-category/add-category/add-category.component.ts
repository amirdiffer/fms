import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injector
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableSetting } from '@core/table';
import { Utility } from '@shared/utility/utility';

@Component({
  selector: 'anms-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCategoryComponent extends Utility implements OnInit {
  addCategory_Table: TableSetting = {
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

  addCategoryForm: FormGroup;
  submited = false;

  constructor(private _fb: FormBuilder, injector: Injector) {
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
    this.goToList();
  }
}

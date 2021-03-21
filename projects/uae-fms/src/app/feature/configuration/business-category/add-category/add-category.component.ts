import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injector,
  OnDestroy
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableSetting } from '@core/table';
import { Utility } from '@shared/utility/utility';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { DataService } from '../data.service';

@Component({
  selector: 'anms-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCategoryComponent extends Utility implements OnInit, OnDestroy {
  dialogModal = false;

  dialogSetting: IDialogAlert = {
    header: 'Add Business Category',
    hasError: false,
    message: 'Message is Here',
    confirmButton: 'Register Now',
    cancelButton: 'Cancel'
  };

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
    injector: Injector,
    public dataService: DataService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.addCategoryForm = this._fb.group({
      name: ['', [Validators.required]],
      assetType: ['', [Validators.required]],
      activeCategory: [''],
      description: [''],
      assignSubAsset: new FormArray([this.createAssignSubAsset()]),
      assignAccessory: new FormArray([this.createAssignAccessory()])
    });

    if (this.dataService.isEditing) {
      this.addCategoryForm.patchValue({
        name: this.dataService.dataToEditFromTable.Category_Name,
        assetType: {
          name: this.dataService.dataToEditFromTable.Asset_Type,
          id: 1
        },
        activeCategory:
          this.dataService.dataToEditFromTable.Status === 'Active',
        description: this.dataService.dataToEditFromTable.Description
      });

      this.assignSubAsset.controls[0].patchValue({
        assetQuantity: this.dataService.dataToEditFromTable.Accessory
      });

      this.assignAccessory.controls[0].patchValue({
        accessoryQuantity: this.dataService.dataToEditFromTable.Sub_Asset
      });
    }
  }

  get assignSubAsset(): FormArray {
    return this.addCategoryForm.get('assignSubAsset') as FormArray;
  }

  get assignAccessory(): FormArray {
    return this.addCategoryForm.get('assignAccessory') as FormArray;
  }

  createAssignSubAsset(): FormGroup {
    return this._fb.group({
      subAsset: ['', [Validators.required]],
      assetQuantity: ['']
    });
  }

  createAssignAccessory(): FormGroup {
    return this._fb.group({
      accessory: ['', [Validators.required]],
      accessoryQuantity: ['']
    });
  }

  addAssignSubAsset(): void {
    if (this.assignSubAsset.valid) {
      this.assignSubAsset.push(this.createAssignSubAsset());
    }
  }

  addAssignAccessory(): void {
    if (this.assignAccessory.valid) {
      this.assignAccessory.push(this.createAssignAccessory());
    }
  }

  dialogConfirm(event): void {
    console.log(event);

    this.dialogModal = false;

    if (event && !this.dialogSetting.hasError) {
      this.router.navigate(['/configuration/business-category']).then();
    }
  }

  cancel(): void {
    this.dialogModal = true;
    this.dialogSetting.confirmButton = 'Yes';
    this.dialogSetting.cancelButton = 'No';
    this.dialogSetting.hasError = false;
    this.dialogSetting.isWarning = true;
    this.dialogSetting.message =
      'Are you sure to cancel adding new business category?';
  }

  submit() {
    this.submited = true;
    if (this.addCategoryForm.invalid) {
      return;
    }

    this.dialogModal = true;

    if (this.dataService.isEditing) {
      this.dialogSetting.header = 'Edit Business Category';
      this.dialogSetting.message = 'Business category edited successfully.';
      this.dialogSetting.confirmButton = 'OK';
      this.dialogSetting.cancelButton = undefined;
      return;
    }

    this.dialogSetting.hasError = false;
    this.dialogSetting.message = 'New business category added successfully.';
    this.dialogSetting.confirmButton = 'OK';
    this.dialogSetting.cancelButton = undefined;

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

  ngOnDestroy(): void {
    this.dataService.isEditing = false;
    this.dataService.dataToEditFromTable = undefined;
  }
}

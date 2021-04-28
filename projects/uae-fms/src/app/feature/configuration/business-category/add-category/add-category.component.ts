import { Component, OnInit, Injector } from '@angular/core';
import {
  BusinessCategoryFacade,
  BusinessCategoryService
} from '../../+state/business-category';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { Utility } from '@shared/utility/utility';
import { TableSetting } from '@core/table';
import { map } from 'rxjs/operators';

import { AccessoryFacade } from '@feature/fleet/+state/accessory';
import {
  SubAssetFacade,
  SubAssetService
} from '@feature/fleet/+state/sub-asset';
import { AssetTypeFacade, AssetTypeService } from '../../+state/asset-configuration';

@Component({
  selector: 'anms-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent extends Utility implements OnInit {
  //#region  Dialog
  dialogModal = false;
  dialogMode = null;
  dialogSetting: IDialogAlert = {
    header: 'Add Usage Category',
    hasError: false,
    message: 'Are you sure you want to add new Business Category?',
    confirmButton: 'Register Now',
    cancelButton: 'Cancel'
  };
  //#endregion

  //#region Table
  addCategory_Table: TableSetting = {
    columns: [
      { lable: 'tables.column.category_name', type: 1, field: 'Category_Name' },
      { lable: 'tables.column.status', type: 1, field: 'Status' },
      { lable: 'tables.column.description', type: 1, field: 'Description' },
      { lable: 'tables.column.asset_type', type: 1, field: 'Asset_Type' },
      { lable: 'tables.column.num_sub_asset', type: 1, field: 'Sub_Asset' },
      { lable: 'tables.column.num_accessory', type: 1, field: 'Accessory' }
    ],
    data: []
  };

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

  //#endregion

  //#region Variables
  addCategoryForm: FormGroup;
  submited = false;
  isEditing = false;

  assetTypes = [];
  assetTypesB;
  subAssets = [];
  subAssetsB;
  subAssetMake = []
  subAssetModel = []
  accessories = [];
  accessoriesB;
  id;
  subAssetDocs = [];
  accessoryDocs = [];

  get assignSubAsset(): FormArray {
    return this.addCategoryForm.get('assignSubAsset') as FormArray;
  }

  get assignAccessory(): FormArray {
    return this.addCategoryForm.get('assignAccessory') as FormArray;
  }

  //#endregion

  constructor(
    private _fb: FormBuilder,
    injector: Injector,
    private networkService: BusinessCategoryService,
    private facade: BusinessCategoryFacade,
    private assetTypeFacade: AssetTypeFacade,
    private assetTypeService: AssetTypeService,
  ) {
    super(injector);
  }

  ngOnInit(): void {

    this.assetTypeService.allAsset().subscribe(x => {
      let data = x.message;
      this.assetTypesB = data.map((y) => ({ id: y.id, name: y.name }));
    });

    this.assetTypeService.allAccessory().subscribe((x) => {
      let data = x.message;
      this.accessoriesB = data.map((y) => ({ id: y.id, name: y.name }));
    });

    this.assetTypeService.allSubAsset().subscribe(
      (x) => {
        this.subAssets = x.message.map((y) => ({
          id: y.id,
          name: y.name,
          makes: y.makes
        }));
        this.handleEditMode();
      }
    );

    this.addCategoryForm = this._fb.group({
      name: ['', [Validators.required]],
      assetType: ['', [Validators.required , this.autocompleteValidation]],
      activeCategory: [''],
      description: [''],
      assignSubAsset: new FormArray([this.createAssignSubAsset()]),
      assignAccessory: new FormArray([this.createAssignAccessory()])
    });

    this.facade.submitted$.subscribe((x) => {
      if (x) {
        this.dialogMode = 'cancel';
        this.dialogModal = true;
        this.dialogSetting.header = this.isEditing
          ? 'Edit category'
          : 'Add new category';
        this.dialogSetting.message = this.isEditing
          ? 'Changes Saved Successfully'
          : 'Category Added Successfully';
        this.dialogSetting.isWarning = false;
        this.dialogSetting.hasError = false;
        this.dialogSetting.confirmButton = 'Yes';
        this.dialogSetting.cancelButton = undefined;
      }
    });

    this.facade.error$.subscribe((x) => {
      if (x?.error) {
        this.dialogModal = true;
        this.dialogSetting.header = this.isEditing
          ? 'Edit category'
          : 'Add new category';
        this.dialogSetting.message = 'Error occurred in progress';
        this.dialogSetting.hasError = true;
        this.dialogSetting.cancelButton = undefined;
        this.dialogSetting.confirmButton = 'OK';
      } else {
        this.dialogModal = false;
      }
    });
  }

  handleEditMode(): void {
    const url = this.route.snapshot.url
    if (url.filter((x) => x.path == "edit-usage-category").length > 0) {
      this.isEditing = true;
      this.id = +url[url.length - 1].path;
      this.networkService.getOne(this.id).subscribe((response) => {
        this.addCategoryForm.patchValue({
          name: response.message.name,
          assetType: {
            id: response.message['assetConfigurationId'],
            name: response.message['assetConfigurationeName']
          },
          activeCategory:
            response.message.status.toLocaleLowerCase() === 'active',
          description: response.message.description
        });

        const subAssets = response.message['bcSubAssetConfigurations'];
        for (let i = 0; i < subAssets.length; i++) {
          if (i > 0) {
            this.assignSubAsset.push(this.createAssignSubAsset());
          }
          this.assignSubAsset.controls[i].patchValue({
            subAsset: subAssets[i].subAssetConfigurationId,
            subAssetMake: subAssets[i].subAssetMakeId,
            subAssetModel: subAssets[i].subAssetModelId,
            assetQuantity: subAssets[i].quantity,
          });
          this.onChangeSubAsset({value: subAssets[i].subAssetConfigurationId}, i)
        }

        const accessories = response.message['bcAccessoryConfigurations'];
        for (let i = 0; i < accessories.length; i++) {
          if (i > 0) {
            this.assignAccessory.push(this.createAssignAccessory());
          }
          let accessory = this.accessoriesB.find(
            (a) => a.id == accessories[i].accessoryConfigurationId
          );
          this.assignAccessory.controls[i].patchValue({
            accessory: {
              id: accessories[i].accessoryConfigurationId,
              name: accessory.name
            },
            accessoryQuantity: accessories[i].quantity,
          });
        }
      });
    }
  }

  createAssignSubAsset(): FormGroup {
    return this._fb.group({
      subAsset: ['', [Validators.required]],
      subAssetMake:  ['', [Validators.required]],
      subAssetModel: ['', [Validators.required]],
      assetQuantity: ['']
    });
  }

  createAssignAccessory(): FormGroup {
    return this._fb.group({
      accessory: ['', [Validators.required , this.autocompleteValidation]],
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

  onChangeSubAsset(event, i, clearSubs?) {
    if (clearSubs) {
      this.assignSubAsset.at(i).get('subAssetMake').patchValue(null);
      this.assignSubAsset.at(i).get('subAssetModel').patchValue(null);
    }
    this.subAssetMake[i] = [];
    this.subAssetModel[i] = [];
    const value = event.value ? event.value : event;
    this.subAssets
      .find((x) => x.id == value)
      .makes.map((x) => {
      this.subAssetMake[i].push(x);
    });
    this.onChangeSubAssetMake(event, i)
  }

  onChangeSubAssetMake(event, i, clearSubs?) {
    if (clearSubs) {
      this.assignSubAsset.at(i).get('subAssetModel').patchValue(null);
    }
    this.subAssetModel[i] = [];
    const value = event.value ? event.value : event;
    this.subAssetMake[i]
      .find((x) => x.id == value)
      .models.map((x) => {
      this.subAssetModel[i].push(x);
    });
  }

  onChangeSubAssetModel(event, i) {
  }

  dialogConfirm(event): void {
    if (this.dialogMode == 'cancel') {
      this.router.navigate(['/configuration/usage-category']).then();
      this.facade.reset();
      return;
    }

    this.dialogModal = false;

    if (!event || this.dialogSetting.hasError) return;

    const itemToPost = {
      name: this.addCategoryForm.value.name,
      assetConfigurationId: this.addCategoryForm.value.assetType.id,
      status: this.addCategoryForm.value.activeCategory ? 'ACTIVE' : 'INACTIVE',
      description: this.addCategoryForm.value.description,
      subAssetConfigurations: [],
      accessoryConfigurations: []
    };
    console.log(this.addCategoryForm.value)
    for (const subAsset of this.addCategoryForm.value.assignSubAsset) {
      itemToPost['subAssetConfigurations'].push({
        subAssetModelId: subAsset.subAssetModel,
        quantity: subAsset.assetQuantity,
      });
    }

    for (const accessory of this.addCategoryForm.value.assignAccessory) {
      itemToPost['accessoryConfigurations'].push({
        accessoryConfigurationId: accessory.accessory.id,
        quantity: accessory.accessoryQuantity,
      });
    }

    if (this.isEditing) {
      // itemToPost['id'] = this.id;
      this.facade.editCategory(itemToPost, this.id);
    } else {
      this.facade.addCategory(itemToPost);
    }
  }

  cancel(): void {
    this.dialogMode = 'cancel';
    this.dialogModal = true;
    this.dialogSetting.confirmButton = 'Yes';
    this.dialogSetting.cancelButton = 'No';
    this.dialogSetting.hasError = false;
    this.dialogSetting.isWarning = true;
    this.dialogSetting.message =
      'Are you sure to cancel adding new usage category?';
  }

  submit() {
    this.addCategoryForm.markAllAsTouched();
    this.submited = true;
    if (this.addCategoryForm.invalid) {
      return;
    }
    this.dialogMode = 'submit';

    this.dialogModal = true;
    this.dialogSetting.hasError = false;
    this.dialogSetting.header = 'Add Usage Category';
    this.dialogSetting.hasError = false;
    this.dialogSetting.message =
      'Are you sure you want to add new Usage Category?';
    this.dialogSetting.confirmButton = 'Register Now';
    this.dialogSetting.cancelButton = 'Cancel';

    if (this.isEditing) {
      this.dialogSetting.header = 'Edit category';
      this.dialogSetting.message =
        'Are you sure you want to submit this changes?';
      this.dialogSetting.isWarning = true;
      this.dialogSetting.confirmButton = 'Yes';
      this.dialogSetting.cancelButton = 'Cancel';
      return;
    }
  }

  filterAssets(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    this.assetTypes = this.assetTypesB.filter(
      (x) => x.name.toLowerCase().indexOf(event.query.toLowerCase()) >= 0
    );
    console.log(this.assetTypes)
  }

  // filterSubAssets(event) {
  //   //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
  //   this.subAssets = this.subAssetsB.filter(
  //     (x) => x.name.toLowerCase().indexOf(event.query.toLowerCase()) >= 0
  //   );
  // }

  filterAccessories(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    this.accessories = this.accessoriesB.filter(
      (x) => x.name.toLowerCase().indexOf(event.query.toLowerCase()) >= 0
    );
  }

  autocompleteValidation(input: FormControl) {
    console.log(input.value)
    const inputValid = input.value.name;
    if (inputValid) {
      return null;
    } else {
      return { needsExclamation: true };
    }
  }

  removeassignSubAsset(index){
    this.assignSubAsset.removeAt(index)
  }
  removeassignAccessory(index){
    this.assignAccessory.removeAt(index)
  }

}

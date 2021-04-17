import {
  Component,
  OnInit,
  Injector,
} from '@angular/core';
import {
  BusinessCategoryFacade,
  BusinessCategoryService
} from '../../+state/business-category';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { Utility } from '@shared/utility/utility';
import { TableSetting } from '@core/table';
import { map } from 'rxjs/operators';

import { AccessoryFacade } from '@feature/fleet/+state/accessory';
import { SubAssetFacade } from '@feature/fleet/+state/sub-asset';
import { AssetTypeFacade } from '../../+state/asset-configuration';

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
    header: 'Add Business Category',
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
      { lable: 'tables.column.sub_asset', type: 1, field: 'Sub_Asset' },
      { lable: 'tables.column.accessory', type: 1, field: 'Accessory' }
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
    private accessoryFacade: AccessoryFacade,
    private subAssetFacade: SubAssetFacade,
    private assetTypeFacade: AssetTypeFacade
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.accessoryFacade.loadAll();
    this.subAssetFacade.loadAll();
    this.assetTypeFacade.loadAll();

    this.accessoryFacade.accessory$.subscribe((x) => {
      this.accessoriesB = x.map((y) => ({ id: y.id, name: y.itemName }));
    });

    this.subAssetFacade.subAsset$.subscribe((x) => {
      this.subAssetsB = x.map((y) => ({
        id: y.id,
        name: y['makeName'] + ' ' + y['modelName']
      }));
    });

    this.assetTypeFacade.assetType$.subscribe((x) => {
      this.assetTypesB = x.map((y) => ({ id: y.id, name: y.name }));
    });

    this.addCategoryForm = this._fb.group({
      name: ['', [Validators.required]],
      assetType: ['', [Validators.required]],
      activeCategory: [''],
      description: [''],
      assignSubAsset: new FormArray([this.createAssignSubAsset()]),
      assignAccessory: new FormArray([this.createAssignAccessory()])
    });

    this.handleEditMode();

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
    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams['id']) {
        this.isEditing = true;
        this.id = queryParams['id'];
        this.networkService.getOne(this.id).subscribe((response) => {
          this.addCategoryForm.patchValue({
            name: response.message.name,
            assetType: {
              name: response.message.assetTypeName,
              id: response.message.assetTypeId
            },
            activeCategory:
              response.message.status.toLocaleLowerCase() === 'active',
            description: response.message.description
          });

          const subAssets = response.message.subAssets;
          for (let i = 0; i < subAssets.length; i++) {
            if (i > 0) {
              this.assignSubAsset.push(this.createAssignSubAsset());
            }
            this.subAssetFacade.subAsset$.subscribe((x) => {
              this.subAssetsB = x.map((y) => {
                this.subAssetDocs.push(y.id);
                this.assignSubAsset.controls[i].patchValue({
                  subAsset: {
                    id: subAssets[i].subAssetId,
                    name:
                      y.id === subAssets[i].subAssetId
                        ? y['makeName'] + ' ' + y['modelName']
                        : ''
                  },
                  assetQuantity: subAssets[i].quantity,
                  file: subAssets[i].id
                });
                return { id: y.id, name: y['makeName'] + ' ' + y['modelName'] };
              });
            });
          }

          const accessories = response.message.accessories;
          for (let i = 0; i < accessories.length; i++) {
            if (i > 0) {
              this.assignAccessory.push(this.createAssignAccessory());
            }
            this.accessoryFacade.accessory$.subscribe((x) => {
              this.accessoriesB = x.map((y) => {
                this.accessoryDocs.push(y.id);
                this.assignAccessory.controls[i].patchValue({
                  accessory: {
                    id: accessories[i].accessoryId,
                    name: y.id === accessories[i].accessoryId ? y.itemName : ''
                  },
                  accessoryQuantity: accessories[i].quantity,
                  file: accessories[i].id
                });
                return { id: y.id, name: y.itemName };
              });
            });
          }
        });
      }
    });
  }

  createAssignSubAsset(): FormGroup {
    return this._fb.group({
      subAsset: ['', [Validators.required]],
      file: [],
      assetQuantity: ['']
    });
  }

  createAssignAccessory(): FormGroup {
    return this._fb.group({
      accessory: ['', [Validators.required]],
      file: [],
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

  uploadSubAssetFile(e, index) {
    this.assignSubAsset.at(index).patchValue({
      file: e.files.length ? e.files : [1]
    });
    if (e.files.length > 0) {
      this.subAssetDocs[index] = e.files;
    }
  }

  uploadAccessoryFile(index, e) {
    this.assignAccessory.at(index).patchValue({
      file: e.files.length ? e.files : [1]
    });
    if (e.files.length > 0) {
      this.accessoryDocs[index] = e.files;
    }
  }

  dialogConfirm(event): void {
    if (this.dialogMode == 'cancel') {
      this.router.navigate(['/configuration/business-category']).then();
      this.facade.reset();
      return;
    }

    this.dialogModal = false;

    if (!event || this.dialogSetting.hasError) return;

    const itemToPost = {
      name: this.addCategoryForm.value.name,
      assetTypeId: this.addCategoryForm.value.assetType.id,
      status: this.addCategoryForm.value.activeCategory ? 'ACTIVE' : 'INACTIVE',
      description: this.addCategoryForm.value.description,
      subAssets: [],
      accessories: []
    };

    for (const subAsset of this.addCategoryForm.value.assignSubAsset) {
      itemToPost['subAssets'].push({
        subAssetId: subAsset.subAsset.id,
        quantity: subAsset.assetQuantity,
        specDocId:
          subAsset.file && subAsset.file.length > 0 ? subAsset.file[0] : null
      });
    }

    for (const accessory of this.addCategoryForm.value.assignAccessory) {
      itemToPost['accessories'].push({
        accessoryId: accessory.accessory.id,
        quantity: accessory.accessoryQuantity,
        specDocId:
          accessory.file && accessory.file.length > 0 ? accessory.file[0] : null
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
      'Are you sure to cancel adding new business category?';
  }

  submit() {
    this.submited = true;
    if (this.addCategoryForm.invalid) {
      return;
    }
    this.dialogMode = 'submit';

    this.dialogModal = true;
    this.dialogSetting.hasError = false;
    this.dialogSetting.header = 'Add Business Category';
    this.dialogSetting.hasError = false;
    this.dialogSetting.message =
      'Are you sure you want to add new Business Category?';
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
      (x) =>
        (x.id + '').indexOf(event.query) >= 0 ||
        x.name.indexOf(event.query) >= 0
    );
  }

  filterSubAssets(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    this.subAssets = this.subAssetsB.filter(
      (x) => x.name.toLowerCase().indexOf(event.query.toLowerCase()) >= 0
    );
  }

  filterAccessories(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    this.accessories = this.accessoriesB.filter(
      (x) => x.name.toLowerCase().indexOf(event.query.toLowerCase()) >= 0
    );
  }
}

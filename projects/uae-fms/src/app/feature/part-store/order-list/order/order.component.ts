import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MyOrderAssetFacade, MyOrderAssetService } from '@feature/part-store/+state/order-list/my-order/asset';
import {
  MyOrderSubAssetFacade,
  MyOrderSubAssetService
} from '@feature/part-store/+state/order-list/my-order/sub-asset';
import { AssetConfigurationService } from '@feature/configuration/+state/asset-configuration';
import { PartMasterService } from '@feature/part-store/+state/part-master';
import { SuppliersService } from '@feature/part-store/+state/order-list/suppliers';
import { Utility } from '@shared/utility/utility';

@Component({
  selector: 'order-form',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderFormComponent extends Utility implements OnInit {
  searchIcon = 'assets/icons/search.svg';

  locations = [
    { name: 'Room', code: 'room' },
    { name: 'Saloon', code: 'saloon' }
  ];

  languagePrefix = 'fms.parts.';

  assetType: any[] = [];

  categories: any[] = [];

  items: any[] = [];

  suppliers: any[] = [];

  recordId: number;

  partForm: FormGroup;

  filterSetting = [];
  partMasterTableSetting;

  formSubmitted = false;
  formChanged = false;
  dialogModalAdd = false;
  dialogModalError = false;
  dialogModalCancel = false;

  dialogSettingAdd: IDialogAlert = {
    header: 'Part',
    hasError: false,
    hasHeader: true,
    message: 'New Part Successfully Added',
    confirmButton: 'OK'
  };
  dialogSettingCancel: IDialogAlert = {
    header: 'Part',
    hasError: false,
    isWarning: true,
    hasHeader: true,
    message: 'Are you sure that you want to cancel adding new order?',
    confirmButton: 'Yes',
    cancelButton: 'No'
  };

  dialogSettingError: IDialogAlert = {
    header: 'Part',
    hasError: true,
    isWarning: false,
    hasHeader: true,
    message: 'Please fill in all the required fields.',
    confirmButton: 'OK'
  };

  isEditing = false;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private assetFacade: MyOrderAssetFacade,
    private subAssetFacade: MyOrderSubAssetFacade,
    private myOrderAssetService: MyOrderAssetService,
    private myOrderSubAssetService: MyOrderSubAssetService,
    private assetTypeService: AssetConfigurationService,
    private partMasterService: PartMasterService,
    private suppliersService: SuppliersService,
    private injector: Injector
  ) {
    super(injector);
    this.partForm = this._fb.group({
      typeCategoryType: ['ASSET'],
      assetType: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
      item: ['', Validators.required],
      supplier: ['', Validators.required],
      hasReminder: false
    });
  }

  getLabelName(field) {
    return this.languagePrefix + field;
  }

  ngOnInit(): void {
    this.getAssetType();
    this.suppliersService.loadAllSupplier().subscribe((response) => {
      const suppliersArray = response.message;
      this.suppliers = [];
      suppliersArray.map((supplier) => {
        const supplierObject = {
          id: supplier.id,
          name: supplier.companyName
        };
        this.suppliers.push(supplierObject);
      });
    });
    this.errorAndSubmitHandler(this.assetFacade);
    this.errorAndSubmitHandler(this.subAssetFacade);
    this.partForm.valueChanges.subscribe(() => {
      this.formChanged = true;
    });

    this.route.queryParams.subscribe((query) => {
      if (query.type) {
        const url = this.route.snapshot.url;
        if (url.length === 3) {
          const id = url[2].path
          this.recordId = Number(id)
        }

        if (query.type === 'asset') {
          this.isEditing = true
          this.partForm.reset({ typeCategoryType: 'ASSET', hasReminder: false });
          this.myOrderAssetService.getOrderById(this.recordId).subscribe((response) => {
            console.log(response);
            const message = response.message
            const status = message.status
            if (status !== 'JUST_REGISTERED') {
              this.dialogModalError = true;
              this.dialogSettingError.header = 'Edit Order';
              this.dialogSettingError.hasError = true;
              this.dialogSettingError.message = 'Received orders cannot be edited';
              this.dialogSettingError.cancelButton = undefined;
              this.dialogSettingError.confirmButton = 'OK';
            }
            this.assetType = [];
            const assetTypeObject = {
              name: message.fleetConfigurationName,
              id: message.fleetConfigurationId
            }
            this.assetType.push(assetTypeObject);
            this.partForm.controls['assetType'].setValue(
              assetTypeObject
            );
            this.categories = [];
            const categoryObject = {
              name: message.categoryName,
              id: message.categoryId
            }
            this.categories.push(categoryObject)
            this.partForm.controls['category'].setValue(
              categoryObject
            );
            this.items = [];
            const itemObject = {
              name: message.itemName,
              id: message.itemId
            }
            this.items.push(itemObject)
            this.partForm.controls['item'].setValue(
              itemObject
            );
            this.suppliers = [];
            const supplierObject = {
              name: message.supplierCompanyName,
              id: message.supplierId
            }
            this.suppliers.push(supplierObject)
            this.partForm.controls['supplier'].setValue(
              supplierObject
            );
            this.partForm.patchValue({
              typeCategoryType: message.fleetType,
              quantity: message.quantity,
              price: message.price,
              description: message.description,
              hasReminder: message.hasReminder
            })
          })
        } else {
          this.partForm.reset({ typeCategoryType: 'SUB_ASSET', hasReminder: false });
          this.myOrderSubAssetService.getOrderById(this.recordId).subscribe((response) => {
            const message = response.message
            const status = message.status
            if (status !== 'JUST_REGISTERED') {
              this.dialogModalError = true;
              this.dialogSettingError.header = 'Edit Order';
              this.dialogSettingError.hasError = true;
              this.dialogSettingError.message = 'Received orders cannot be edited';
              this.dialogSettingError.cancelButton = undefined;
              this.dialogSettingError.confirmButton = 'OK';
            }
            this.assetType = [];
            const assetTypeObject = {
              name: message.fleetConfigurationName,
              id: message.fleetConfigurationId
            }
            this.assetType.push(assetTypeObject);
            this.partForm.controls['assetType'].setValue(
              assetTypeObject
            );
            this.categories = [];
            const categoryObject = {
              name: message.categoryName,
              id: message.categoryId
            }
            this.categories.push(categoryObject)
            this.partForm.controls['category'].setValue(
              categoryObject
            );
            this.items = [];
            const itemObject = {
              name: message.itemName,
              id: message.itemId
            }
            this.items.push(itemObject)
            this.partForm.controls['item'].setValue(
              itemObject
            );
            this.suppliers = [];
            const supplierObject = {
              name: message.supplierCompanyName,
              id: message.supplierId
            }
            this.suppliers.push(supplierObject)
            this.partForm.controls['supplier'].setValue(
              supplierObject
            );
            this.partForm.patchValue({
              typeCategoryType: message.fleetType,
              quantity: message.quantity,
              price: message.price,
              description: message.description,
              hasReminder: message.hasReminder
            })
          })
        }
      }
    })
  }

  getAssetType(): void {
    this.assetTypeService.loadAll().subscribe((response) => {
      const assetTypeArray = response.message;
      this.assetType = [];
      assetTypeArray.map((assetType) => {
        const assetTypeObject = {
          id: assetType.id,
          name: assetType.name
        };
        this.assetType.push(assetTypeObject);
      });
    });
  }

  onAssetSelect($event): void {
    this.assetType = [];
    this.categories = [];
    this.items = [];
    const target = $event.target;
    this.partForm.value.typeCategoryType = target.checked ? 'ASSET' : 'SUB_ASSET';
    this.getAssetType();
    this.partForm.reset({ typeCategoryType: 'ASSET', hasReminder: false });
  }

  onSubAssetSelect($event): void {
    this.assetType = [];
    this.categories = [];
    this.items = [];
    const target = $event.target;
    this.partForm.value.typeCategoryType = target.checked ? 'SUB_ASSET' : 'ASSET';
    this.getAssetType();
    this.partForm.reset({ typeCategoryType: 'SUB_ASSET', hasReminder: false });
  }

  onChangeAssetType(event): void {
    this.categories = [];

    const value = event.value ? event.value : event;
    const foundAssetType = this.assetType.find((x) => x.id === value.id);

    if (this.partForm.value.typeCategoryType !== 'ASSET') {
      this.partMasterService.getCategoryOfSubAsset(foundAssetType.id).subscribe((response) => {
        const categoryArray = response.message;
        categoryArray.map((category) => {
          const categoryObject = {
            id: category.id,
            name: category.name
          };
          this.categories.push(categoryObject);
        });
      });
      return;
    }

    this.partMasterService.getCategoryOfAsset(foundAssetType.id).subscribe((response) => {
      const categoryArray = response.message;
      categoryArray.map((category) => {
        const categoryObject = {
          id: category.id,
          name: category.name
        };
        this.categories.push(categoryObject);
      });
    });
  }

  onChangeCategory(event): void {
    this.items = [];

    const value = event.value ? event.value : event;
    const foundItem = this.categories.find((x) => x.id === value.id);

    if (this.partForm.value.typeCategoryType !== 'ASSET') {
      this.partMasterService.getItemOfSubAsset(foundItem.id).subscribe((response) => {
        const itemArray = response.message;
        itemArray.map((item) => {
          const itemObject = {
            id: item.id,
            name: item.name
          };
          this.items.push(itemObject);
        });
      });
      return;
    }

    this.partMasterService.getItemOfAsset(foundItem.id).subscribe((response) => {
      const itemArray = response.message;
      itemArray.map((item) => {
        const itemObject = {
          id: item.id,
          name: item.name
        };
        this.items.push(itemObject);
      });
    });
  }

  submit() {
    this.formSubmitted = true;
    if (this.partForm.invalid) {
      this.partForm.markAllAsTouched();
      return;
    } else {
      const payload = {
        itemId: this.partForm.value?.item.id,
        supplierId: this.partForm.value?.supplier.id,
        price: this.partForm.value?.price,
        quantity: this.partForm.value?.quantity,
        description: this.partForm.value?.description,
        hasReminder: this.partForm.value?.hasReminder
      };

      if (this.isEditing) {
        const editPayload = {
          id: this.recordId,
          itemId: this.partForm.value?.item.id,
          supplierId: this.partForm.value?.supplier.id,
          price: this.partForm.value?.price,
          quantity: this.partForm.value?.quantity,
          description: this.partForm.value?.description,
          hasReminder: this.partForm.value?.hasReminder
        };
        if (this.partForm.value.typeCategoryType === 'ASSET') {
          this.assetFacade.updateOrder(editPayload);
        } else {
          this.subAssetFacade.updateOrder(editPayload);
        }
        return;
      }

      if (this.partForm.value.typeCategoryType === 'ASSET') {
        this.assetFacade.addOrder(payload);
      } else {
        this.subAssetFacade.addOrder(payload);
      }
      console.log(payload);
    }

  }

  cancel() {
    if (this.formChanged) {
      this.dialogModalCancel = true;
      return;
    }

    this._router.navigate(['part-store/part-list']);
  }

  dialogCancelConfirm(value) {
    if (value === true) {
      this._router.navigate(['part-store/part-list']);
    }
    this.dialogModalCancel = false;
  }

  dialogAddConfirm(value) {
    if (value === true) {
      this._router.navigate(['part-store/part-list']);
    }
    this.dialogModalAdd = false;
  }

  dialogErrorConfirm(value) {
    this.dialogModalError = false;
    if (this.dialogSettingError.message === 'Received orders cannot be edited') {
      this.router.navigate(['/part-store/order-list/asset']).then()
    }
  }

  errorAndSubmitHandler(facade) {

    facade.submitted$.subscribe((x) => {
      if (x) {
        this.dialogModalAdd = true;
        this.dialogSettingAdd.header = !this.isEditing ? 'Add new order' : 'Edit order';
        this.dialogSettingAdd.message = !this.isEditing ? 'Order Added Successfully' : 'Order updated successfully';
        this.dialogSettingAdd.isWarning = false;
        this.dialogSettingAdd.hasError = false;
        this.dialogSettingAdd.confirmButton = 'OK';
        this.dialogSettingAdd.cancelButton = undefined;
      }
    });

    facade.error$.subscribe((x) => {
      if (x?.error) {
        x?.error;
        this.dialogModalError = true;
        this.dialogSettingError.header = !this.isEditing ? 'Add new order' : 'Edit Order';
        this.dialogSettingError.hasError = true;
        this.dialogSettingError.message = 'Error occurred in progress';
        this.dialogSettingError.cancelButton = undefined;
        this.dialogSettingError.confirmButton = 'OK';
      }
    });

    this.assetFacade.reset();
    this.subAssetFacade.reset();
  }
}

import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  ElementRef,
  Injector,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ColumnType, TableSetting } from '@core/table';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry
} from 'ngx-file-drop';
import { Utility } from '@shared/utility/utility';
import { Router } from '@angular/router';
import {
  AssetMasterFacade,
  AssetMasterService
} from '@feature/fleet/+state/assets/asset-master';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { BusinessCategoryFacade } from '@feature/configuration/+state/business-category';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { OwnershipFacade } from '@feature/configuration/+state/ownership';
import { AssetConfigurationService } from '@feature/configuration/+state/asset-configuration/asset-configuration.service';
import { AssetPolicyFacade } from '@feature/configuration/+state/asset-policy';
import { PeriodicServiceFacade } from '@feature/configuration/+state/periodic-service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'anms-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddAssetComponent extends Utility implements OnInit, OnDestroy {
  submitted_AssetDetail = false;
  submitted_Financial = false;
  submitted_Maintenance = false;
  submitted_Generate = false;
  isEditable: boolean = true;
  isLinear: boolean = true;
  isStart: boolean = true;
  calculate: boolean = false;
  uploadReview: boolean = false;
  progressBarValue = 80;
  calenderIcon = 'assets/icons/calendar-alt-regular.svg';
  closeIcon = 'assets/icons/times.svg';

  /* Forms */
  formGroupAssetDetail: FormGroup;
  formGroupFinancial: FormGroup;
  formGroupMaintenance: FormGroup;
  formGroupGenerate: FormGroup;
  get policyType() {
    return this.formGroupFinancial.get('assetFinancialPlan.policyType');
  }
  get lifeCylceDate() {
    return this.formGroupFinancial.get('lifeCycle.inServiceDate');
  }
  get lifeCylceOdometer() {
    return this.formGroupFinancial.get('lifeCycle.inServiceOdometer');
  }
  get inServiceDateReminder() {
    return this.formGroupFinancial.get('lifeCycle.inServiceDateReminder');
  }
  get inServiceOdometerReminder() {
    return this.formGroupFinancial.get('lifeCycle.inServiceOdometerReminder');
  }
  get periodicService() {
    return this.formGroupMaintenance.get('periodicService');
  }
  get warrantyStartDate() {
    return this.formGroupMaintenance.controls.warrantyItems as FormArray;
  }
  get warrantyItems() {
    return this.formGroupMaintenance.get('warrantyItems') as FormArray;
  }
  isEdit: boolean = false;
  id: number;
  private _asset;
  /* Ngx File Drop */
  public filesUpdloaded: NgxFileDropEntry[] = [];
  public allFileUpload: IAllFileUpload = {
    uploadVehicleDoc: [],
    uploadPurchaseOrder: [],
    uploadMaintenanceService: [],
    warrantyItem: []
  };

  //#region  Dialog
  dialogModal = false;
  dialogOption = null;
  dialogSetting: IDialogAlert = {
    header: 'Add new user alert',
    hasError: false,
    message: 'Message is Here',
    confirmButton: 'Register Now',
    cancelButton: 'Cancel'
  };
  errorDialogSetting: IDialogAlert = {
    header: '',
    message: 'Error occurred in progress',
    confirmButton: 'Ok',
    isWarning: false,
    hasError: true,
    hasHeader: true,
    cancelButton: undefined
  };
  cancelDialogSetting: IDialogAlert = {
    header: 'Cancel',
    message: 'do you want to cancel ? if you accept your data will be lost',
    confirmButton: 'Cancel',
    isWarning: true,
    hasError: false,
    hasHeader: true,
    cancelButton: 'No'
  };
  cancelDialogModal = false;
  errorDialogModal = false;
  //#endregion

  @ViewChild('stepper') stepper: MatStepper;

  years = [
    { name: '2000', id: 2000 },
    { name: '2001', id: 2001 },
    { name: '2002', id: 2002 },
    { name: '2003', id: 2003 },
    { name: '2004', id: 2004 },
    { name: '2005', id: 2005 },
    { name: '2006', id: 2006 },
    { name: '2007', id: 2007 },
    { name: '2008', id: 2008 },
    { name: '2009', id: 2009 },
    { name: '2010', id: 2010 },
    { name: '2011', id: 2011 },
    { name: '2012', id: 2012 },
    { name: '2013', id: 2013 },
    { name: '2014', id: 2014 },
    { name: '2015', id: 2015 },
    { name: '2016', id: 2016 },
    { name: '2017', id: 2017 },
    { name: '2018', id: 2018 },
    { name: '2019', id: 2019 },
    { name: '2020', id: 2020 },
    { name: '2021', id: 2021 }
  ];

  itemTypes = [
    { name: 'Item type 1', id: 1 },
    { name: 'Item type 2', id: 2 },
    { name: 'Item type 3', id: 3 },
    { name: 'Item type 4', id: 4 },
    { name: 'Item type 5', id: 5 },
    { name: 'Item type 6', id: 6 }
  ];

  businessCategory = [];
  businessCategory$: Subscription;
  ownerShip = [];
  ownerShip$: Subscription;
  assetType = [];
  assetMake = [];
  assetModel = [];
  assetColor = [];
  assetTrim = [];
  assetType$: Subscription;
  policyType$: Subscription;
  policyTypeDropDown = [];
  periodicService$: Subscription;
  periodicServiceItem = [];
  reviewPlaneSettingTable: TableSetting;
  //#region Table Settings
  reviewPlaneSettingTable2: TableSetting = {
    columns: [
      {
        lable: 'tables.column.year',
        type: 1,
        width: 100,
        field: 'year',
        renderer: ''
      },
      {
        lable: 'tables.column.book_value',
        type: 1,
        field: 'bookValue',
        renderer: ''
      }
    ],
    data: [
      { year: '1', bookValue: '43000 AED' },
      { year: '2', bookValue: '39000 AED' },
      { year: '3', bookValue: '36000 AED' },
      { year: '4', bookValue: '28000 AED' },
      { year: '5', bookValue: '2000 AED' },
      { year: '6', bookValue: '0 AED' }
    ]
  };
  periodicServiceSettingTable: TableSetting = {
    columns: [
      {
        lable: 'tables.column.intervals',
        type: 1,
        width: '30%',
        field: 'intervals',
        renderer: ''
      },
      {
        lable: 'tables.column.service_task',
        type: 1,
        field: 'serviceTask',
        renderer: ''
      }
    ],
    data: [
      {
        intervals: 'Every 150,000 miles',
        serviceTask: 'Engine/Drive Belt(s) Replacement  ,  Transmission Filter'
      },
      {
        intervals: 'Every 150,000 miles',
        serviceTask: 'Engine/Drive Belt(s) Replacement  ,  Transmission Filter'
      },
      {
        intervals: 'Every 150,000 miles',
        serviceTask: 'Engine/Drive Belt(s) Replacement  ,  Transmission Filter'
      },
      {
        intervals: 'Every 150,000 miles',
        serviceTask: 'Engine/Drive Belt(s) Replacement  ,  Transmission Filter'
      },
      {
        intervals: 'Every 150,000 miles',
        serviceTask: 'Engine/Drive Belt(s) Replacement  ,  Transmission Filter'
      },
      {
        intervals: 'Every 150,000 miles',
        serviceTask: 'Engine/Drive Belt(s) Replacement  ,  Transmission Filter'
      },
      {
        intervals: 'Every 150,000 miles',
        serviceTask: 'Engine/Drive Belt(s) Replacement  ,  Transmission Filter'
      }
    ]
  };
  warrantySettingTable: TableSetting = {
    columns: [
      {
        lable: 'tables.column.warranty_for',
        type: 1,
        field: 'warrantyFor',
        renderer: ''
      },
      {
        lable: 'tables.column.start_date',
        type: 1,
        field: 'start',
        renderer: ''
      },
      {
        lable: 'tables.column.end_date',
        type: 1,
        field: 'end',
        renderer: ''
      }
    ],
    data: [{ warrantyFor: 'Engine', start: '02/02/2020', end: '02/02/2021' }]
  };
  formReviewSettingTable: TableSetting = {
    columns: [
      {
        lable: 'tables.column.asset',
        field: 'asset',
        width: '18em',
        type: 1,
        thumbField: '',
        renderer: 'assetsRenderer'
      },
      {
        lable: 'tables.column.s_n',
        type: 1,
        field: 's_n',
        renderer: ''
      },
      {
        lable: 'tables.column.model',
        field: '',
        type: 3,
        thumbField: 'model',
        renderer: ''
      },
      {
        lable: 'tables.column.allocated',
        type: 1,
        field: 'allocated',
        renderer: ''
      },
      {
        lable: 'tables.column.type',
        type: 1,
        field: 'type',
        renderer: ''
      },
      {
        lable: 'tables.column.business_category',
        type: 1,
        field: 'businessCategory',
        renderer: ''
      }
    ],
    data: [
      {
        asset: {
          img: 'thumb1.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          ownership: 'Owned'
        },
        s_n: '456456445656456464',
        model: 'bmw.png',
        allocated: 'Finance',
        type: 'car',
        businessCategory: 'VIP'
      },
      {
        asset: {
          img: 'thumb1.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          ownership: 'Owned'
        },
        s_n: '456456445656456464',
        model: 'bmw.png',
        allocated: 'Finance',
        type: 'car',
        businessCategory: 'VIP'
      },
      {
        asset: {
          img: 'thumb1.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          ownership: 'Owned'
        },
        s_n: '456456445656456464',
        model: 'bmw.png',
        allocated: 'Finance',
        type: 'car',
        businessCategory: 'VIP'
      },
      {
        asset: {
          img: 'thumb1.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          ownership: 'Owned'
        },
        s_n: '456456445656456464',
        model: 'bmw.png',
        allocated: 'Finance',
        type: 'car',
        businessCategory: 'VIP'
      },
      {
        asset: {
          img: 'thumb1.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          ownership: 'Owned'
        },
        s_n: '456456445656456464',
        model: 'bmw.png',
        allocated: 'Finance',
        type: 'car',
        businessCategory: 'VIP'
      },
      {
        asset: {
          img: 'thumb1.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          ownership: 'Owned'
        },
        s_n: '456456445656456464',
        model: 'bmw.png',
        allocated: 'Finance',
        type: 'car',
        businessCategory: 'VIP'
      },
      {
        asset: {
          img: 'thumb1.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          ownership: 'Owned'
        },
        s_n: '456456445656456464',
        model: 'bmw.png',
        allocated: 'Finance',
        type: 'car',
        businessCategory: 'VIP'
      }
    ]
  };
  //#endregion

  constructor(
    private _fb: FormBuilder,
    injector: Injector,
    private _router: Router,
    private _facade: AssetMasterFacade,
    private _service: AssetMasterService,
    private _facadeBussinessCategory: BusinessCategoryFacade,
    private _facadeOwnership: OwnershipFacade,
    private _assetConfigurationService: AssetConfigurationService,
    private _facadeAssetPolicy: AssetPolicyFacade,
    private _facadePeriodicService: PeriodicServiceFacade,
    private changeDetection: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.reviewPlaneSettingTable = {
      columns: [
        {
          lable: 'tables.column.depreciation_value',
          type: 1,
          field: 'depreciationValue',
          renderer: ''
        },
        {
          lable: 'tables.column.out_of_policy',
          type: 1,
          field: 'maxUsageYear',
          renderer: ''
        },
        {
          lable: 'tables.column.out_of_policy',
          type: 1,
          field: 'maxUsageKPHour',
          renderer: ''
        }
      ],
      data: []
    };

    this._facadeBussinessCategory.loadAll();
    this._facadeOwnership.loadAll();
    this._facadeAssetPolicy.loadAll();
    this._facadePeriodicService.loadAll();

    this.businessCategory$ = this._facadeBussinessCategory.businessCategory$.subscribe(
      (x) => {
        x.map((response) => {
          const value = {
            id: response.id,
            name: response.name
          };
          this.businessCategory.push(value);
        });
      }
    );

    this.ownerShip$ = this._facadeOwnership.ownership$.subscribe((x) => {
      x.map((response) => {
        console.log(response);
        this.ownerShip.push(response);
      });
    });

    this.assetType$ = this._assetConfigurationService
      .loadAll()
      .subscribe((data) => {
        data.message.map((x) => {
          this.assetType.push(x);
          x.makes.map((y) => {
            const make = {
              id: y.id,
              name: y.make
            };
            this.assetMake.push(make);
          });
        });
      });

    this.policyType$ = this._facadeAssetPolicy.assetPolicy$.subscribe(
      (data) => {
        data.map((response) => {
          this.policyTypeDropDown.push(response);
        });
      }
    );

    this.periodicService$ = this._facadePeriodicService.periodicService$.subscribe(
      (data) => {
        data.map((response) => {
          this.periodicServiceItem.push(response);
          console.log(response);
        });
      }
    );

    this._facade.error$.subscribe((x) => {
      if (x?.error) {
        console.log(x?.error);
        this.errorDialogModal = true;
        this.errorDialogSetting.header = 'Add new asset';
        this.errorDialogSetting.hasError = true;
        this.errorDialogSetting.cancelButton = undefined;
        this.errorDialogSetting.confirmButton = 'Ok';
        this.changeDetection.detectChanges();
      } else {
        this.errorDialogModal = false;
      }
    });

    this.formGroupAssetDetail = this._fb.group({
      businessInfo: this._fb.group({
        businessCategory: ['', Validators.compose([Validators.required])],
        ownership: ['', Validators.compose([Validators.required])]
      }),
      assetDetails: this._fb.group({
        year: ['', Validators.compose([Validators.required])],
        make: ['', Validators.compose([Validators.required])],
        model: ['', Validators.compose([Validators.required])],
        color: ['', Validators.compose([Validators.required])],
        trim: ['', Validators.compose([Validators.required])],
        origin: ['', Validators.compose([Validators.required])],
        meterType: ['']
      }),
      purchasedFor: this._fb.group({
        department: [''],
        operator: ['']
      }),
      uploadFile: ['']
    });

    this.formGroupFinancial = this._fb.group({
      assetFinancialPlan: this._fb.group({
        policyType: ['', Validators.compose([Validators.required])],
        purchaseValue: ['', Validators.compose([Validators.required])]
      }),
      lifeCycle: this._fb.group({
        inServiceDate: ['', Validators.compose([Validators.required])],
        inServiceOdometer: [''],
        inServiceDateReminder: [false],
        inServiceOdometerReminder: [false]
      }),
      uploadFile: ['', Validators.compose([Validators.required])]
    });

    this.formGroupMaintenance = this._fb.group({
      periodicService: ['', Validators.compose([Validators.required])],
      warrantyItems: this._fb.array([this.formBuilderArrayControl()]),
      description: ['', Validators.compose([Validators.required])]
    });

    this.formGroupGenerate = this._fb.group({
      quantity: ['multipleAsset', Validators.compose([Validators.required])],
      uploadFile: ['', Validators.compose([Validators.required])]
    });

    this._facade.submitted$.subscribe((x) => {
      if (x) {
        this.dialogModal = true;
        this.dialogOption = 'success';
        this.dialogSetting.header = 'Add new asset';
        this.dialogSetting.message = 'Asset Added Successfully';
        this.dialogSetting.isWarning = false;
        this.dialogSetting.hasError = false;
        this.dialogSetting.confirmButton = 'Yes';
        this.dialogSetting.cancelButton = undefined;
        this.changeDetection.detectChanges();
      }
    });

    this.route.url.subscribe((params) => {
      this.isEdit =
        params.filter((x) => x.path == 'edit-asset').length > 0 ? true : false;
      if (this.isEdit) {
        this.id = +params[params.length - 1].path;
        this._service
          .getAssetByID(params[params.length - 1].path)
          .pipe(map((x) => x.message))
          .subscribe((x) => {
            if (x) {
              this._asset = x;
              this.formGroupAssetDetail.patchValue({
                businessInfo: {
                  businessCategory: x.businessCategoryId,
                  ownership: x.ownershipId
                },
                assetDetails: {
                  year: +x.year,
                  make: x.makeId,
                  model: x.modelId,
                  color: x.colorId,
                  trim: x.trimId,
                  meterType: x.meterType
                },
                purchasedFor: {
                  department: x.department,
                  operator: x.operator
                }
              });
            }
          });
      }
    });
  }

  public formBuilderArrayControl(): FormGroup {
    return this._fb.group({
      item: ['', Validators.compose([Validators.required])],
      year: ['', Validators.compose([Validators.required])],
      duration: ['', Validators.compose([Validators.required])],
      warrantyStartDate: ['', Validators.compose([Validators.required])],
      fileUpload: ['', Validators.compose([Validators.required])]
    });
  }

  public dropped(files: NgxFileDropEntry[], option: string, index?: number) {
    this.filesUpdloaded = files;
    let fileUpload = null;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          console.log('1', droppedFile.relativePath, file);
          console.log(droppedFile.fileEntry.name);
        });
        console.log('2', droppedFile.relativePath);
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
      console.log('3', files);
      switch (option) {
        case 'vehicle':
          this.allFileUpload.uploadVehicleDoc.push(droppedFile);
          break;
        case 'purchaseOrder':
          this.formGroupFinancial.get('uploadFile').patchValue(droppedFile);
          this.allFileUpload.uploadPurchaseOrder.push(droppedFile);
          break;
        case 'maintenanceService':
          this.formGroupGenerate.get('uploadFile').patchValue(droppedFile);
          this.allFileUpload.uploadMaintenanceService.push(droppedFile);
          break;
        case 'warranty': {
          this.formGroupMaintenance
            .get('warrantyItems')
            ['controls'][index]['controls']['fileUpload'].patchValue(
              droppedFile
            );
          this.allFileUpload.warrantyItem.push(droppedFile);
          break;
        }
      }
    }
  }

  public trackItemFile(index: number, file) {
    return file.name;
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  selectedPlicyType(value) {
    console.log(value);
  }

  next() {
    let activeStep = this.stepper.selectedIndex;
    switch (activeStep) {
      case 0: {
        console.log(this.formGroupAssetDetail.getRawValue());
        this.submitted_AssetDetail = true;
        if (this.formGroupAssetDetail.invalid) return;
        break;
      }
      case 1: {
        this.submitted_Financial = true;
        if (this.formGroupFinancial.invalid) return;
        break;
      }
      case 2: {
        this.submitted_Maintenance = true;
        if (this.formGroupMaintenance.invalid) return;
        break;
      }
    }
    this.stepper.next();
    this.isStart = false;
  }

  previous() {
    if (this.uploadReview) {
      this.uploadReview = false;
    } else {
      this.stepper.previous();
    }
  }

  buttonUpload(): void {
    this.submitted_Generate = true;
    if (this.formGroupGenerate.invalid) return;
    this.uploadReview = true;
  }

  trackUploadItem() {
    const uinque = this.allFileUpload;
    return uinque;
  }

  addWarrantyItem() {
    if (this.formGroupMaintenance.invalid) return;
    const item = this.formGroupMaintenance.get('warrantyItems') as FormArray;
    item.push(this.formBuilderArrayControl());
  }

  getWarrantyStartDat(i: number) {
    const date = this.warrantyStartDate.controls[i] as FormGroup;
    return date.get('warrantyStartDate').value;
  }

  onChangeAssetMake(event) {
    console.log(this.assetType);
    this.assetModel = [];
    this.assetType
      .find((x) => x.id == event.value)
      .makes.map((x) => {
        x.models.map((y) => {
          this.assetModel.push(y);
          console.log(this.assetModel);
        });
      });
  }

  onChangeAssetModel(event) {
    console.log(this.assetType);
    this.assetColor = [];
    this.assetTrim = [];
    this.assetModel
      .find((x) => x.id == event.value)
      .trims.map((x) => {
        this.assetTrim.push(x);
        console.log(x);
        x.colors.map((y) => {
          this.assetColor.push(y);
          console.log(y);
          console.log(y.color);
        });
      });
  }

  onChangePolicyType(event) {
    const data = this.policyTypeDropDown.find((x) => x.id == event.value);
    const dataChange = {
      depreciationValue: `%${data.maxUsageKPHour}`,
      maxUsageYear: `After ${data.maxUsageYear} years`,
      maxUsageKPHour: `After ${data.maxUsageKPHour}Km/HRS`
    };
    this.reviewPlaneSettingTable.data = [];
    this.reviewPlaneSettingTable.data.push(dataChange);
  }

  generateForm() {
    let formVal_AssetDetail = this.formGroupAssetDetail.getRawValue();
    let formVal_Financial = this.formGroupFinancial.getRawValue();
    let formVal_Maintenance = this.formGroupMaintenance.getRawValue();
    let formVal_Generate = this.formGroupGenerate.getRawValue();

    if (this.formGroupGenerate.invalid) return;

    let formValue = {
      avatarId: 1,
      businessCategoryId: formVal_AssetDetail.businessInfo.businessCategory,
      // "businessCategoryId": 1,
      ownershipId: formVal_AssetDetail.businessInfo.ownership,
      year: formVal_AssetDetail.assetDetails.year,
      assetTypeId: 1,
      makeId: formVal_AssetDetail.assetDetails.make,
      modelId: formVal_AssetDetail.assetDetails.model,
      colorId: formVal_AssetDetail.assetDetails.color,
      trimId: formVal_AssetDetail.assetDetails.trim,
      origin: formVal_AssetDetail.assetDetails.origin,
      // "meterType": formVal_AssetDetail.assetDetails.meterType,
      meterType: 'HOUR',
      organizationId: 1,
      departmentId: formVal_AssetDetail.purchasedFor.department,
      operatorId: formVal_AssetDetail.purchasedFor.operator,

      policyTypeId: formVal_Financial.assetFinancialPlan.policyType,
      // "purchaseValue": formVal_Financial.assetFinancialPlan.purchaseValue,
      purchaseValue: 51287,
      // "inServiceDate": formVal_Financial.lifeCycle.inServiceDate,
      inServiceDate: '2000-01-11T07:18:38.111Z',
      // "inServiceOdometer": formVal_Financial.lifeCycle.inServiceOdometer,
      inServiceOdometer: 78902613,
      purchaseDocId: 3,
      periodicServiceId: formVal_Maintenance.periodicService,
      // "warrantyItems": formVal_Maintenance.warrantyItems,
      warrantyItems: [
        {
          item: 'First',
          periodType: 'YEAR',
          duration: 100,
          startDate: '1972-02-20T02:05:41.691Z',
          docId: 1,
          hasReminder: true
        },
        {
          item: 'Second',
          periodType: 'MONTH',
          duration: 150,
          startDate: '1958-11-21T11:10:05.851Z',
          docId: 3,
          hasReminder: false
        }
      ],
      description: formVal_Maintenance.description,
      dpds: [
        `DPD${Math.floor(Math.random() * 9990)}`,
        `DPD${Math.floor(Math.random() * 9990)}`
      ]
    };
    console.log(formValue);

    this._facade.addAsset(formValue);
    // this._router.navigate(['/fleet/assets']);
  }

  cancelForm() {
    this.cancelDialogModal = true;
    this.cancelDialogSetting.isWarning = true;
    this.changeDetection.detectChanges();
  }

  dialog(event) {
    if (event) {
      this._facade.reset();
      this.goToList();
    }
    this.dialogModal = false;
  }

  cancelDialog($event) {
    if ($event) {
      this._facade.reset();
      this.goToList();
    }
    this.dialogModal = false;
  }


  uploadDoc(data): void {
    let uploaderName = data.name;
    let files = data.files;
    let index = data.index | 0;
    console.log(data)
    switch (uploaderName) {
      case 'vehicle':
        break;
      case 'purchaseOrder':
        this.formGroupFinancial.get('uploadFile').patchValue(files);
        break;
      case 'maintenanceService':
        this.formGroupGenerate.get('uploadFile').patchValue(files);
        break;
      case 'warranty': {
        this.formGroupMaintenance
          .get('warrantyItems')
          ['controls'][index]['controls']['fileUpload'].patchValue(
          files
        );
        break;
      }
    }
  }

  ngOnDestroy(): void {
    this.businessCategory$.unsubscribe();
    this.ownerShip$.unsubscribe();
    this.assetType$.unsubscribe();
    this.policyType$.unsubscribe();
  }
}

export interface IAllFileUpload {
  uploadVehicleDoc: any[];
  uploadPurchaseOrder: any[];
  uploadMaintenanceService: any[];
  warrantyItem: any[];
}

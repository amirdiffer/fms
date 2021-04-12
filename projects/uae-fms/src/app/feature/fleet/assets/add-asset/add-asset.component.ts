import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  Injector,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ColumnType, TableSetting } from '@core/table';
import { Utility } from '@shared/utility/utility';
import { Router } from '@angular/router';
import * as moment from 'moment';
import {
  AssetMasterFacade,
  AssetMasterService
} from '@feature/fleet/+state/assets/asset-master';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { BusinessCategoryFacade } from '@feature/configuration/+state/business-category';
import { map, tap } from 'rxjs/operators';
import { Subscription, of, Observable, observable, Subject } from 'rxjs';
import { OwnershipFacade } from '@feature/configuration/+state/ownership';
import { AssetConfigurationService } from '@feature/configuration/+state/asset-configuration/asset-configuration.service';
import { AssetPolicyFacade } from '@feature/configuration/+state/asset-policy';
import {
  PeriodicServiceFacade,
  PeriodicServiceService
} from '@feature/configuration/+state/periodic-service';
import {
  OrganizationFacade,
  OrganizationService
} from '@feature/fleet/+state/organization';
import {
  OperatorFacade,
  OperatorService
} from '@feature/fleet/+state/operator';

@Component({
  selector: 'anms-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddAssetComponent extends Utility implements OnInit, OnDestroy {
  //icons
  calenderIcon = 'assets/icons/calendar-alt-regular.svg';
  closeIcon = 'assets/icons/times.svg';
  singleAsset: boolean = false;
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
  isEdit: boolean = false;
  id: number;
  periodicServiceTableData$ = new Subject<any>();
  policyTypeTableData$ = new Subject<any>();
  private _asset;
  private csvText = [];
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

  // Upload Files
  vehicleDoc = [];
  purchaseDoc = [];
  maintenanceServiceDoc = [];
  warrantyDocs = [];
  public vehicleDocRequired = false;
  public purchaseDocRequired = false;
  public maintenanceServiceDocRequired = false;

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
    confirmButton: 'Yes',
    isWarning: true,
    hasError: false,
    hasHeader: true,
    cancelButton: 'No'
  };
  cancelDialogModal = false;
  errorDialogModal = false;
  //#endregion

  @ViewChild('stepper') stepper: MatStepper;

  // Mock Data
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
    { name: 'Day', id: 0 },
    { name: 'Week', id: 1 },
    { name: 'Month', id: 2 }
  ];
  periodType = [
    { name: 'Month', id: 'MONTH' },
    { name: 'Year', id: 'YEAR' }
  ];

  businessCategory$: Subscription;
  ownerShip$: Subscription;
  assetType$: Subscription;
  policyType$: Subscription;
  periodicService$: Subscription;
  department$: Subscription;
  operator$: Subscription;
  reviewPlaneSettingTable: TableSetting = {
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
  businessCategory = [];
  ownerShip = [];
  assetType = [];
  assetMake = [];
  assetModel = [];
  assetColor = [];
  assetTrim = [];
  policyTypeDropDown = [];
  policyTypeValue;
  periodicServiceItem = [];
  department = [];
  operator = [];
  testFile = [{ id: 1 }];

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
    data: []
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
    data: []
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
        field: 'model',
        type: 1,
        thumbField: 'model',
        renderer: ''
      },
      {
        lable: 'tables.column.department',
        type: 1,
        field: 'department',
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
    data: []
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
    private _periodicService: PeriodicServiceService,
    private _departmentService: OrganizationService,
    private _operatorService: OperatorService,
    private changeDetection: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._asset = [];
    this.formGroupAssetDetail = this._fb.group({
      businessInfo: this._fb.group({
        businessCategory: ['', Validators.compose([Validators.required])],
        ownership: ['', Validators.compose([Validators.required])]
      }),
      assetDetails: this._fb.group({
        year: ['', Validators.compose([Validators.required])],
        type: ['', Validators.compose([Validators.required])],
        make: ['', Validators.compose([Validators.required])],
        model: ['', Validators.compose([Validators.required])],
        color: ['', Validators.compose([Validators.required])],
        trim: ['', Validators.compose([Validators.required])],
        origin: ['', Validators.compose([Validators.required])],
        meterType: ['KILOMETER']
      }),
      purchasedFor: this._fb.group({
        department: ['', Validators.compose([Validators.required])],
        operator: ['', Validators.compose([Validators.required])]
      }),
      uploadFile: ['', Validators.compose([Validators.required])]
    });
    this.formGroupFinancial = this._fb.group({
      assetFinancialPlan: this._fb.group({
        policyType: ['', Validators.compose([Validators.required])],
        purchaseValue: ['', Validators.compose([Validators.required])]
      }),
      lifeCycle: this._fb.group({
        inServiceDate: ['', Validators.compose([Validators.required])],
        inServiceOdometer: ['', Validators.required],
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
      serialNumber: [''],
      uploadFile: ['']
    });
    this.route.url.subscribe((params) => {
      this.isEdit =
        params.filter((x) => x.path == 'edit-asset').length > 0 ? true : false;
      if (this.isEdit) {
        this.singleAsset = true;
        this.id = +params[params.length - 1].path;
        this._service
          .getAssetByID(this.id)
          .pipe(map((x) => x.message))
          .subscribe((x) => {
            if (x) {
              this._asset = x;
              console.log(x);
              this.formGroupGenerate.patchValue({
                quantity: ['singleAsset'],
                serialNumber: [x.dpd]
              });
              this.editPatchValue(this._asset);
            }
          });
      }
    });

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
          console.log(response);
          this.periodicServiceItem.push(response);
        });
      }
    );
    this.department$ = this._departmentService.loadAll().subscribe((data) => {
      data.message.map((response) => {
        const dep = {
          id: response.id,
          name: response.organizationName,
          organizationID: response.organizationNumber
        };
        this.department.push(dep);
      });
      // console.log('Department' , this._asset, this.isEdit)
      if (this.isEdit && this._asset) {
        this.formGroupAssetDetail.patchValue({
          purchasedFor: {
            department: this._asset.department.id
          }
        });
      }
    });

    this.operator$ = this._operatorService.loadAll().subscribe((data) => {
      data.message.map((response) => {
        const opr = {
          id: response.id,
          name: `${response.firstName} ${response.lastName}`
        };
        this.operator.push(opr);
      });
      if (this.isEdit && this._asset) {
        this.formGroupAssetDetail.patchValue({
          purchasedFor: {
            operator: this._asset.operator.id
          }
        });
      }
    });
    this.assetType$ = this._assetConfigurationService
      .loadAll()
      .subscribe((data) => {
        data.message.map((x) => {
          this.assetType.push(x);
        });
        if (this.isEdit) {
          this.assetType
            .find((z) => z.id == this._asset.assetTypeId)
            .makes.map((f) => {
              this.assetMake.push(f);
            });
          this.assetMake
            .find((z) => z.id == this._asset.makeId)
            .models.map((y) => {
              this.assetModel.push(y);
              this.assetColor = [];
              this.assetTrim = [];
              this.assetModel
                .find((x) => x.id == this._asset.modelId)
                .trims.map((x) => {
                  this.assetTrim.push(x);
                  x.colors.map((y) => {
                    this.assetColor.push(y);
                  });
                });
            });
          this.formGroupAssetDetail.patchValue({
            assetDetails: {
              year: +this._asset.year,
              type: this._asset.assetTypeId,
              make: this._asset.makeId,
              model: this._asset.modelId,
              color: this._asset.colorId,
              trim: this._asset.trimId
            }
          });
        }
      });

    // Request to Server - Error
    this._facade.error$.subscribe((x) => {
      if (x?.error) {
        this.errorDialogModal = true;
        this.errorDialogSetting.header = this.isEdit
          ? 'Edit Asset'
          : 'Add new asset';
        this.errorDialogSetting.hasError = true;
        this.errorDialogSetting.cancelButton = undefined;
        this.errorDialogSetting.confirmButton = 'Ok';
        this.changeDetection.detectChanges();
      } else {
        this.errorDialogModal = false;
      }
    });
    // Request to Server -  Submit
    this._facade.submitted$.subscribe((x) => {
      if (x) {
        this.dialogModal = true;
        this.dialogOption = 'success';
        this.dialogSetting.header = this.isEdit
          ? 'Edit Asset'
          : 'Add new asset';
        this.dialogSetting.message = this.isEdit
          ? 'Changes Asset Successfully'
          : 'Asset Added Successfully';
        this.dialogSetting.isWarning = false;
        this.dialogSetting.hasError = false;
        this.dialogSetting.confirmButton = 'Yes';
        this.dialogSetting.cancelButton = undefined;
        this.changeDetection.detectChanges();
      }
    });
  }

  public editPatchValue(x) {
    this.vehicleDoc = Array.isArray(x.vehicleDocIds)
      ? x.vehicleDocIds
      : [x.vehicleDocIds];
    this.purchaseDoc = Array.isArray(x.purchaseDocId)
      ? x.purchaseDocId
      : [x.purchaseDocId];
    this.formGroupAssetDetail.patchValue({
      businessInfo: {
        businessCategory: x.businessCategoryId,
        ownership: x.ownershipId
      },
      assetDetails: {
        origin: x.origin,
        meterType: x.meterType
      },
      purchasedFor: {
        department: x.department.id,
        operator: x.operator.id
      },
      uploadFile: this.vehicleDoc
    });

    const date = moment.utc(x.inServiceDate, true).local();
    this.formGroupFinancial.patchValue({
      assetFinancialPlan: {
        policyType: x.policyTypeId,
        purchaseValue: x.purchaseValue
      },
      lifeCycle: {
        inServiceDate: date.toDate(),
        inServiceOdometer: x.inServiceOdometer
      },
      uploadFile: this.purchaseDoc
    });
    this.onChangePolicyType(x.policyTypeId);
    for (let index = 0; index < x.warranties.length - 1; index++) {
      this.addWarrantyItem(false);
    }
    this.onChangePeriodicService(x.periodicServiceId);
    this.formGroupMaintenance.patchValue({
      periodicService: x.periodicServiceId,
      description: x.description,
      warrantyItems: x.warranties.map((x) => {
        const date = moment.utc(x.startDate).local();
        this.warrantyDocs.push(x.docId);
        console.log(this.warrantyDocs);
        return {
          ...x,
          item: x.item,
          startDate: date.toDate(),
          duration: +x.duration,
          periodType: x.periodType,
          docId: +x.docId,
          hasReminder: x.hasReminder
        };
      })
    });
  }
  public calculateAssetPolicy() {
    this.calculate = true;
    let value = this.formGroupFinancial.get('assetFinancialPlan.purchaseValue')
      .value;
    let depreciationValue = this.policyTypeValue.depreciationValue;
    let maxUsageYear = this.policyTypeValue.maxUsageYear;
    let maxUsageKPHour = this.policyTypeValue.maxUsageKPHour;
    this.reviewPlaneSettingTable2.data = [];
    let newValue = (value * depreciationValue) / 100;
    for (let index = 0; index < maxUsageYear; index++) {
      value = value - newValue;
      const data = {
        year: index + 1,
        bookValue: Math.round(value)
      };

      this.reviewPlaneSettingTable2.data.push(data);
    }
  }
  public formBuilderArrayControl(): FormGroup {
    return this._fb.group({
      item: [''],
      periodType: [''],
      duration: [''],
      startDate: [''],
      hasReminder: [false],
      docId: ['']
    });
  }

  public trackItemFile(index: number, file) {
    return file.name;
  }
  selectedPlicyType(value) {
    // console.log(value);
  }

  next() {
    let activeStep = this.stepper.selectedIndex;
    switch (activeStep) {
      case 0: {
        this.submitted_AssetDetail = true;
        if (this.formGroupAssetDetail.get('uploadFile').invalid) {
          this.vehicleDocRequired = true;
        }
        if (this.formGroupAssetDetail.invalid) {
          this.formGroupAssetDetail.markAllAsTouched();
          return;
        }
        break;
      }
      case 1: {
        this.submitted_Financial = true;
        if (this.formGroupFinancial.get('uploadFile').invalid) {
          this.purchaseDocRequired = true;
        }
        if (this.formGroupFinancial.invalid) {
          this.formGroupFinancial.markAllAsTouched();
          return;
        }
        break;
      }
      case 2: {
        this.submitted_Maintenance = true;
        if (this.formGroupMaintenance.invalid) {
          this.formGroupMaintenance.markAllAsTouched();
          return;
        }
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
  assetQuantity(e) {
    console.log(e.target.value);
    switch (e.target.value) {
      case 'multipleAsset':
        this.formGroupGenerate
          .get('uploadFile')
          .setValidators([Validators.required]);
        this.formGroupGenerate.get('serialNumber').clearValidators();
        this.singleAsset = false;
        break;
      case 'singleAsset':
        this.formGroupGenerate
          .get('serialNumber')
          .setValidators([Validators.required]);
        this.formGroupGenerate.get('uploadFile').clearValidators();
        this.singleAsset = true;
        break;
      default:
        this.formGroupGenerate
          .get('uploadFile')
          .setValidators([Validators.required]);
        break;
    }
  }
  buttonUpload(): void {
    console.log('is valid', this.formGroupGenerate.get('uploadFile').valid);
    console.log('is valid', this.formGroupGenerate.valid);
    if (
      this.formGroupGenerate.get('uploadFile').invalid ||
      this.formGroupGenerate.get('uploadFile').value == ''
    ) {
      this.maintenanceServiceDocRequired = true;
      return;
    } else {
      let formVal_AssetDetail = this.formGroupAssetDetail.getRawValue();
      let data = [];
      let DPD = this.dpdGenerate(formVal_AssetDetail.businessInfo.ownership);
      for (let index = 0; index < this.csvText.length; index++) {
        data.push({
          asset: {
            img: 'assets/thumb1.png',
            assetName: this.assetType.find(
              (type) => type.id == formVal_AssetDetail.assetDetails.type
            ).name,
            assetSubName: DPD[index],
            ownership: this.ownerShip
              .find(
                (owned) =>
                  owned.id == formVal_AssetDetail.businessInfo.ownership
              )
              .type.toLowerCase()
          },
          s_n: this.csvText[index],
          model: this.assetModel.find(
            (model) => model.id == formVal_AssetDetail.assetDetails.model
          ).model,
          department: this.department.find(
            (dep) => dep.id == formVal_AssetDetail.purchasedFor.department
          ).name,
          type: this.assetType.find(
            (type) => type.id == formVal_AssetDetail.assetDetails.type
          ).name,
          businessCategory: this.businessCategory.find(
            (bus) => bus.id == formVal_AssetDetail.businessInfo.businessCategory
          ).name
        });
      }
      this.formReviewSettingTable.data = data;
      this.uploadReview = true;
    }
  }

  addWarrantyItem(hasValidation = true) {
    const item = this.formGroupMaintenance.get('warrantyItems') as FormArray;
    item.push(this.formBuilderArrayControl());
  }

  getWarrantyDoc(index) {
    console.log(this.warrantyDocs);
    console.log(index);
    console.log(this.warrantyDocs[index]);
    return [this.warrantyDocs[index]];
  }
  getWarrantyStartDat(i: number) {
    const date = this.warrantyStartDate.controls[i] as FormGroup;
    return date.get('startDate').value;
  }
  onChangeAssetType(event) {
    this.assetMake = [];
    const value = event.value ? event.value : event;
    this.assetType
      .find((x) => x.id == value)
      .makes.map((x) => {
        this.assetMake.push(x);
      });
  }
  onChangeAssetMake(event) {
    this.assetModel = [];

    const value = event.value ? event.value : event;
    this.assetMake
      .find((x) => x.id == value)
      .models.map((x) => {
        this.assetModel.push(x);
      });
  }

  onChangeAssetModel(event) {
    const value = event.value ? event.value : event;
    this.assetColor = [];
    this.assetTrim = [];
    this.assetModel
      .find((x) => x.id == value)
      .trims.map((x) => {
        this.assetTrim.push(x);
        x.colors.map((y) => {
          this.assetColor.push(y);
        });
      });
  }

  onChangePolicyType(event) {
    this.calculate = false;
    const value = event.value ? event.value : event;
    this.policyTypeValue = this.policyTypeDropDown.find((x) => x.id == value);
    const dataChange = {
      depreciationValue: `%${this.policyTypeValue.depreciationValue}`,
      maxUsageYear: `After ${this.policyTypeValue.maxUsageYear} years`,
      maxUsageKPHour: `After ${this.policyTypeValue.maxUsageKPHour}Km/HRS`
    };
    this.reviewPlaneSettingTable.data = [];
    this.reviewPlaneSettingTable.data.push(dataChange);
    this.policyTypeTableData$.next([dataChange]);
  }
  onChangePeriodicService(event) {
    const value = event.value ? event.value : event;
    this._periodicService.getById(value).subscribe((x) => {
      const packages = x.message.packages;
      let data = [];
      for (let index = 0; index < packages.length; index++) {
        const tasks = packages[index].tasks;
        let taskData = '';
        for (let i = 0; i < tasks.length; i++) {
          taskData += `${tasks[i].taskMasterName} ,`;
        }
        data.push({
          intervals: `Every ${packages[index].intervalValue} ${packages[index].intervalType}`,
          serviceTask: taskData.substring(0, taskData.length - 1)
        });
      }
      this.periodicServiceTableData$.next(data);
    });
  }
  csvReader(event) {
    this.csvText = event;
  }

  dpdGenerate(ownership) {
    const fleetItCode = this.ownerShip.find((x) => x.id == ownership)
      .fleetITCode;
    let dpdCodes = [];
    this.csvText.map((x) => {
      dpdCodes.push(`${fleetItCode}${x}`);
    });
    return dpdCodes;
  }
  generateForm() {
    let formVal_AssetDetail = this.formGroupAssetDetail.getRawValue();
    let formVal_Financial = this.formGroupFinancial.getRawValue();
    let formVal_Maintenance = this.formGroupMaintenance.getRawValue();
    let formVal_Generate = this.formGroupGenerate.getRawValue();
    let dpdcodes = this.dpdGenerate(formVal_AssetDetail.businessInfo.ownership);
    this.submitted_Generate = true;
    if (this.formGroupGenerate.invalid) {
      return;
    }
    if (this.isEdit) {
      let formValue = {
        id: this.id,
        avatarId: 1,
        businessCategoryId: formVal_AssetDetail.businessInfo.businessCategory,
        ownershipId: formVal_AssetDetail.businessInfo.ownership,
        year: formVal_AssetDetail.assetDetails.year,
        assetTypeId: formVal_AssetDetail.assetDetails.type,
        makeId: formVal_AssetDetail.assetDetails.make,
        modelId: formVal_AssetDetail.assetDetails.model,
        colorId: formVal_AssetDetail.assetDetails.color,
        trimId: formVal_AssetDetail.assetDetails.trim,
        origin: formVal_AssetDetail.assetDetails.origin,
        meterType: formVal_AssetDetail.assetDetails.meterType,
        vehicleDocIds: formVal_AssetDetail.uploadFile,
        organizationId: 1,
        departmentId: formVal_AssetDetail.purchasedFor.department,
        operatorId: formVal_AssetDetail.purchasedFor.operator,
        policyTypeId: formVal_Financial.assetFinancialPlan.policyType,
        purchaseValue: +formVal_Financial.assetFinancialPlan.purchaseValue,
        inServiceDate: formVal_Financial.lifeCycle.inServiceDate.toISOString(),
        inServiceOdometer: +formVal_Financial.lifeCycle.inServiceOdometer,
        purchaseDocId: +formVal_Financial.uploadFile[0].toString(),
        periodicServiceId: formVal_Maintenance.periodicService,
        warrantyItems: formVal_Maintenance.warrantyItems,
        description: formVal_Maintenance.description,
        dpds:
          typeof this._asset.dpd === 'string'
            ? new Array(this._asset.dpd)
            : this._asset.dpd
      };
      formValue.warrantyItems.map((x) => {
        x.startDate = x.startDate.toISOString();
      });
      this._facade.editAsset(formValue);
    } else {
      let formValue = {
        avatarId: 1,
        businessCategoryId: formVal_AssetDetail.businessInfo.businessCategory,
        ownershipId: formVal_AssetDetail.businessInfo.ownership,
        year: formVal_AssetDetail.assetDetails.year,
        assetTypeId: formVal_AssetDetail.assetDetails.type,
        makeId: formVal_AssetDetail.assetDetails.make,
        modelId: formVal_AssetDetail.assetDetails.model,
        colorId: formVal_AssetDetail.assetDetails.color,
        trimId: formVal_AssetDetail.assetDetails.trim,
        origin: formVal_AssetDetail.assetDetails.origin,
        meterType: formVal_AssetDetail.assetDetails.meterType,
        vehicleDocIds: formVal_AssetDetail.uploadFile,
        organizationId: 1,
        departmentId: formVal_AssetDetail.purchasedFor.department,
        operatorId: formVal_AssetDetail.purchasedFor.operator,
        policyTypeId: formVal_Financial.assetFinancialPlan.policyType,
        purchaseValue: +formVal_Financial.assetFinancialPlan.purchaseValue,
        inServiceDate: formVal_Financial.lifeCycle.inServiceDate.toISOString(),
        inServiceOdometer: +formVal_Financial.lifeCycle.inServiceOdometer,
        purchaseDocId: +formVal_Financial.uploadFile[0].toString(),
        periodicServiceId: formVal_Maintenance.periodicService,
        warrantyItems: formVal_Maintenance.warrantyItems,
        description: formVal_Maintenance.description,
        // dpds: [
        //   `DPD${Math.floor(Math.random() * 99990)}`,
        //   `DPD${Math.floor(Math.random() * 99990)}`
        // ]
        dpds:
          formVal_Generate.quantity == 'multipleAsset'
            ? dpdcodes
            : [
                `${
                  this.ownerShip.find(
                    (x) => x.id == formVal_AssetDetail.businessInfo.ownership
                  ).fleetITCode
                }${formVal_Generate.serialNumber}`
              ]
      };
      formValue.warrantyItems.map((x) => {
        x.startDate = x.startDate.toISOString();
      });
      console.log(formValue);
      this._facade.addAsset(formValue);
    }
  }

  cancelForm() {
    this.cancelDialogModal = true;
    this.cancelDialogSetting.isWarning = true;
    this.changeDetection.detectChanges();
  }

  dialog(event) {
    if (event) {
      this._facade.reset();
      this._router.navigate(['/fleet/assets']);
    }
    this.dialogModal = false;
  }

  cancelDialog($event) {
    if ($event) {
      this._facade.reset();
      this._router.navigate(['/fleet/assets']);
    }
    this.dialogModal = false;
  }
  uploadVehicleFiles(e) {
    this.formGroupAssetDetail.patchValue({
      uploadFile: e.files
    });
  }
  uploadPurchaseFiles(e) {
    this.formGroupFinancial.patchValue({
      uploadFile: e.files
    });
  }
  uploadWarrantyFiles(e, i) {
    if (e.files.length > 0) {
      this.warrantyDocs[i] = e.files;
    }
    let formArray = <FormArray>(
      this.formGroupMaintenance.controls['warrantyItems']
    );
    formArray.controls[i].patchValue({ docId: e.files[0] });
  }
  maintenanceServiceFiles(e) {
    this.formGroupGenerate.patchValue({
      uploadFile: e.files
    });
  }
  ngOnDestroy(): void {
    this.businessCategory$.unsubscribe();
    this.ownerShip$.unsubscribe();
    this.assetType$.unsubscribe();
    this.policyType$.unsubscribe();
    this.department$.unsubscribe();
    this.operator$.unsubscribe();
  }
}

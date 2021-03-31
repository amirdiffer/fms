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
import { Utility } from '@shared/utility/utility';
import { Router } from '@angular/router';
import * as moment from "moment"
import {
  AssetMasterFacade,
  AssetMasterService
} from '@feature/fleet/+state/assets/asset-master';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { BusinessCategoryFacade } from '@feature/configuration/+state/business-category';
import { map , tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { OwnershipFacade } from '@feature/configuration/+state/ownership';
import { AssetConfigurationService } from '@feature/configuration/+state/asset-configuration/asset-configuration.service';
import { AssetPolicyFacade } from '@feature/configuration/+state/asset-policy';
import { PeriodicServiceFacade } from '@feature/configuration/+state/periodic-service';
import { OrganizationService } from '@feature/fleet/+state/organization';
import { OperatorService } from '@feature/fleet/+state/operator'

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
  public allFileUpload: IAllFileUpload = {
    uploadVehicleDoc: [],
    uploadPurchaseOrder: [],
    uploadMaintenanceService: [],
    warrantyItem: []
  };
  public vehicleDocRequired = false;
  vehicleDoc=[];
  public purchaseDocRequired = false;
  purchaseDoc=[];
  public maintenanceServiceDocRequired = false;
  maintenanceServiceDoc = [];
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
  periodType =[
    {name:'Month', id:'MONTH'},
    {name:'Year', id:'YEAR'},
  ]
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
  policyTypeValue;
  periodicService$: Subscription;
  periodicServiceItem = [];
  department$: Subscription;
  department = [];
  operator$: Subscription;
  operator=[]
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
    private _departmentService: OrganizationService,
    private _operatorService: OperatorService,
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
          console.log(x)
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
    this.department$ = this._departmentService.loadAll().subscribe(
      (data) => {
        data.message.map((response) => {
          console.log(response);
          const dep = {
            id: response.id,
            name: response.organizationName,
            organizationID: response.organizationNumber
          };
          
          this.department.push(dep)
        })
      }
    );
    
    this.operator$ = this._operatorService.loadAll().subscribe(
      (data) => {
        data.message.map((response) => {
          const opr = {
            id: response.id,
            name:`${response.firstName} ${response.lastName}`,
          }
          this.operator.push(opr);
        })
      }
    )
    

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
      uploadFile: ['',Validators.compose([Validators.required])]
    });
    console.log('dep' , this.department);
    console.log('opr' , this.operator);
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

    // Request to Server - Error
    this._facade.error$.subscribe((x) => {
      if (x?.error) {
        console.log(x?.error);
        this.errorDialogModal = true;
        this.errorDialogSetting.header = this.isEdit ? 'Edit Asset' :'Add new asset';
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
        this.dialogSetting.header = this.isEdit ? 'Edit Asset':'Add new asset';
        this.dialogSetting.message = this.isEdit ? 'Changes Asset Successfully' : 'Asset Added Successfully';
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
              console.log(x);
              console.log('assetType' , this.assetType)
              this._asset = x;
              console.log('department',x.department ,'this.department' ,this.department);
              if(this.assetType.length > 0){
                this.onChangeAssetMake(x.makeId)
                this.onChangeAssetModel(x.modelId)
              }
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
                  purchasedFor:{
                    department: x.department.id,
                    operator: x.operator.id
                  }
                });
                
                const date = moment.utc(x.inServiceDate , true).local();
                this.formGroupFinancial.patchValue({
                  assetFinancialPlan:{
                    policyType:x.policyTypeId,
                    purchaseValue: x.purchaseValue
                  },
                  lifeCycle:{
                    inServiceDate:date.toDate(),
                    inServiceOdometer:x.inServiceOdometer
                  }
                });
                this.onChangePolicyType(x.policyTypeId);
                for (let index = 0; index < x.warranties.length -1; index++){
                  this.addWarrantyItem(false);
                };
                this.formGroupMaintenance.patchValue({
                  periodicService : x.periodicServiceId,
                  description:x.description,
                  warrantyItems: x.warranties.map(
                    (x) => {
                      const date = moment.utc(x.startDate).local();
                      return {
                        ...x,
                        item:x.item,
                        startDate:date.toDate(),
                        duration: x.duration ,
                        periodType: x.periodType,
                        docId:x.docId,
                        hasReminder:x.hasReminder
                      }
                    }
                    
                  )
                });
                console.log(x.warranties.length)
            }
          });
      }
    });
    
  }
  public calculateAssetPolicy(){
    
    this.calculate = true;
    let value = this.formGroupFinancial.get('assetFinancialPlan.purchaseValue').value;
    let depreciationValue = this.policyTypeValue.maxUsageKPHour;
    let maxUsageYear = this.policyTypeValue.maxUsageYear;
    let maxUsageKPHour = this.policyTypeValue.maxUsageKPHour;
    let percent = depreciationValue / maxUsageYear;
    this.reviewPlaneSettingTable2.data = [];
    let newValue =  (value * percent) / 100 
    for (let index = 0; index < maxUsageYear; index++) {
      value = value - newValue
      const data = {
        year: index +1 ,
        bookValue : value
      }

      this.reviewPlaneSettingTable2.data.push(data)
    }
  }
  public formBuilderArrayControl(): FormGroup {
    return this._fb.group({
      item: [''],
      periodType: [''],
      duration: [''],
      startDate: [''],
      hasReminder:[false],
      docId:['']
    });
    
  }


  public trackItemFile(index: number, file) {
    return file.name;
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
        if(this.formGroupAssetDetail.get('uploadFile').invalid){
          this.vehicleDocRequired = true;
        }
        if (this.formGroupAssetDetail.invalid) return;
        break;
      }
      case 1: {
        console.log(this.formGroupFinancial.getRawValue());
        console.log(this.formGroupFinancial.getRawValue());
        this.submitted_Financial = true;
        if(this.formGroupFinancial.get('uploadFile').invalid){
          this.purchaseDocRequired = true
        }
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
    if(this.formGroupGenerate.get('uploadFile').invalid){
      this.maintenanceServiceDocRequired = true;
    }
    if (this.formGroupGenerate.invalid) return;
    this.uploadReview = true;
  }

  trackUploadItem() {
    const uinque = this.allFileUpload;
    return uinque;
  }

  addWarrantyItem(hasValidation = true) {
    if(hasValidation && this.formGroupMaintenance.invalid){
      return
    }
    const item = this.formGroupMaintenance.get('warrantyItems') as FormArray;
    item.push(this.formBuilderArrayControl());
  }

  getWarrantyStartDat(i: number) {
    const date = this.warrantyStartDate.controls[i] as FormGroup;
    return date.get('startDate').value;
  }

  onChangeAssetMake(event) {
    this.assetModel = [];
    const value = event.value ? event.value : event;
    console.log(this.assetType.find((x) => x.id == value))
    this.assetType.find((x) => x.id == value).makes.map((x) => {
      x.models.map((y) => {
        this.assetModel.push(y);
        console.log(this.assetModel);
      });
    });
  }

  onChangeAssetModel(event) {
    const value = event.value ? event.value : event
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
    this.calculate = false
    const value = event.value? event.value : event;
    this.policyTypeValue = this.policyTypeDropDown.find((x) => x.id == value);
    const dataChange = {
      depreciationValue: `%${this.policyTypeValue.maxUsageKPHour}`,
      maxUsageYear: `After ${this.policyTypeValue.maxUsageYear} years`,
      maxUsageKPHour: `After ${this.policyTypeValue.maxUsageKPHour}Km/HRS`
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
    
    
    if(this.isEdit) {
      let formValue = {
        id:this.id,
        avatarId: 1,
        businessCategoryId: formVal_AssetDetail.businessInfo.businessCategory,
        ownershipId: formVal_AssetDetail.businessInfo.ownership,
        year: formVal_AssetDetail.assetDetails.year,
        assetTypeId: 1,
        makeId: formVal_AssetDetail.assetDetails.make,
        modelId: formVal_AssetDetail.assetDetails.model,
        colorId: formVal_AssetDetail.assetDetails.color,
        trimId: formVal_AssetDetail.assetDetails.trim,
        origin: formVal_AssetDetail.assetDetails.origin,
        meterType: formVal_AssetDetail.assetDetails.meterType,
        organizationId: 1,
        departmentId: formVal_AssetDetail.purchasedFor.department,
        operatorId: formVal_AssetDetail.purchasedFor.operator,
        policyTypeId: formVal_Financial.assetFinancialPlan.policyType,
        purchaseValue: formVal_Financial.assetFinancialPlan.purchaseValue,
        inServiceDate: formVal_Financial.lifeCycle.inServiceDate.toISOString(),
        inServiceOdometer: formVal_Financial.lifeCycle.inServiceOdometer,
        purchaseDocId: 3,
        periodicServiceId: formVal_Maintenance.periodicService,
        warrantyItems: formVal_Maintenance.warrantyItems,
        description: formVal_Maintenance.description,
        dpds: typeof this._asset.dpd === 'string' ? new Array(this._asset.dpd ) : this._asset.dpd,
      };
      formValue.warrantyItems.map((x) => {x.startDate = x.startDate.toISOString()})
      console.log(formValue)
      this._facade.editAsset(formValue)
    }else{
      let formValue = {
        avatarId: 1,
        businessCategoryId: formVal_AssetDetail.businessInfo.businessCategory,
        ownershipId: formVal_AssetDetail.businessInfo.ownership,
        year: formVal_AssetDetail.assetDetails.year,
        assetTypeId: 1,
        makeId: formVal_AssetDetail.assetDetails.make,
        modelId: formVal_AssetDetail.assetDetails.model,
        colorId: formVal_AssetDetail.assetDetails.color,
        trimId: formVal_AssetDetail.assetDetails.trim,
        origin: formVal_AssetDetail.assetDetails.origin,
        meterType: formVal_AssetDetail.assetDetails.meterType,
        organizationId: 1,
        departmentId: formVal_AssetDetail.purchasedFor.department,
        operatorId: formVal_AssetDetail.purchasedFor.operator,
        policyTypeId: formVal_Financial.assetFinancialPlan.policyType,
        purchaseValue: formVal_Financial.assetFinancialPlan.purchaseValue,
        inServiceDate: formVal_Financial.lifeCycle.inServiceDate.toISOString(),
        inServiceOdometer: formVal_Financial.lifeCycle.inServiceOdometer,
        purchaseDocId: 3,
        periodicServiceId: formVal_Maintenance.periodicService,
        warrantyItems: formVal_Maintenance.warrantyItems,
        description: formVal_Maintenance.description,
        dpds: [
          `DPD${Math.floor(Math.random() * 99990)}`,
          `DPD${Math.floor(Math.random() * 99990)}`
        ]
      };
      formValue.warrantyItems.map((x) => {x.startDate = x.startDate.toISOString()})
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
  uploadVehicleFiles(e){
    this.formGroupAssetDetail.patchValue({
      uploadFile: e.files
    })
  }
  uploadPurchaseFiles(e){
    this.formGroupFinancial.patchValue({
      uploadFile: e.files
    })
  }
  uploadWarrantyFiles(e , i ){
    let formArray = <FormArray>this.formGroupMaintenance.controls["warrantyItems"];
    formArray.controls[i].patchValue({docId : e.files[0]});
  }
  maintenanceServiceFiles(e){
    this.formGroupGenerate.patchValue({
      uploadFile: e.files
    })
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

export interface IAllFileUpload {
  uploadVehicleDoc: any[];
  uploadPurchaseOrder: any[];
  uploadMaintenanceService: any[];
  warrantyItem: any[];
}

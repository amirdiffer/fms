import {
  Component,
  OnInit,
  ViewChild,
  Injector,
  OnDestroy
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { TableSetting } from '@core/table';
import { Utility } from '@shared/utility/utility';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { BusinessCategoryFacade } from '@feature/configuration/+state/business-category';
import { map, tap } from 'rxjs/operators';
import { Subscription, of, Observable, Subject, BehaviorSubject } from 'rxjs';
import { OwnershipFacade } from '@feature/configuration/+state/ownership';
import { AssetPolicyFacade } from '@feature/configuration/+state/asset-policy/asset';
import { PeriodicServiceFacade } from '@feature/configuration/+state/periodic-service';
import {
  OrganizationFacade,
  OrganizationService
} from '@feature/fleet/+state/organization';
import { OperatorFacade } from '@feature/fleet/+state/operator';
import { AssetTypeFacade } from '@feature/configuration/+state/fleet-configuration/asset-type';
import {
  AssetMasterFacade,
  AssetMasterService
} from '@feature/fleet/+state/assets/asset-master';
import { RegistrationFacade } from '@feature/fleet/+state/assets/registration';
import { DialogService } from '@core/dialog/dialog-template.component';

@Component({
  selector: 'anms-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss']
})
export class AddAssetComponent extends Utility implements OnInit, OnDestroy {
  //icons
  assetId = -1;
  calenderIcon = 'assets/icons/calendar-alt-regular.svg';
  closeIcon = 'assets/icons/times.svg';
  avatarDocId;
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
  departmentList: any[];
  departmentFiltered: any[];
  sectionFiltered: any[]=[];
  sectionList: any[] =[];
  departmentId;
  sectionId;
  policyTypeTableData$ = new BehaviorSubject<any>([]);
  private _asset;
  private csvText = [];
  yearRange =`2000:${new Date().getFullYear()}`
  /* Forms */
  formGroupAssetDetail: FormGroup;
  formGroupFinancial: FormGroup;
  formGroupMaintenance: FormGroup;
  formGroupGenerate: FormGroup;

  bussinessCategoryLoaded = false;
  ownershipLoaded = false;
  assetPolicyLoaded = false;
  periodicServiceLoaded = false;
  departmentLoaded = false;
  operatorLoaded = false;
  trigger = false;
  startGetting: Subject<any> = new Subject();

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
  
  get color(){
    return this.formGroupAssetDetail.get('assetDetails.color') as FormControl;
  }

  /* Autocomplete formControl */
  get department() {
    return this.formGroupAssetDetail.get('purchasedFor.department') as FormControl;
  }
  get section() {
    return this.formGroupAssetDetail.get('purchasedFor.section') as FormControl;
  }

  // Upload Files
  vehicleDoc = [];
  purchaseDoc = [];
  maintenanceServiceDoc = [];
  warrantyDocs = [];
  public vehicleDocRequired = false;
  public purchaseDocRequired = false;
  public maintenanceServiceDocRequired = false;
  public thumbnailRequired = false;
  public warrantyDocsRequired: boolean[] = [];

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

  businessCategory$: Observable<any>;
  ownerShip$: Observable<any>;

  /* Asset Type Inputs */
  make$: Observable<any>;
  model$: Observable<any>;
  trim$: Observable<any>;
  color$: Observable<any>;
  origin$: Observable<any>;
  department$: Observable<any>;
  section$: Observable<any>;
  operator$: Observable<any>;
  policyType$: Observable<any>;
  periodicService$: Observable<any>;
  periodicServiceTableData$: Observable<any>;
  warrantyTableData$ = new BehaviorSubject<any>(null);

  assetType$: Subscription;

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

  assetTypeLoad = new Subject<any>();
  policyTypeValue;
  assetType;
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
    data: []
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
    private _activatedRoute: ActivatedRoute,
    private _facade: AssetMasterFacade,
    private _assetRegistrationFacade: RegistrationFacade,
    private service: AssetMasterService,
    private _facadeBussinessCategory: BusinessCategoryFacade,
    private _facadeOwnership: OwnershipFacade,
    private _fleetConfiurationAsset: AssetTypeFacade,
    private _facadeDepartment: OrganizationFacade,
    private _facadeOperator: OperatorFacade,
    private _facadeAssetPolicy: AssetPolicyFacade,
    private _facadePeriodicService: PeriodicServiceFacade,
    private _departmentService: OrganizationService,
    private _dialogService : DialogService
  ) {
    super(injector);
  }

  ngOnInit(): void {


    /* Load Data */
    this._facadeBussinessCategory.loadAll();
    this._facadeOwnership.loadAll();
    this._facadeAssetPolicy.loadAll();
    this._facadePeriodicService.loadAll();
    this._facadeDepartment.loadAll();
    this._facadeOperator.loadAll();

    this.startGetting.subscribe((x) => {
      if (x == 'bussinessCategoryLoaded') this.bussinessCategoryLoaded = true;
      if (x == 'ownershipLoaded') this.ownershipLoaded = true;
      if (x == 'assetPolicyLoaded') this.assetPolicyLoaded = true;
      if (x == 'periodicServiceLoaded') this.periodicServiceLoaded = true;
      if (x == 'departmentLoaded') this.departmentLoaded = true;
      if (x == 'operatorLoaded') this.operatorLoaded = true;

      if (
        this.bussinessCategoryLoaded &&
        this.ownershipLoaded &&
        this.assetPolicyLoaded &&
        this.periodicServiceLoaded &&
        this.departmentLoaded &&
        this.operatorLoaded
      ) {
        if (this.isEdit && !this.trigger) {
          this.trigger = true;
          this.editFormGetValues();
        }
      }
    });

    this._facadeBussinessCategory.loaded$.subscribe((x) => {
      if (x) this.startGetting.next('bussinessCategoryLoaded');
    });
    this._facadeOwnership.loaded$.subscribe((x) => {
      if (x) this.startGetting.next('ownershipLoaded');
    });
    this._facadeAssetPolicy.loaded$.subscribe((x) => {
      if (x) this.startGetting.next('assetPolicyLoaded');
    });
    this._facadePeriodicService.loaded$.subscribe((x) => {
      if (x) this.startGetting.next('periodicServiceLoaded');
    });
    this._facadeDepartment.loaded$.subscribe((x) => {
      if (x) this.startGetting.next('departmentLoaded');
    });
    this._facadeOperator.loaded$.subscribe((x) => {
      if (x) this.startGetting.next('operatorLoaded');
    });

    /* Check if is Edit */
    const getURL = this._activatedRoute.snapshot.url;
    let filteredUrl = getURL.filter((x) => x.path === 'edit-asset');
    filteredUrl.length > 0 ? (this.isEdit = true) : (this.isEdit = false);
    if (this.isEdit) {
      this.singleAsset = true;
      this.id = +getURL[getURL.length - 1].path;
      this._facade.getAssetByID(this.id);
    }

    /* Load Form Data */
    this.businessCategory$ = this._facadeBussinessCategory.businessCategory$.pipe(
      map((x) => {
        if (x) {
          return x.map((category) => {
            return {
              ...category
            };
          });
        }
      })
    );

    this.ownerShip$ = this._facadeOwnership.ownership$.pipe(
      map((x) => {
        if (x) {
          return x.map((ownership) => {
            return {
              ...ownership,
              name: ownership.fleetITCode
            };
          });
        }
      })
    );

    this.make$ = this._fleetConfiurationAsset.specificAssetType$.pipe(
      map((x) => {
        if (x) {
          this.assetTypeLoad.next(x);
          this.assetType = x;
          return x.makes.map((makes) => {
            return {
              ...makes
            };
          });
        }
      })
    );

    this.department$ = this._facadeDepartment.organization$.pipe(
      map((x) => {
        if (x) {
          // this.startGetting.next("departmentLoaded")
          return x.map((department) => {
            return {
              ...department
            };
          });
        }
      })
    );

    this.section$ = this._facadeDepartment.organization$.pipe(
      map((x) => {
        if (x) {
          return x
            .filter(
              (x) =>
                x.id ==
                this.formGroupAssetDetail.get('purchasedFor.department.id')
                  .value
            )
            .map((department) => {
              return {
                ...department.departments
              };
            });
        }
      })
    );

    this._departmentService.loadWithPagination().subscribe((x) => {
      x.message
        ? // ? this.department.next(x.message)
          (this.departmentList = x.message)
        : (this.departmentList = []);
    });

    this.operator$ = this._facadeOperator.operator$.pipe(
      map((x) => {
        if (x) {
          return x.map((operator) => {
            return {
              ...operator
            };
          });
        }
      })
    );

    this.policyType$ = this._facadeAssetPolicy.assetPolicy$.pipe(
      map((x) => {
        if (x) {
          return x.map((policyType) => {
            if (policyType.type === 'ASSET') {
              return {
                ...policyType
              };
            }
          });
        }
      })
    );

    this.periodicService$ = this._facadePeriodicService.periodicService$.pipe(
      map((x) => {
        if (x) {
          return x.map((periodicService) => {
            return {
              ...periodicService
            };
          });
        }
      })
    );

    this.periodicServiceTableData$ = this._facadePeriodicService.specificPeriodicService$.pipe(
      map((x) => {
        if (x) {
          return x.packages.map((pkg) => {
            let taskData = '';
            for (let i = 0; i < pkg.tasks.length; i++) {
              taskData += `${pkg.tasks[i].taskMasterName} ,`;
            }
            return {
              intervals: `Every ${pkg.frequency} ${pkg.durationTypeForReminder}`,
              serviceTask: taskData.substring(0, taskData.length - 1)
            };
          });
        }
      })
    );

    this._asset = [];

    /* ---------- Form Builders ------- */
    /* STEP 1 */
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
        type: [''],
        meterType: ['KILOMETER']
      }),
      purchasedFor: this._fb.group({
        department: ['', Validators.compose([Validators.required , this.autocompleteDepartmentValidation])],
        section: ['', Validators.compose([Validators.required , this.autocompleteSectionValidation])],
        operator: ['', Validators.compose([Validators.required])]
      }),
      uploadFile: ['', Validators.compose([Validators.required])]
    });

    /* STEP 2 */
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

    /* STEP 3 */

    this.formGroupMaintenance = this._fb.group({
      periodicService: ['', Validators.compose([Validators.required])],
      warrantyItems: this._fb.array([this.formBuilderArrayControl()]),
      description: ['', Validators.compose([Validators.required])]
    });

    /* STEP 4 */
    this.formGroupGenerate = this._fb.group({
      quantity: ['multipleAsset', Validators.compose([Validators.required])],
      serialNumber: [''],
      uploadFile: [''],
      avatarId: ['']
    });

    // Request to Server - Error
    this._facade.error$.subscribe((x) => {
      if (x?.error) {
        const dialog = this._dialogService.show('danger' , (this.isEdit? 'Edit Asset': 'Add new asset') , 'We have an error.', 'Ok')
        const dialogClose$:Subscription = dialog.dialogClosed$
        .pipe(
          tap((result) => {
            if (result === 'confirm') {
              this._router.navigate(['/fleet/assets']);
            }
            dialogClose$?.unsubscribe();
          })
        ).subscribe();
      }
    });

    // Request to Server -  Submit
    this._facade.submitted$.subscribe((x) => {
      if (x) {
        const dialog = this._dialogService.show('success' ,
                  (this.isEdit? 'Edit Asset': 'Add new asset') , 
                  (this.isEdit ? 'Changes Asset Successfully.': 'Asset Added Successfully.') , 
                  ((this.isEdit || this.formGroupGenerate.get('quantity').value =='multipleAsset') ? 'Ok': 'Register Now'),
                  ((this.isEdit || this.formGroupGenerate.get('quantity').value =='multipleAsset')? undefined : 'Register Later') 
                  )
        const dialogClose$:Subscription = dialog.dialogClosed$
        .pipe(
          tap((result) => {
            if (result === 'confirm') {
              if(this.formGroupGenerate.get('quantity').value =='singleAsset' && this.assetId > 0 && !this.isEdit){
                this._router.navigate([
                  '/fleet/assets/' + this.assetId + '/registration'
                ]);
                
              }
              this._router.navigate(['/fleet/assets']);
            }
            dialogClose$?.unsubscribe();
          })
        ).subscribe();
        this._facade.loadAll();
        this._assetRegistrationFacade.loadAll();
      }
    });
  }
  /*ngOnInit END */

  public calculateAssetPolicy() {
    let depreciationValue;
    if (
      typeof this.policyTypeValue == 'number' ||
      !this.policyTypeValue.depreciationValue
    ) {
      this.policyType$.subscribe((x) => {
        this.onChangePolicyType(x.find((y) => y.id == this.policyTypeValue));
        depreciationValue = this.policyTypeValue.depreciationValue;
      });
    } else {
      depreciationValue = this.policyTypeValue.depreciationValue;
    }
    this.calculate = true;
    let value = this.formGroupFinancial.get('assetFinancialPlan.purchaseValue')
      .value;
    let maxUsageYear = this.policyTypeValue.maxUsageYear;
    let maxUsageKPHour = this.policyTypeValue.maxUsageKPHour;
    this.reviewPlaneSettingTable2.data = [];
    let newValue = (value * depreciationValue) / 100;

    let iterator: number;

    if (maxUsageYear === 0) {
      iterator = maxUsageKPHour;
      this.reviewPlaneSettingTable2.columns[0].lable = 'tables.column.km';
    } else {
      iterator = maxUsageYear;
      this.reviewPlaneSettingTable2.columns[0].lable = 'tables.column.year';
    }

    let kmValue = maxUsageKPHour;
    let kmBookValue = value;
    for (let index = 0; index < iterator; index++) {
      if (index > 9) {
        break;
      }
      if (
        this.reviewPlaneSettingTable2.data.length > 0 &&
        this.reviewPlaneSettingTable2.data[
          this.reviewPlaneSettingTable2.data.length - 1
        ].bookValue <= 0
      ) {
        break;
      }

      value = value - newValue;
      kmBookValue = kmBookValue - newValue;

      if (maxUsageYear === 0) {
        kmValue += maxUsageKPHour;
        const rowData = {
          year: kmValue,
          bookValue: Math.round(kmBookValue)
        };
        this.reviewPlaneSettingTable2.data.push(rowData);
        continue;
      }

      if (value > 0) {
        const data = {
          year: index + 1,
          bookValue: Math.round(value)
        };

        this.reviewPlaneSettingTable2.data.push(data);
      } else {
        const data = {
          year: index + 1,
          bookValue: 0
        };

        this.reviewPlaneSettingTable2.data.push(data);
        break;
      }
    }
  }

  public formBuilderArrayControl(): FormGroup {
    return this._fb.group({
      item: ['', [Validators.required]],
      periodType: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      hasReminder: [false],
      docId: ['', [Validators.required]]
    });
  }

  public trackItemFile(index: number, file) {
    return file.name;
  }

  selectedPlicyType(value) {}

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
    this.maintenanceServiceDocRequired = true;
    this.thumbnailRequired = true;
    if (
      this.formGroupGenerate.get('uploadFile').invalid ||
      this.formGroupGenerate.get('uploadFile').value == '' ||
      !this.avatarDocId
    ) {
      return;
    }  else {
      let formVal_AssetDetail = this.formGroupAssetDetail.getRawValue();
      let data = [];
      let DPD = this.dpdGenerate(formVal_AssetDetail.businessInfo.ownership);
      for (let index = 0; index < this.csvText.length - 1; index++) {
        data.push({
          asset: {
            img: this.avatarDocId,
            assetName: this.assetType.name,
            assetSubName: DPD[index],
            ownership: formVal_AssetDetail.businessInfo.ownership.name.toLowerCase()
          },
          s_n: this.csvText[index],
          model: formVal_AssetDetail.assetDetails.model.name,
          department:
            formVal_AssetDetail.purchasedFor.department.organizationName,
          type: this.assetType.name,
          businessCategory:
            formVal_AssetDetail.businessInfo.businessCategory.name
        });
      }
      this.formReviewSettingTable.data = data;
      this.uploadReview = true;
    }
  }

  addWarrantyItem(hasValidation = true) {
    const item = this.formGroupMaintenance.get('warrantyItems') as FormArray;
    if (item.invalid) return;
    item.push(this.formBuilderArrayControl());
  }

  getWarrantyDoc(index) {
    return [this.warrantyDocs[index]];
  }
  getWarrantyStartDat(i: number) {
    const date = this.warrantyStartDate.controls[i] as FormGroup;
    return date.get('startDate').value;
  }

  onBusinessCategoryChange(event): void {
    this._fleetConfiurationAsset.getAssetTypeByID(event.assetConfigurationId);
    this.formGroupAssetDetail
      .get('assetDetails')
      .patchValue({ type: event.assetConfigurationId });
  }

  onChangeAssetMake(event) {
    this.loadModel(event.models);
  }

  loadModel(model) {
    this.model$ = of(model);
  }

  onChangeAssetModel(event) {
    this.loadTrim(event.trims);
  }

  loadTrim(trim) {
    this.trim$ = of(trim);
  }

  onChangeAssetTrim(event) {
    this.loadColor(event.colors);
    this.origin$ = of(
      event.origins.map((x) => {
        return { name: x };
      })
    );
  }

  loadColor(color) {
    this.color$ = of(color);
  }

  onChangePolicyType(event) {
    this.calculate = false;
    this.policyTypeValue = event;
    const dataChange = {
      depreciationValue: `%${this.policyTypeValue?.depreciationValue}`,
      maxUsageYear: `After ${this.policyTypeValue?.maxUsageYear} years`,
      maxUsageKPHour: `After ${this.policyTypeValue?.maxUsageKPHour}Km/HRS`
    };
    // this.reviewPlaneSettingTable.data = [];
    // this.reviewPlaneSettingTable.data.push(dataChange);
    this.policyTypeTableData$.next([dataChange]);
  }
  onChangePeriodicService(event) {
    this._facadePeriodicService.specificPeriodicService(event.id);
  }

  csvReader(event) {
    this.csvText = event;
  }

  dpdGenerate(ownership) {
    let dpdCodes = [];
    this.csvText.map((x) => {
      dpdCodes.push(`${ownership.fleetITCode}${x}`);
    });
    return dpdCodes;
  }

  /* CREATE AN ASSET LAST STEP */
  generateForm() {
    let formVal_AssetDetail = this.formGroupAssetDetail.getRawValue();
    let formVal_Financial = this.formGroupFinancial.getRawValue();
    let formVal_Maintenance = this.formGroupMaintenance.getRawValue();
    let formVal_Generate = this.formGroupGenerate.getRawValue();
    let dpdcodes = this.dpdGenerate(formVal_AssetDetail.businessInfo.ownership);
    this.submitted_Generate = true;
    this.thumbnailRequired = true;
    if (this.formGroupGenerate.invalid || !this.avatarDocId) {
      return;
    }
    let data = {
      avatarId: this.avatarDocId,
      businessCategoryId: formVal_AssetDetail.businessInfo.businessCategory.id,
      ownershipId: formVal_AssetDetail.businessInfo.ownership.id,
      year: formVal_AssetDetail.assetDetails.year,
      assetTypeId: formVal_AssetDetail.assetDetails.type,
      makeId: formVal_AssetDetail.assetDetails.make.id,
      modelId: formVal_AssetDetail.assetDetails.model.id,
      trimColorId: formVal_AssetDetail.assetDetails.color.id,
      trimId: formVal_AssetDetail.assetDetails.trim.id,
      origin: formVal_AssetDetail.assetDetails.origin.name,
      meterType: formVal_AssetDetail.assetDetails.meterType,
      vehicleDocIds: formVal_AssetDetail.uploadFile,
      organizationId: this.departmentId,
      departmentId: this.sectionId,
      operatorId: formVal_AssetDetail.purchasedFor.operator.id,
      policyTypeId: formVal_Financial.assetFinancialPlan.policyType.id,
      purchaseValue: +formVal_Financial.assetFinancialPlan.purchaseValue,
      inServiceDate: formVal_Financial.lifeCycle.inServiceDate.toISOString(),
      inServiceOdometer: +formVal_Financial.lifeCycle.inServiceOdometer,
      purchaseDocId: +formVal_Financial.uploadFile[0].toString(),
      periodicServiceId: formVal_Maintenance.periodicService.id,
      warrantyItems: formVal_Maintenance.warrantyItems,
      description: formVal_Maintenance.description
    };
    if (this.isEdit) {
      let formValue = {
        ...data,
        avatarId: this.avatarDocId,
        id: this.id,
        dpd: this._asset.dpd
      };
      formValue.warrantyItems.map((x) => {
        x.startDate = x.startDate.toISOString();
      });
      const dialog = this._dialogService.show('warning' , 'Edit Asset' , 'Are you sure you want to edit Asset?' , 'Yes','Cancel')
        const dialogClose$:Subscription = dialog.dialogClosed$
        .pipe(
          tap((result) => {
          if (result === 'confirm') {
            this._facade.editAsset(formValue);
          }
          dialogClose$?.unsubscribe();
          })
        ).subscribe();
    } else {
      let formValue = {
        ...data,
        avatarId: this.avatarDocId,
        dpds:
          formVal_Generate.quantity == 'multipleAsset'
            ? dpdcodes
            : [
                `${formVal_AssetDetail.businessInfo.ownership.fleetITCode}${formVal_Generate.serialNumber}`
              ]
      };

      formValue.warrantyItems.map((x) => {
        x.startDate = x.startDate.toISOString();
      });
      this.service.addAsset(formValue).subscribe((x) => {
        if (x && x?.message) {
          if (x.message.length > 0) {
            if (x.message.length == 1) {
              if (Array.isArray(x.message) && x.message.length == 1) {
                this.assetId = x.message[0].id;
              } else {
                this.assetId = x.message?.id;
              }
            } else {
              this.assetId = -1;
            }
          const dialog = this._dialogService.show('success' ,
                  (this.isEdit? 'Edit Asset': 'Add new asset') ,
                  (this.isEdit ? 'Changes Asset Successfully.': 'Asset Added Successfully.') ,
                  (this.isEdit || formVal_Generate.quantity === 'multipleAsset' ? 'Ok': 'Register Now'),
                  (this.isEdit || formVal_Generate.quantity === 'multipleAsset' ? undefined : 'Register Later')
                  )
          const dialogClose$:Subscription = dialog.dialogClosed$
          .pipe(
            tap((result) => {
              if (result === 'confirm') {
                if (this.assetId > 0 && (!this.isEdit || formVal_Generate.quantity === 'multipleAsset')) {
                  this._router.navigate([
                    '/fleet/assets/' + this.assetId + '/registration'
                  ]);
                }
                if(this.isEdit) {this._router.navigate(['/fleet/assets'])}
              }else{
                this._router.navigate(['/fleet/assets']);
              }
              dialogClose$?.unsubscribe();
            })
          ).subscribe();
          this._facade.loadAll();
          this._assetRegistrationFacade.loadAll();
          }
        }
      });
    }
  }

  cancelForm() {
    const dialog = this._dialogService.show('warning' , 'Are you sure you want to leave?' , 'You have unsaved changes! If you leave, your changes will be lost.' , 'Ok','Cancel')
    const dialogClose$:Subscription = dialog.dialogClosed$
    .pipe(
      tap((result) => {
        if (result === 'confirm') {
          this._router.navigate(['/fleet/assets']);
        }
        dialogClose$?.unsubscribe();
      })
    )
    .subscribe();

  }


  /* Upload Files */
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

  uploadImage($event) {
    if (!$event || !$event.files) {
      return;
    }
    const docId = $event.files[0];
    this.avatarDocId = docId;
  }

  editFormGetValues() {
    this._facade.specificAsset$.subscribe((x) => {
      if (x) {
        this.assetTypeLoad.subscribe((y) => {
          if (y) {
            y.makes.map((make) => {
              if (make.id == x.makeId) {
                this.onChangeAssetMake(make);
                let models = make.models.find(
                  (model) => model.id === x.modelId
                );
                let trim = models.trims.find((trim) => trim.id === x.trimId);
                this.onChangeAssetModel(models);
                this.onChangeAssetTrim(trim);
              }
            });
          }
        });
        this.id = x.id;
        this.onBusinessCategoryChange(x);
        this.departmentId = x.department.organizationId;
        this.sectionId = x.department.id;
        this.formGroupAssetDetail.patchValue({
          businessInfo: {
            businessCategory: { id: x.businessCategoryId },
            ownership: { id: x.ownershipId }
          },
          assetDetails: {
            year: x.year,
            origin: { name: x.origin },
            meterType: x.meterType,
            make: { id: x.makeId },
            model: { id: x.modelId },
            trim: { id: x.trimId },
            color: { id: x.colorId }
          },
          purchasedFor: {
            department: {
              id: x.department.organizationId,
              organizationName: x.department.organizationName
            },
            section: { id: x.department.id, name: x.department.name },
            operator: { id: x.operator.id }
          },
          uploadFile: x.vehicleDocIds
        });
        this.formGroupGenerate.patchValue({
          quantity: ['singleAsset'],
          serialNumber: [x.dpd]
        });
        this.onChangePeriodicService({ id: x.periodicServiceId });
        this._asset = x;
        this.avatarDocId = x.avatarId;
        this.editPatchValue(x);
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
    const date = moment.utc(x.inServiceDate, true).local();

    this.formGroupFinancial.patchValue({
      assetFinancialPlan: {
        policyType: { id: x.policyTypeId },
        purchaseValue: x.purchaseValue
      },
      lifeCycle: {
        inServiceDate: date.toDate(),
        inServiceOdometer: x.inServiceOdometer
      },
      uploadFile: this.purchaseDoc
    });

    this.onChangePolicyType(x.policyTypeId);

    /* Warranties Patch Value */
    const warrantyFormArray = this.formGroupMaintenance.get(
      'warrantyItems'
    ) as FormArray;
    for (let index = 0; index < x.warranties.length; index++) {
      const warrantyDate = moment.utc(x.warranties[index].startDate).local();
      this.warrantyDocs.push(x.warranties[index].docId);
      warrantyFormArray.controls[index].patchValue({
        item: x.warranties[index].item,
        startDate: warrantyDate.toDate(),
        duration: +x.warranties[index].duration,
        periodType: x.warranties[index].periodType,
        docId: +x.warranties[index].docId,
        hasReminder: x.warranties[index].hasReminder
      });
      if (index === x.warranties.length - 1) {
        break;
      }
      this.addWarrantyItem();
    }
    if (warrantyFormArray.controls.length > x.warranties.length) {
      warrantyFormArray.removeAt(warrantyFormArray.controls.length - 1);
    }
    this.warrantyTableData();

    this.formGroupMaintenance.patchValue({
      periodicService: { id: x.periodicServiceId },
      description: x.description
    });
    this.calculateAssetPolicy();
  }

  differentYears(monthOrYears: string = 'YEAR', startDate, month: number) {
    let from = new Date(startDate);
    let calculateMonth = monthOrYears === 'YEAR' ? month * 12 : month;
    let endDate = new Date(from.setMonth(from.getMonth() + calculateMonth));
    return (
      endDate.getDate() + '/' + endDate.getMonth() + '/' + endDate.getFullYear()
    );
  }

  warrantyTableData() {
    let data = this.warrantyItems.controls.map((control) => {
      if (control.value.startDate === '') {
        return {
          ...control.value,
          warrantyFor: control.value.item
        };
      } else {
        let endDate = new Date(
          control.value.startDate * (this.isEdit ? 1000 : 1)
        );
        return {
          ...control.value,
          warrantyFor: control.value.item,
          start:
            endDate.getDate() +
            '/' +
            endDate.getMonth() +
            '/' +
            endDate.getFullYear(),
          end: this.differentYears(
            control.value.periodType,
            control.value.startDate * (this.isEdit ? 1000 : 1),
            control.value.duration
          )
        };
      }
    });
    this.warrantyTableData$.next(data);
  }

  selectWarrantyDate() {
    this.warrantyTableData();
  }

  searchDepartment(event) {
    let query = event.query;
    let filtered = [];
    for (let index = 0; index < this.departmentList.length; index++) {
      let department = this.departmentList[index];
      if (
        department.organizationName
          .toLowerCase()
          .indexOf(query.toLowerCase()) == 0
      ) {
        filtered.push(department);
      }
    }
    this.departmentFiltered = filtered;
  }

  searchSection(event) {
    let query = event.query;
    let filtered = [];
    for (let index = 0; index < this.sectionList.length; index++) {
      let section = this.sectionList[index];
      if (section.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(section);
      }
    }
    this.sectionFiltered = filtered;
  }

  departmentChanged($event) {
    if (typeof $event != 'object') return;
    this.sectionList = [];
    this.formGroupAssetDetail.get('purchasedFor.section').patchValue(null);
    this.departmentId = $event.id;
    this._departmentService.searchDepartment($event.id).subscribe((x) => {
      x.message.departments
        ? (this.sectionList = x.message.departments)
        : (this.sectionList = []);
    });
  }

  sectionChanged($event) {
    if (typeof $event != 'object') return;
    this.sectionId = $event.id;
  }

  /* Custom validation */
  autocompleteDepartmentValidation(input: FormControl) {
    if(input.value && input.value !== null){
      const inputValid = input.value.organizationName;
      if (inputValid) {
        return null;
      } else {
        return { needsExclamation: true };
      }
    }
  }
  autocompleteSectionValidation(input: FormControl) {
    if(input.value && input.value !== null){
      const inputValid = input.value.name;
      if (inputValid) {
        return null;
      } else {
        return { needsExclamation: true };
      }
    }
  }
  autocompleteErrorMessage(formControl:FormControl){
    if(formControl.invalid && formControl.errors && formControl.errors !== null){
      if(formControl.errors.required){
        return;
      }
      return formControl.errors.needsExclamation
    }
  }

  ngOnDestroy(): void {
    this._facade.reset();
  }
}

import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  ElementRef
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ColumnType, TableSetting } from '@core/table';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry
} from 'ngx-file-drop';

@Component({
  selector: 'anms-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddAssetComponent implements OnInit {
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

  /* Ngx File Drop */
  public filesUpdloaded: NgxFileDropEntry[] = [];
  public allFileUpload: IAllFileUpload = {
    uploadVehicleDoc: [],
    uploadPurchaseOrder: [],
    uploadMaintenanceService: [],
    warrantyItem: []
  };

  @ViewChild('stepper') stepper: MatStepper;
  itemTypes = [
    { name: 'Item type 1', id: 1 },
    { name: 'Item type 2', id: 2 },
    { name: 'Item type 3', id: 3 },
    { name: 'Item type 4', id: 4 },
    { name: 'Item type 5', id: 5 },
    { name: 'Item type 6', id: 6 }
  ];
  reviewPlaneSettingTable: TableSetting = {
    columns: [
      {
        lable: 'tables.column.depreciation_value',
        type: 1,
        field: 'value',
        renderer: ''
      },
      {
        lable: 'tables.column.out_of_policy',
        type: 1,
        field: 'outOfPolicy1',
        renderer: ''
      },
      {
        lable: 'tables.column.out_of_policy',
        type: 1,
        field: 'outOfPolicy2',
        renderer: ''
      }
    ],
    data: [
      {
        value: '%20',
        outOfPolicy1: 'After 6 Years',
        outOfPolicy2: 'After 545645464Km/HRS'
      }
    ]
  };
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
  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroupAssetDetail = this._fb.group({
      businessInfo: this._fb.group({
        businessCategory: [''],
        ownership: ['']
      }),
      assetDetails: this._fb.group({
        year: [''],
        make: [''],
        model: [''],
        color: [''],
        trim: [''],
        origin: [''],
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
        policyType: [''],
        purchaseValue: ['']
      }),
      lifeCycle: this._fb.group({
        inServiceDate: [''],
        inServiceOdometer: [''],
        inServiceDateReminder: [false],
        inServiceOdometerReminder: [false]
      }),
      uploadFile: ['']
    });
    this.formGroupMaintenance = this._fb.group({
      periodicService: [''],
      warrantyItems: this._fb.array([this.formBuilderArrayControl()]),
      description: ['']
    });
    console.log(this.allFileUpload);
  }
  public formBuilderArrayControl(): FormGroup {
    return this._fb.group({
      item: [''],
      year: [''],
      duration: [''],
      warrantyStartDate: [''],
      fileUpload: ['']
    });
  }

  public dropped(files: NgxFileDropEntry[], option: string) {
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
          this.allFileUpload.uploadPurchaseOrder.push(droppedFile);
          break;
        case 'maintenanceService':
          this.allFileUpload.uploadMaintenanceService.push(droppedFile);
          break;
        case 'warranty':
          this.allFileUpload.warrantyItem.push(droppedFile);
          break;
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
  trackUploadItem() {
    const uinque = this.allFileUpload;
    return uinque;
  }
  addWarrantyItem() {
    const item = this.formGroupMaintenance.get('warrantyItems') as FormArray;
    item.push(this.formBuilderArrayControl());
  }
  getWarrantyStartDat(i: number) {
    const date = this.warrantyStartDate.controls[i] as FormGroup;
    return date.get('warrantyStartDate').value;
  }
  generateForm() {}
}

export interface IAllFileUpload {
  uploadVehicleDoc: any[];
  uploadPurchaseOrder: any[];
  uploadMaintenanceService: any[];
  warrantyItem: any[];
}

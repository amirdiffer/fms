import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { SubAssetTypeFacade } from '@feature/configuration/+state/fleet-configuration';
import { AssetPolicyFacade,SubAssetPolicyFacade } from '@feature/configuration/+state/asset-policy';
import { SubAssetService, SubAssetFacade } from '@feature/fleet/+state/sub-asset';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { ColumnDifinition, TableSetting } from '@core/table';
import { Utility } from '@shared/utility/utility';
import * as moment from 'moment';
import { Subject, Subscription } from 'rxjs';
import { ResponseBody } from '@models/responseBody';
import { environment } from '@environments/environment';
const SUB_ASSET_LABEL = 'SUB_ASSET';

@Component({
  selector: 'anms-add-sub-asset',
  templateUrl: './add-sub-asset.component.html',
  styleUrls: ['./add-sub-asset.component.scss']
})
export class AddSubAssetComponent extends Utility implements OnInit, OnDestroy {

  //#region Variables
  invalidAvatar = false;
  itemId = this.route.snapshot.params['id'];
  formCurrentStep = 0;
  csvText: [];
  csvDoc = [];
  progressBarValue = 20;
  subAssetDocRequired: boolean = false;
  subAssetForm: FormGroup;
  warranties: FormArray;
  submitted = false;
  warrantyDocs = [];
  avatarDoc = [];
  subAssetTypes = [];
  makes = [];
  models = [];
  policyTypes = [];
  units = [
    { name: 'Year', id: 'YEAR' },
    { name: 'Month', id: 'MONTH' }
  ];
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
  filesUploaded: NgxFileDropEntry[] = [];
  dialogModal = false;
  dialogType = null;
  errorDialogModal = false;
  isEdit: any;
  recordId: number;
  isSingleAsset = true;
  avatarDocRequired: boolean = false;

  assetPolicyLoaded: boolean = false;
  subAssetTypeLoaded: boolean = false;
  subAsset: boolean = false;
  formTempValue;

  formFill: Subject<string> = new Subject();
  formFill$ = this.formFill.asObservable();
  getSubAssetOnEditSubscriber!: Subscription
  getSubAssetSubscriber!: Subscription
  //#endregion

  //#region  TablesRegion
  thirdStepTableColumns: ColumnDifinition[] = [
    {
      lable: 'tables.column.sub_asset_name',
      field: 'subAssetName',
      type: 1,
      thumbField: 'img',
      renderer: 'assetsRenderer'
    },
    {
      lable: 'tables.column.model',
      field: 'model',
      type: 1
    },
    {
      lable: 'tables.column.make',
      field: 'make',
      type: 1
    },
    {
      lable: 'tables.column.serial_number',
      field: 'serialNumber',
      type: 1
    },
    {
      lable: 'tables.column.type',
      field: 'type',
      type: 1
    }
  ];
  thirdStepTable: TableSetting = {
    columns: this.thirdStepTableColumns,
    data: []
  };
  //#endregion

  //#region  DialogRegion
  dialogSetting: IDialogAlert = {
    header: 'Add new Sub Asset alert',
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
  //#endregion

  constructor(
    injector: Injector,
    private _fb: FormBuilder,
    private subAssetFacade: SubAssetFacade,
    private subAssetService: SubAssetService,
    private subAssetTypeFacade: SubAssetTypeFacade,
    private assetPolicyFacade: AssetPolicyFacade,
    private subAssetPolicyFacade: SubAssetPolicyFacade,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.subAssetTypeFacade.loadAll();
    this.assetPolicyFacade.loadAll();

    this.subAssetTypeFacade.loaded$.subscribe(x => {
      this.formFill.next("subAssetType");
    });

    this.assetPolicyFacade.loaded$.subscribe(x => {
      this.formFill.next("assetPolicy");
    });

    this.formFill$.subscribe(x => {
      if (x) {
        if (x == "subAssetType") this.subAssetTypeLoaded = true;
        if (x == "assetPolicy") this.assetPolicyLoaded = true;
        if (x == "subAsset") this.subAsset = true;
        if (this.subAssetTypeLoaded && this.assetPolicyLoaded && this.subAsset) {
          //We Need that Part of Code incase of we need diasabled inputs turn to select again
        }
      }
    })

    this.buildForm();
    this.handleEditMode();

    this.handleSubmissionDialog();
    this.handleErrorDialog();

    // multi asset handling
    this.subAssetForm.valueChanges.subscribe((v) =>
      v.assetQuantity === 'single'
        ? (this.isSingleAsset = true)
        : (this.isSingleAsset = false)
    );
  }
  handleEditMode() {
    if (this.itemId) {
      this.isEdit = true;
      this.recordId = this.itemId;

      this.getSubAssetOnEditSubscriber = this.subAssetService.getSubAsset(this.itemId).subscribe((response: ResponseBody<any>) => {
        const message = response.message
        this.subAssetTypes = []
        const subAssetObject = {
          name: message.subAssetConfigurationName,
          id: message.subAssetConfigurationId,
          children: []
        }
        this.subAssetTypes.push(subAssetObject)
        this.makes = []
        const makeObject = {
          name: message.subAssetMakeName,
          id: message.subAssetMakeId,
          children: []
        }
        this.makes.push(makeObject);
        this.models = []
        const modelObject = {
          name: message.subAssetModelName,
          id: message.subAssetModelId,
        }
        this.models.push(modelObject);
      })
    }

    this.initAssetTypes();
    this.initPolicyTypes();
  }

  loadSubAssetFormData(recordId: number) {
    this.getSubAssetSubscriber = this.subAssetService.getSubAsset(recordId).subscribe((result: any) => {
      if (result && result.message) {
        console.log(result.message)
        const subAsset = result.message;
        for (let index = 0; index < subAsset.warranties.length - 1; index++) {
          this.addWarranty();
        }
        this.subAssetForm.patchValue({
          warranties: subAsset.warranties.map((x) => {
            const date = moment.utc(this.isEdit?x.startDate*1000:x.startDate).local();
            this.warrantyDocs.push(x.docId);
            return {
              ...x,
              periodType: x.durationType,
              duration: x.duration,
              startDate: date.toDate(),
              item: x.item,
              doc: +x.docId
            };
          })
        });
        this.subAssetForm.patchValue({
          avatarId: subAsset.avatarId
        });
        this.avatarDoc = Array.isArray(subAsset.avatarId)
          ? subAsset.avatarId
          : [subAsset.avatarId];
        const {
          subAssetConfigurationId,
          subAssetConfigurationName,
          avatarId,
          date,
          description,
          serialNumber,
          subAssetMakeId,
          subAssetMakeName,
          subAssetModelId,
          subAssetModelName,
          policyTypeId,
          policyTypeName,
          purchaseValue,
          year
        } = subAsset;

        const policyType = { id: policyTypeId, name: policyTypeName };

        const formValue = {
          serialNumber: serialNumber,
          subAssetType: subAsset.subAssetConfigurationName,
          make: subAsset.subAssetMakeName,
          model: subAsset.subAssetModelName,
          year,
          policyType,
          purchaseValue,
          description
        };

        this.formTempValue = { ...formValue };
        this.subAssetForm.patchValue(formValue);
        this.subAssetForm.patchValue({
          year: +formValue.year
        });

        // todo : fill warranties
        this.formFill.next("subAsset");
      }
    });
  }

  handleSubmissionDialog() {
    this.subAssetFacade.submitted$.subscribe((x) => {
      if (x) {
        this.dialogModal = true;
        this.dialogType = 'success';
        this.dialogSetting.header = this.isEdit
          ? 'Edit Sub Asset'
          : 'Add new Sub Asset';
        this.dialogSetting.message = this.isEdit
          ? 'Changes Saved Successfully'
          : 'Sub Asset Added Successfully';
        this.dialogSetting.isWarning = false;
        this.dialogSetting.hasError = false;
        this.dialogSetting.confirmButton = 'OK';
        this.dialogSetting.cancelButton = undefined;
        this.subAssetFacade.loadAll();
      }
    });
  }

  handleErrorDialog() {
    this.subAssetFacade.error$.subscribe((x) => {
      if (x?.error) {
        this.errorDialogModal = true;
        this.errorDialogSetting.header = this.isEdit
          ? 'Edit Sub Asset'
          : 'Add new Sub Asset';
        this.errorDialogSetting.hasError = true;
        this.errorDialogSetting.cancelButton = undefined;
        this.errorDialogSetting.confirmButton = 'Ok';
      } else {
        this.errorDialogModal = false;
      }
    });
  }

  buildForm() {
    this.subAssetForm = this._fb.group({
      serialNumber: [''],
      subAssetType: ['', [Validators.required]],
      make: ['', [Validators.required]],
      model: ['', [Validators.required]],
      year: ['', [Validators.required]],
      policyType: [''],
      purchaseValue: ['', [Validators.required]],
      avatarId: [null],
      description: [''],
      warranties: this._fb.array([this.createWarrantyForm()]),
      assetQuantity: ['single']
      // uploadFile:['']
    });

    // this.setAssetTypes['periodType'].value = 'MONTH';
  }

  initPolicyTypes() {
    this.subAssetPolicyFacade.loadAll();
    this.subAssetPolicyFacade.subAssetPolicy$.subscribe(
      (result) => {
        if (result) {
          this.policyTypes = result.map((policyType:any) => ({
            id: policyType.id,
            name: policyType.name
          }));
        }
      },
      (error) => { }
    );
  }

  initAssetType = false;
  initAssetTypes() {
    this.subAssetTypeFacade.subAssetType$.subscribe(
      (result) => {
        if (result) {
          this.setAssetTypes(result);
          if (this.isEdit && !this.initAssetType) {
            this.loadSubAssetFormData(this.recordId);
            this.initAssetType = true;
          }
        }
      },
      (error) => { }
    );
  }

  dialogConfirm($event) {
    this.dialogModal = false;
    if ($event) {
      this.subAssetFacade.reset();
      this._goToList();
    }
    return;
  }

  _goToList() {
    this.router.navigate(['/fleet/sub-asset/']);
  }

  next(): void {
    if (this.subAssetForm.invalid) {
      this.subAssetForm.markAllAsTouched();
      this.submitted = true;
      return;
    }
    this.formCurrentStep += 1;
  }

  upload() {
    if (this.avatarDoc.length < 1 || this.avatarDoc.length < 1) {
      this.subAssetDocRequired = true;
      this.avatarDocRequired = true;
      return;
    }

    let formVal = this.subAssetForm.getRawValue();
    let data = [];
    let DPD = [];
    this.csvText.map((x) => {
      DPD.push(`DPD${x}`);
    });
    for (let index = 0; index < this.csvText.length; index++) {
      data.push({
        subAssetName: {
          img: environment.baseApiUrl + 'document/' + this.avatarDoc[0],
          assetName: this.subAssetForm.get('subAssetType').value.name,
          assetSubName: DPD[index]
        },
        model: this.subAssetForm.get('model').value.name,
        make: this.subAssetForm.get('make').value.name,
        serialNumber: this.csvText[index],
        type: this.subAssetForm.get('subAssetType').value.name,
      });
      console.log(this.models)
    }
    this.thirdStepTable.data = data;
    this.formCurrentStep += 1;
  }

  previous(): void {
    this.formCurrentStep -= 1;
  }

  uploadWarrantyFiles(evt, index: number) {
    if (!evt || !evt.files) {
      return;
    }
    const docId = evt.files[0];
    const docControl = (this.subAssetForm.controls['warranties'] as FormArray)
      .at(index)
      .get('doc');
    docControl.setValue(docId);
    if (evt.files.length > 0) {
      this.warrantyDocs[index] = evt.files;
    }
  }

  addWarranty(): void {
    this.warranties = this.subAssetForm.get('warranties') as FormArray;
    this.warranties.push(this.createWarrantyForm());
  }

  createWarrantyForm(
    item = '',
    periodType = 'YEAR',
    duration = '',
    startDate = ''
  ): FormGroup {
    return this._fb.group({
      item: [item, Validators.required],
      periodType: [periodType, Validators.required],
      duration: [duration, Validators.required],
      startDate: [startDate, Validators.required],
      doc: ['', Validators.required]
    });
  }

  setAssetTypes(assetTypes) {
    if (!assetTypes) {
      return [];
    }

    return (this.subAssetTypes = assetTypes.map((assetType) => ({
      id: assetType.id,
      name: assetType.name,
      children: assetType.makes ? assetType.makes : []
    })));
  }

  setMakes(subAssetType) {
    if (!subAssetType) {
      return;
    }

    const makes = subAssetType.children;
    return (this.makes = makes.map((make) => ({
      id: make.id,
      name: make.name,
      children: make.models ? make.models : []
    })));
  }

  setModels(make) {
    if (!make) {
      return;
    }

    const models = make.children;
    return (this.models = models.map((model) => ({
      id: model.id,
      name: model.name,
    })));
  }

  submit() {
    this.submitted = true;
    this.invalidAvatar = this.subAssetForm.value.avatarId ? false : true;
    if (this.subAssetForm.invalid || this.invalidAvatar) {
      return;
    } else {
      const data = this.getSubAssetRequestPayload(this.subAssetForm.value);
      if (!this.isEdit) {
        this.subAssetFacade.addSubAsset(data);
      } else {
        data['id'] = this.recordId;
        this.subAssetFacade.editSubAsset(data);
      }
    }
  }

  getSubAssetRequestPayload(subAssetFormValue) {
    const {
      make,
      model,
      avatarId,
      subAssetType,
      policyType,
      year,
      purchaseValue,
      description,
      warranties,
      serialNumber
    } = subAssetFormValue;

    // eg. DPD129348
    if (this.isEdit) {
      const serialNumber = subAssetFormValue.serialNumber;
      let dpd = '';
      isNaN(+serialNumber)
        ? (dpd = serialNumber)
        : (dpd = 'DPD' + serialNumber);
      return {
        id: this.recordId,
        avatarId,
        serialNumber: dpd,
        subAssetConfigurationId: this.subAssetTypes[0].id,
        makeId: this.makes[0].id,
        modelId: this.models[0].id,
        year: +year,
        policyTypeId: policyType.id,
        purchaseValue: +purchaseValue,
        description: description,
        warrantyItems: warranties.map((warranty) => ({
          periodType: warranty.periodType,
          duration: +warranty.duration,
          startDate: warranty.startDate.toISOString(),
          item: warranty.item,
          docId: warranty.doc,
          // docId: 1,
          hasReminder: true
        }))
      };
    } else {
      const dpds = [];
      if (this.isSingleAsset) {
        const serialNumber = +subAssetFormValue.serialNumber;
        if (serialNumber) {
          dpds.push('DPD' + serialNumber);
        }
      } else {
        this.csvText.map((x) => {
          dpds.push(`DPD${x}`);
        });
      }
      return {
        avatarId,
        serialNumbers: dpds,
        subAssetConfigurationId: subAssetType.id,
        makeId: make.id,
        modelId: model.id,
        year: +year,
        policyTypeId: policyType.id,
        purchaseValue: +purchaseValue,
        description: description,
        warrantyItems: warranties.map((warranty) => ({
          periodType: warranty.periodType,
          duration: +warranty.duration,
          startDate: warranty.startDate.toISOString(),
          item: warranty.item,
          docId: warranty.doc,
          // docId: 1,
          hasReminder: true
        }))
      };
    }
  }
  public dropped(files: NgxFileDropEntry[]) {
    this.filesUploaded = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => { });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }

  uploadAssetPicture($event) {
    const docId = $event.files[0];
    this.subAssetForm.controls['avatarId'].setValue(docId);
    if ($event.files.length > 0) {
      this.avatarDoc = $event.files;
    }
  }
  uploadDocFiles(event) {
    if (event.files.length > 0) {
      this.csvDoc = event.files;
    }
  }
  csvReader(event) {
    this.csvText = event;
  }

  cancel() {
    this.dialogSetting.isWarning = true;
    this.dialogSetting.hasError = false;
    this.dialogSetting.message = "Are you sure you want to Cancel?"
    this.dialogSetting.header = (this.isEdit ? "Cancel Edit Sub Asset" : "Cancel Add Sub Asset");
    this.dialogSetting.confirmButton = "Yes";
    this.dialogSetting.cancelButton = "No";
    this.dialogModal = true;
  }

  ngOnDestroy() {
    this.getSubAssetOnEditSubscriber?.unsubscribe()
    this.getSubAssetSubscriber?.unsubscribe()
  }

}

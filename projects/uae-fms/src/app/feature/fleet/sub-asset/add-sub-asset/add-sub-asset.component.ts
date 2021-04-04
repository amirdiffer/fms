import { map } from 'rxjs/operators';
import { SubAssetService } from './../../+state/sub-asset/sub-asset.service';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injector,
  ChangeDetectorRef
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utility } from '@shared/utility/utility';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry
} from 'ngx-file-drop';
import { ColumnDifinition, TableSetting } from '@core/table';
import { SubAssetFacade } from '@feature/fleet/+state/sub-asset/sub-asset.facade';
import { RouterFacade } from '@core/router';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import * as moment from 'moment';
const EMPTY_SELECT_ITEM_LIST = [
  {
    name: '',
    id: null
  }
];

const SUB_ASSET_LABEL = 'SUB_ASSET';

@Component({
  selector: 'anms-add-sub-asset',
  templateUrl: './add-sub-asset.component.html',
  styleUrls: ['./add-sub-asset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddSubAssetComponent extends Utility implements OnInit {
  formCurrentStep = 0;
  csvText: [];
  progressBarValue = 20;
  subAssetDocRequired: false;
  subAssetForm: FormGroup;
  warranties: FormArray;
  submitted = false;
  warrantyDocs = [];
  public filesUploaded: NgxFileDropEntry[] = [];

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
      thumbField: 'model',
      type: 3
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

  thirdStepTableData = [
    {
      subAssetName: {
        img: 'steering.png',
        assetName: 'Sub Asset Name',
        assetSubName: 'DPD 0000001'
      },
      model: 'bmw.png',
      make: 'Text text',
      serialNumber: '234567890',
      type: 'Gear'
    },
    {
      subAssetName: {
        img: 'steering.png',
        assetName: 'Sub Asset Name',
        assetSubName: 'DPD 0000001'
      },
      model: 'bmw.png',
      make: 'Text text',
      serialNumber: '234567890',
      type: 'Gear'
    },
    {
      subAssetName: {
        img: 'steering.png',
        assetName: 'Sub Asset Name',
        assetSubName: 'DPD 0000001'
      },
      model: 'bmw.png',
      make: 'Text text',
      serialNumber: '234567890',
      type: 'Gear'
    },
    {
      subAssetName: {
        img: 'steering.png',
        assetName: 'Sub Asset Name',
        assetSubName: 'DPD 0000001'
      },
      model: 'bmw.png',
      make: 'Text text',
      serialNumber: '234567890',
      type: 'Gear'
    },
    {
      subAssetName: {
        img: 'steering.png',
        assetName: 'Sub Asset Name',
        assetSubName: 'DPD 0000001'
      },
      model: 'bmw.png',
      make: 'Text text',
      serialNumber: '234567890',
      type: 'Gear'
    },
    {
      subAssetName: {
        img: 'steering.png',
        assetName: 'Sub Asset Name',
        assetSubName: 'DPD 0000001'
      },
      model: 'bmw.png',
      make: 'Text text',
      serialNumber: '234567890',
      type: 'Gear'
    },
    {
      subAssetName: {
        img: 'steering.png',
        assetName: 'Sub Asset Name',
        assetSubName: 'DPD 0000001'
      },
      model: 'bmw.png',
      make: 'Text text',
      serialNumber: '234567890',
      type: 'Gear'
    },
    {
      subAssetName: {
        img: 'steering.png',
        assetName: 'Sub Asset Name',
        assetSubName: 'DPD 0000001'
      },
      model: 'bmw.png',
      make: 'Text text',
      serialNumber: '234567890',
      type: 'Gear'
    }
  ];

  thirdStepTable: TableSetting = {
    columns: this.thirdStepTableColumns,
    data: this.thirdStepTableData
  };

  subAssetTypes = EMPTY_SELECT_ITEM_LIST;
  makes = EMPTY_SELECT_ITEM_LIST;
  models = EMPTY_SELECT_ITEM_LIST;
  policyTypes = EMPTY_SELECT_ITEM_LIST;

  units = [
    { name: 'Year ', id: 'YEAR' },
    { name: 'Month ', id: 'MONTH' }
  ];

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

  dialogModal = false;
  dialogType = null;
  errorDialogModal = false;
  isEdit: any;
  recordId: number;
  isSingleAsset = true;
  //#endregion

  constructor(
    injector: Injector,
    private _fb: FormBuilder,
    private subAssetFacade: SubAssetFacade,
    private subAssetService: SubAssetService,
    private routerFacade: RouterFacade,
    private changeDetector: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
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
    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams['id']) {
        this.isEdit = true;
        this.recordId = +queryParams['id'];
      }

      this.initAssetTypes();
      this.initPolicyTypes();
    });
  }
  getWarrantyDoc(index) {
    return [this.warrantyDocs[index]];
  }
  loadSubAssetFormData(recordId: number) {
    this.subAssetService.getSubAsset(recordId).subscribe((result: any) => {
      if (result && result.message) {
        const subAsset = result.message;
        this.subAssetForm.patchValue({
          warranties: subAsset.warranties.map((x) => {
            const date = moment.utc(x.startDate).local();
            this.warrantyDocs.push(x.docId);
            return {
              ...x,
              periodType: x.durationType,
              duration: x.duration,
              startDate: date.toDate(),
              item: x.item,
              docId: +x.docId
            };
          })
        });
        this.subAssetForm.patchValue({
          avatarId: subAsset.avatarId
        });
        const {
          assetTypeId,
          assetTypeName,
          avatarId,
          date,
          description,
          dpd,
          makeId,
          makeName,
          modelId,
          modelName,
          origin,
          policyTypeId,
          policyTypeName,
          purchaseValue,
          year
        } = subAsset;

        const selectedSubAsset: any = this.subAssetTypes.find(
          (a) => a.id === assetTypeId
        );
        this.setMakes(selectedSubAsset);
        const selectedMake: any = this.makes.find((a) => a.id === makeId);
        this.setModels(selectedMake);
        const selectedModel: any = this.models.find((a) => a.id === modelId);

        const subAssetType = {
          id: assetTypeId,
          name: assetTypeName,
          children: selectedSubAsset
            ? selectedSubAsset.children
            : EMPTY_SELECT_ITEM_LIST
        };
        const make = {
          id: makeId,
          name: makeName,
          children: selectedMake
            ? selectedMake.children
            : EMPTY_SELECT_ITEM_LIST
        };
        const model = {
          id: modelId,
          name: modelName,
          children: selectedModel
            ? selectedModel.children
            : EMPTY_SELECT_ITEM_LIST
        };
        const policyType = { id: policyTypeId, name: policyTypeName };

        const formValue = {
          serialNumber: dpd,
          subAssetType,
          make,
          model,
          year,
          origin,
          policyType,
          purchaseValue,
          description
        };

        this.subAssetForm.patchValue(formValue);

        // reset warranty form
        // (this.subAssetForm.get('warrantyItems') as FormArray).removeAt(0);

        // todo : fill warranties
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
        this.changeDetector.detectChanges();
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
        this.changeDetector.detectChanges();
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
      origin: ['', [Validators.required]],
      policyType: ['', [Validators.required]],
      purchaseValue: ['', [Validators.required]],
      avatarId: [],
      description: [''],
      warranties: this._fb.array([this.createWarrantyForm()]),
      assetQuantity: ['single']
      // uploadFile:['']
    });
  }

  initPolicyTypes() {
    this.subAssetService.getPolicyTypes().subscribe(
      (result) => {
        if (result) {
          const policyTypes = result.message;

          this.policyTypes = policyTypes.map((policyType) => ({
            id: policyType.id,
            name: policyType.name
          }));
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  initAssetTypes() {
    this.subAssetService.getAssetTypes().subscribe(
      (result) => {
        if (result) {
          const assetTypes = result.message;
          const subAssetTypes = assetTypes.filter(
            (assetType) => assetType.type === SUB_ASSET_LABEL
          );
          this.setAssetTypes(subAssetTypes);
          if (this.isEdit) {
            this.loadSubAssetFormData(this.recordId);
          }
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  dialogConfirm($event) {
    this.subAssetFacade.reset();
    this.goToList();
    return;
  }

  next(): void {
    if (this.subAssetForm.invalid) {
      this.subAssetForm.markAllAsTouched();
      return;
    }

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
  }

  addWarranty(): void {
    this.warranties = this.subAssetForm.get('warranties') as FormArray;
    this.warranties.push(this.createWarrantyForm());
  }

  createWarrantyForm(
    item = '',
    year = '',
    duration = '',
    startDate = ''
  ): FormGroup {
    return this._fb.group({
      item: [item],
      periodType: [year],
      duration: [duration],
      startDate: [startDate],
      doc: ['']
    });
  }

  setAssetTypes(assetTypes) {
    if (!assetTypes) {
      return [];
    }

    return (this.subAssetTypes = assetTypes.map((assetType) => ({
      id: assetType.id,
      name: assetType.name,
      children: assetType.makes ? assetType.makes : EMPTY_SELECT_ITEM_LIST
    })));
  }

  setMakes(subAssetType) {
    if (!subAssetType) {
      return;
    }

    const makes = subAssetType.children;
    return (this.makes = makes.map((make) => ({
      id: make.id,
      name: make.make,
      children: make.models ? make.models : EMPTY_SELECT_ITEM_LIST
    })));
  }

  setModels(make) {
    if (!make) {
      return;
    }

    const models = make.children;
    return (this.models = models.map((model) => ({
      id: model.id,
      name: model.model,
      children: model.trims ? model.trims : EMPTY_SELECT_ITEM_LIST
    })));
  }

  submit() {
    this.submitted = true;
    if (this.subAssetForm.invalid) {
      return;
    } else {
      const data = this.getSubAssetRequestPayload(this.subAssetForm.value);
      if (!this.isEdit) {
        console.log(data);
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
      origin,
      year,
      purchaseValue,
      description,
      warranties
    } = subAssetFormValue;

    // eg. DPD129348
    if (this.isEdit) {
      const dpd = subAssetFormValue.serialNumber;
      return {
        avatarId,
        dpd,
        assetTypeId: subAssetType.id,
        makeId: make.id,
        origin: origin,
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
          // docId: +warranty.docId,
          docId: 1,
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
        dpds,
        assetTypeId: subAssetType.id,
        makeId: make.id,
        origin: origin,
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
          // docId: +warranty.docId,
          docId: 1,
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
        fileEntry.file((file: File) => {});
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }
  public fileOver(event) {
    // console.log(event);
  }

  public fileLeave(event) {
    // console.log(event);
  }

  uploadAssetPicture($event) {
    const docId = $event.files[0];
    this.subAssetForm.controls['avatarId'].setValue(docId);
  }
  uploadDocFiles(event) {
    this.subAssetForm.patchValue({
      // uploadFile: event.files
    });
  }
  csvReader(event) {
    this.csvText = event;
  }

  // uploadDocFiles(event) {
  //   this.subAssetForm.patchValue({
  //     uploadFile: event.files
  //   });
  // }
}

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Injector,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry
} from 'ngx-file-drop';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableSetting } from '@core/table';
import { IAssetType } from '@models/asset-type.model';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { AssetConfigurationService } from '@feature/configuration/asset-configuration/asset-configuration.service';
import { AssetTypeFacade } from '@feature/configuration/+state/asset-configuration';
import { DataService } from '@feature/configuration/asset-configuration/data.service';
import { Utility } from '@shared/utility/utility';

@Component({
  selector: 'anms-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddModelComponent
  extends Utility
  implements OnInit, AfterViewInit {
  radioButtonSelect: 'mModel';
  public filesUpdloaded: NgxFileDropEntry[] = [];
  inputForm: FormGroup;
  @ViewChild('progressBar', { static: false }) progressBar: ElementRef;
  @ViewChild('small', { static: false }) small: ElementRef;
  color = '#0000005E';
  maxValue = 100;
  value = 80;
  percent = 80;
  fileName = 'CSV File only';
  submited = false;

  assetConfigurationTableSetting!: TableSetting;

  assetType: IAssetType;

  dialogModal = false;

  dialogSetting: IDialogAlert = {
    header: 'Add Make',
    hasError: false,
    message: 'Message is Here',
    confirmButton: 'Register Now',
    cancelButton: 'Cancel'
  };

  get models(): FormArray {
    return this.inputForm.get('models') as FormArray;
  }

  constructor(
    private _fb: FormBuilder,
    private _renderer: Renderer2,
    private _assetConfigurationService: AssetConfigurationService,
    private facade: AssetTypeFacade,
    private changeDetectorRef: ChangeDetectorRef,
    private dataService: DataService,
    injector: Injector
  ) {
    super(injector);
    this.assetConfigurationTableSetting = this._assetConfigurationService.assetConfigurationableSetting();
  }

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      typeCategory: ['asset', Validators.required],
      models: new FormArray([this.createModel()])
      // typeName: ['', [Validators.required]],
      // activetype: true,
      // description: ['', Validators.required]
      // type: ['mModel'],
      // selectModel: [''],
      // models: this._fb.array([this._fb.control([])])
      // singleModelArray: new FormArray([this.createSingleModel()])
    });

    if (!this.dataService.selectedTypeId) {
      // TODO: uncomment this line
      // this.router.navigate(['/configuration/asset-configuration']).then();
    }

    this.facade.assetType$.subscribe((response) => {
      response.map((obj) => {
        obj.makes.map((make) => {
          if (make.id === this.dataService.selectedMakeId) {
            this.assetType = obj;
            if (this.assetType.type === 'ASSET') {
              this.inputForm.patchValue({ typeCategory: 'asset' });
            } else if (this.assetType.type === 'SUB_ASSET') {
              this.inputForm.patchValue({ typeCategory: 'subAsset' });
            } else if (this.assetType.type === 'ACCESSORY') {
              this.inputForm.patchValue({ typeCategory: 'accessory' });
            }
          }

          this.models.clear();
          console.log(make.models);
          for (let index = 0; index < make.models.length; index++) {
            this.addModel();
            console.log(make.models[index].model);
            this.models.controls[index].setValue({
              model: make.models[index].model,
              modelDescription: make.models[index].modelDescription,
              trims: make.models[index].trims
            });
          }
          this.addModel();
        });
      });
    });

    this.facade.submitted$.subscribe((x) => {
      console.log('Submit : ', x);
      if (x) {
        this.dialogModal = true;
        this.dialogSetting.header = 'Add new type';
        this.dialogSetting.message = 'Make Added Successfully';
        this.dialogSetting.isWarning = false;
        this.dialogSetting.hasError = false;
        this.dialogSetting.confirmButton = 'OK';
        this.dialogSetting.cancelButton = undefined;
        this.changeDetectorRef.markForCheck();
      }
    });

    this.facade.error$.subscribe((x) => {
      if (x?.error) {
        console.log(x?.error);
        this.dialogModal = true;
        this.dialogSetting.header = 'Add new make';
        this.dialogSetting.hasError = true;
        this.dialogSetting.message = 'Error occurred in progress';
        this.dialogSetting.cancelButton = undefined;
        this.dialogSetting.confirmButton = 'OK';
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  createModel(isOptional?: boolean): FormGroup {
    if (isOptional) {
      return this._fb.group({
        model: '',
        modelDescription: '',
        trims: []
      });
    }
    return this._fb.group({
      model: '',
      modelDescription: '',
      trims: []
    });
  }

  addModel(): void {
    if (this.models.invalid) {
      return;
    }
    this.models.push(this.createModel());
  }

  addOptionalModel(): void {
    if (this.models.invalid) {
      return;
    }
    this.models.push(this.createModel());
  }

  removeModel(index: number): void {
    this.models.removeAt(index);
  }

  ngAfterViewInit() {
    // this.percent = (+this.value * 100) / +this.maxValue;
    // this._renderer.setStyle(
    //   this.progressBar.nativeElement,
    //   'width',
    //   `${this.percent}%`
    // );
    // this._renderer.setStyle(
    //   this.progressBar.nativeElement,
    //   'background-color',
    //   `${this.color}`
    // );
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.filesUpdloaded = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          console.log(droppedFile.relativePath, file);
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  // public addModel() {
  //   const model = new FormControl('');
  //   (<FormArray>this.inputForm.get('models')).push(model);
  //   console.log();
  // }

  public cancel() {
    this.dialogModal = true;
    this.dialogSetting.hasError = false;
    this.dialogSetting.isWarning = true;
    this.dialogSetting.message = 'Are you sure to cancel adding new type?';
    this.dialogSetting.confirmButton = 'Yes';
    this.dialogSetting.cancelButton = 'No';
    // this._assetConfigurationService.loadAddForm(false);
  }

  dialogConfirm($event): void {
    console.log($event);
    this.dialogModal = false;
    if ($event && !this.dialogSetting.hasError) {
      this.router.navigate(['/configuration/asset-configuration']).then();
    }
  }

  color1Clicked(): void {
    console.log('color1 clicked');
  }

  color2Clicked(): void {
    console.log('color2 clicked');
  }

  color3Clicked(): void {
    console.log('color3 clicked');
  }

  color4Clicked(): void {
    console.log('color4 clicked');
  }

  submit() {
    this.submited = true;
    if (this.inputForm.invalid) {
      return;
    }

    let type: string;

    switch (this.inputForm.value.typeCategory) {
      case 'asset':
        type = 'ASSET';
        break;
      case 'subAsset':
        type = 'SUB_ASSET';
        break;
      case 'accessory':
        type = 'ACCESSORY';
        break;
      default:
        type = 'ASSET';
    }

    /*
    {
  "type": "SUB_ASSET",
  "name": "Emergency",
  "isActive": true,
  "typeDescription": "4-wheel vehicles!",
  "makes": [
    {
      "make": "Toyota",
      "makeDescription": "New model of 2020.",
      "origins": [
        "Japan"
      ],
      "models": [
      ]
    }
  ]
}
    */

    const data = {
      type: type,
      name: this.assetType.name,
      isActive: this.assetType.isActive,
      typeDescription: this.assetType.typeDescription,
      makes: this.assetType.makes
    };

    console.log(data);

    // this.facade.addModel(data);
    // this._assetConfigurationService.loadAddForm(false);
  }
}

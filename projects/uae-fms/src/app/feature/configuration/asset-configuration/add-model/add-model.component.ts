import {
  AfterViewInit,
  Component,
  ElementRef,
  Injector, OnDestroy,
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
import { IAssetType, Make, MakeModel } from '@models/asset-type.model';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { AssetConfigurationService } from '@feature/configuration/asset-configuration/asset-configuration.service';
import { AssetTypeFacade } from '@feature/configuration/+state/asset-configuration';
import { DataService } from '@feature/configuration/asset-configuration/data.service';
import { Utility } from '@shared/utility/utility';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'anms-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.scss']
})
export class AddModelComponent
  extends Utility
  implements OnInit, AfterViewInit, OnDestroy {
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

  assetTypeSubs$: Subscription;

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

  assetTypeId;
  makeId;
  constructor(
    private _fb: FormBuilder,
    private _renderer: Renderer2,
    private _assetConfigurationService: AssetConfigurationService,
    private facade: AssetTypeFacade,
    public dataService: DataService,
    public router: Router,
    injector: Injector
  ) {
    super(injector);
    this.assetConfigurationTableSetting = this._assetConfigurationService.assetConfigurationableSetting();
  }

  ngOnInit(): void {

    this.inputForm = this._fb.group({
      typeCategory: ['asset', Validators.required],
      models: new FormArray([this.createModel()])
    });

    this.route.params.subscribe((x) => {
      if (x && x.assetType) this.assetTypeId = x.assetType;
      if (x && x.make) this.makeId = x.make;
      this.assetTypeSubs$ = this.facade.assetType$.subscribe((response) => {
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

              this.models.clear();
              for (let index = 0; index < make.models.length; index++) {
                this.addModel();
                this.models.controls[index].setValue({
                  id: make.models[index].id,
                  model: make.models[index].model,
                  modelDescription: make.models[index].modelDescription,
                  trims: make.models[index].trims
                });
              }
              this.addModel();
            }
          });
        });
      });
    });


    if (!this.dataService.selectedMakeId) {
      this.router
        .navigate(['/configuration/asset-configuration'])
        .then((_) => this.facade.resetParams());
    }


    this.facade.submitted$.subscribe((x) => {
      if (x) {
        this.dialogModal = true;
        this.dialogSetting.header = 'Add new type';
        this.dialogSetting.message = 'Make Added Successfully';
        this.dialogSetting.isWarning = false;
        this.dialogSetting.hasError = false;
        this.dialogSetting.confirmButton = 'OK';
        this.dialogSetting.cancelButton = undefined;
      }
    });

    this.facade.error$.subscribe((x) => {
      if (x?.error) {
        this.dialogModal = true;
        this.dialogSetting.header = 'Add new make';
        this.dialogSetting.hasError = true;
        this.dialogSetting.message = 'Error occurred in progress';
        this.dialogSetting.cancelButton = undefined;
        this.dialogSetting.confirmButton = 'OK';
      }
    });
  }

  createModel(isOptional?: boolean): FormGroup {
    if (isOptional) {
      return this._fb.group({
        id: [],
        model: ['', [Validators.required]],
        modelDescription: ['', [Validators.required]],
        trims: [[]]
      });
    }
    return this._fb.group({
      id: '',
      model: ['', Validators.compose([Validators.required])],
      modelDescription: ['', Validators.compose([Validators.required])],
      trims: [[]]
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
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.filesUpdloaded = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => { });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }

  public fileOver(event) { }

  public fileLeave(event) {
    event;
  }

  public cancel() {
    this.dialogModal = true;
    this.dialogSetting.hasError = false;
    this.dialogSetting.isWarning = true;
    this.dialogSetting.message = 'Are you sure to cancel adding new type?';
    this.dialogSetting.confirmButton = 'Yes';
    this.dialogSetting.cancelButton = 'No';
  }

  dialogConfirm($event): void {
    this.dialogModal = false;
    if ($event && !this.dialogSetting.hasError) {
      this.router
        .navigate(['/configuration/asset-configuration'])
        .then((_) => this.facade.resetParams());
    }
  }

  color1Clicked(): void {
    // console.log('color1 clicked');
  }

  color2Clicked(): void {
    // console.log('color2 clicked');
  }

  color3Clicked(): void {
    // console.log('color3 clicked');
  }

  color4Clicked(): void {
    // console.log('color4 clicked');
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

    const models = this.inputForm.value.models

    let data = models.map((x) => {
      if (x.id) {
        return {
          id: x.id,
          model: x.model,
          modelDescription: x.modelDescription,
        }
      }
      else
        return {
          model: x.model,
          modelDescription: x.modelDescription,
        }
    });

    this.facade.addModel(data, this.assetTypeId, this.makeId);
    // this._assetConfigurationService.loadAddForm(false);
  }

  ngOnDestroy(): void {
    this.assetTypeSubs$.unsubscribe();
  }

}

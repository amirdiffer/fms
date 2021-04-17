import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { IAssetType, Make } from '@models/asset-type.model';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { AssetConfigurationService } from '@feature/configuration/asset-configuration/asset-configuration.service';
import { AssetTypeFacade } from '@feature/configuration/+state/asset-configuration';
import { DataService } from '@feature/configuration/asset-configuration/data.service';
import { Utility } from '@shared/utility/utility';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'anms-add-trim',
  templateUrl: './add-trim.component.html',
  styleUrls: ['./add-trim.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTrimComponent extends Utility implements OnInit, OnDestroy {
  radioButtonSelect: 'mModel';
  public filesUpdloaded: NgxFileDropEntry[] = [];
  inputForm: FormGroup;
  @ViewChild('progressBar', { static: false }) progressBar: ElementRef;
  @ViewChild('small', { static: false }) small: ElementRef;
  color = '#0000005E';
  color1 = '#0000005E';
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
    header: 'Add Trim',
    hasError: false,
    message: 'Message is Here',
    confirmButton: 'Register Now',
    cancelButton: 'Cancel'
  };

  get trims(): FormArray {
    return this.inputForm.get('trims') as FormArray;
  }
  assetTypeId;
  makeId;
  modelId;

  constructor(
    private _fb: FormBuilder,
    private _renderer: Renderer2,
    private _assetConfigurationService: AssetConfigurationService,
    private facade: AssetTypeFacade,
    private changeDetectorRef: ChangeDetectorRef,
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
      trims: new FormArray([this.createTrim()])
    });

    this.route.params.subscribe((x) => {
      if (x && x.assetType) this.assetTypeId = x.assetType;
      if (x && x.make) this.makeId = x.make;
      if (x && x.model) this.modelId = x.model;
      this.assetTypeSubs$ = this.facade.assetType$
        .pipe(
          map((response) =>
            response.map((obj) => {
              obj.makes.map((make) => {
                make.models.map((model) => {
                  if (model.id === this.dataService.selectedModelId) {
                    this.assetType = obj;

                    if (obj.type === 'ASSET') {
                      this.inputForm.patchValue({ typeCategory: 'asset' });
                    } else if (this.assetType.type === 'SUB_ASSET') {
                      this.inputForm.patchValue({ typeCategory: 'subAsset' });
                    } else if (this.assetType.type === 'ACCESSORY') {
                      this.inputForm.patchValue({ typeCategory: 'accessory' });
                    }

                    this.trims.clear();
                    for (let index = 0; index < model.trims.length; index++) {
                      this.addTrim();
                      this.trims.controls[index].patchValue({
                        id: model.trims[index].id,
                        trim: model.trims[index].trim,
                        description: 'Something about the trim.',
                        colors: model.trims[index].colors
                      });
                    }
                    this.addTrim();
                  }
                });
              });
            })
          )
        )
        .subscribe();
    });


    if (!this.dataService.selectedModelId) {
      this.router.navigate(['/configuration/asset-configuration']).then((_) => {
        this.facade.resetParams();
      });
    }

    this.facade.submitted$.subscribe((x) => {
      if (x) {
        this.dialogModal = true;
        this.dialogSetting.header = 'Add new trim';
        this.dialogSetting.message = 'Trim Added Successfully';
        this.dialogSetting.isWarning = false;
        this.dialogSetting.hasError = false;
        this.dialogSetting.confirmButton = 'OK';
        this.dialogSetting.cancelButton = undefined;
        this.changeDetectorRef.markForCheck();
      }
    });

    this.facade.error$.subscribe((x) => {
      if (x?.error) {
        this.dialogModal = true;
        this.dialogSetting.header = 'Add new trim';
        this.dialogSetting.hasError = true;
        this.dialogSetting.message = 'Error occurred in progress';
        this.dialogSetting.cancelButton = undefined;
        this.dialogSetting.confirmButton = 'OK';
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  colors(index: number): FormArray {
    const trims = this.inputForm.get('trims') as FormArray;
    return trims.controls[index].get('colors') as FormArray;
  }

  createTrim(isOptional?: boolean): FormGroup {
    if (isOptional) {
      return this._fb.group({
        id: '',
        trim: '',
        description: 'Something about the trim.',
        colors: new FormArray([this.createColor()])
      });
    }
    return this._fb.group({
      id: '',
      trim: ['', Validators.required],
      description: 'Something about the trim.',
      colors: new FormArray([this.createColor()])
    });
  }

  createColor(): FormGroup {
    return this._fb.group({
      name: 'FFFFFF',
      hexColor: 'FFFFFF'
    });
  }

  addColor(index: number): void {
    this.colors(index).push(this.createColor());
  }

  removeColor(index: number): void {
    this.colors(index).removeAt(this.colors(index).length - 1);
  }

  addTrim(): void {
    if (this.trims.invalid) return;
    this.trims.push(this.createTrim());
  }

  addOptionalMake(): void {
    if (this.trims.invalid) {
      return;
    }
    this.trims.push(this.createTrim());
  }

  removeTrim(index: number): void {
    this.trims.removeAt(index);
  }

  uploadAssetPicture(evt, index: number): void {
    if (!evt || !evt.files) {
      return;
    }
    const docId = evt.files[0];
    const docControl = this.trims.at(index).get('file');
    docControl.setValue(docId);
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

  public fileOver(event) {
    // console.log(event);
  }

  public fileLeave(event) {
    // console.log(event);
  }

  cancel() {
    this.dialogModal = true;
    this.dialogSetting.hasError = false;
    this.dialogSetting.isWarning = true;
    this.dialogSetting.message = 'Are you sure to cancel adding new type?';
    this.dialogSetting.confirmButton = 'Yes';
    this.dialogSetting.cancelButton = 'No';
    // this._assetConfigurationService.loadAddForm(false);
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

  selectedColor(event, color): void {
    color.value.name = event;
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

    const makes: Make[] = [];


    const data = this.inputForm.value.trims.map(x => {
      if (x.id) {
        return x;
      } else
        return {
          colors: x.colors,
          description: x.description,
          trim: x.trim,
        }
    })

    this.facade.addTrim(data, this.assetTypeId, this.makeId, this.modelId);
  }

  ngOnDestroy(): void {
    this.assetTypeSubs$.unsubscribe();
  }

}

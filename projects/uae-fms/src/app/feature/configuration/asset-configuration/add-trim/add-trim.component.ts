import {
  Component,
  ElementRef,
  Injector,
  OnDestroy,
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
import { AssetTypeFacade } from '@feature/configuration/+state/fleet-configuration/index';
import { DataService } from '@feature/configuration/asset-configuration/data.service';
import { Utility } from '@shared/utility/utility';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'anms-add-trim',
  templateUrl: './add-trim.component.html',
  styleUrls: ['./add-trim.component.scss']
})
export class AddTrimComponent extends Utility implements OnInit, OnDestroy {

  //#region ViewChild
  @ViewChild('progressBar', { static: false }) progressBar: ElementRef;
  @ViewChild('small', { static: false }) small: ElementRef;
  //#endregion

  //#region Variable
  radioButtonSelect: 'mModel';
  public filesUpdloaded: NgxFileDropEntry[] = [];
  inputForm: FormGroup;
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
  isEditing = false
  //#endregion

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
      typeCategory: ['asset', this.router.isActive('/configuration/add-asset-configuration/', true) ? Validators.required : []],
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

              if (x?.assetTypeId) {
                this.isEditing = true
                this.assetTypeId = Number(x?.assetTypeId)
                if (x?.id) {
                  this.makeId = Number(x?.makeId)
                  this.modelId = Number(x?.id)
                  if (this.assetTypeId === obj.id) {
                    for (let index = 0; index < obj.makes.length; index++) {
                      if (obj.makes[index].id === this.makeId) {
                        this.dataService.selectedMakeName = obj.makes[index].name
                        for (let j = 0; j < obj.makes[index].models.length; j++) {
                          if (obj.makes[index].models[j].id === this.modelId) {
                            this.dataService.selectedModelName = obj.makes[index].models[j].name
                            for (let k = 0; k < obj.makes[index].models[j].trims.length; k++) {
                              if (k > 0) {
                                this.addTrim()
                              }
                              this.trims.controls[k].patchValue({
                                id: obj.makes[index].models[j].trims[k].id,
                                trim: obj.makes[index].models[j].trims[k].name,
                                colors: obj.makes[index].models[j].trims[k].colors,
                                description: obj.makes[index].models[j].trims[k].description,
                                origins: obj.makes[index].models[j].trims[k].origins
                              });
                              for (let l = 0; l < obj.makes[index].models[j].trims[k].colors.length; l++) {
                                if (l > 0) {
                                  this.addColor(k)
                                }
                                this.colors(k).controls[l].patchValue({
                                  id: obj.makes[index].models[j].trims[k].colors[l].id,
                                  name: obj.makes[index].models[j].trims[k].colors[l].name,
                                  hexColor: obj.makes[index].models[j].trims[k].colors[l].hexColor,
                                })
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
                return
              }

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
                        trim: model.trims[index].name,
                        description: 'Something about the trim.',
                        colors: model.trims[index].colors
                      });
                      for (let j = 0; j < model.trims[index].colors.length; j++) {
                        this.addColor(index)
                        this.colors(index).controls[j].patchValue({
                          id: model.trims[index].colors[j].id,
                          name: model.trims[index].colors[j].name,
                          hexColor: model.trims[index].colors[j].hexColor,
                        })
                      }
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

    this.facade.submitted$.subscribe((x) => {
      if (x) {
        if (this.isEditing) {
          this.dialogModal = true;
          this.dialogSetting.header = 'Edit Trim';
          this.dialogSetting.message = 'Trim Edited Successfully';
          this.dialogSetting.isWarning = false;
          this.dialogSetting.hasError = false;
          this.dialogSetting.confirmButton = 'OK';
          this.dialogSetting.cancelButton = undefined;
          return
        }
        this.dialogModal = true;
        this.dialogSetting.header = 'Add new trim';
        this.dialogSetting.message = 'Trim Added Successfully';
        this.dialogSetting.isWarning = false;
        this.dialogSetting.hasError = false;
        this.dialogSetting.confirmButton = 'OK';
        this.dialogSetting.cancelButton = undefined;
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
      colors: new FormArray([this.createColor()]),
      origins: []
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

    if (this.isEditing) {
      const payload = {
        trims: []
      }
      for (const trim of this.inputForm.value.trims) {
        payload.trims.push(
          {
            id: trim.id,
            name: trim.trim,
            description: trim.description,
            origins: trim.origins,
            colors: trim.colors
          }
        )
      }

      this.facade.updateTrim(payload, this.assetTypeId, this.makeId, this.modelId)
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

    const data = {
      trims:this.inputForm.value.trims.map((x) => {
        if (x.id) {
          return {
            id: x.id,
            name:x.trim,
            description: x.description,
            meterType: "KILOMETER",
            meterValue: 10,
            origins: [
              "Germany"
            ],
            colors: x.colors.map(
               y => {
                return {
                  name : y.name,
                  hexColor: y.hexColor
                }
              }
            )
          }
        } else {
          return {
              name:x.trim,
              description: x.description,
              meterType: "KILOMETER",
              meterValue: 10,
              origins: [
                "Germany"
              ],
              colors: x.colors.map(
                 y => {
                  return {
                    name : y.name,
                    hexColor: y.hexColor
                  }
                }
              )
          }
        }

      })
    }

    this.facade.addTrim(data, this.assetTypeId, this.makeId, this.modelId);
  }

  ngOnDestroy(): void {
    this.assetTypeSubs$.unsubscribe();
  }
}

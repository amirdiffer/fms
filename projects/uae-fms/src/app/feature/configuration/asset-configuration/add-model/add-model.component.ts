import {
  AfterViewInit,
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
import { IAssetType, Make, MakeModel } from '@models/asset-type.model';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { AssetConfigurationService } from '@feature/configuration/asset-configuration/asset-configuration.service';
import { AssetTypeFacade, SubAssetTypeFacade } from '@feature/configuration/+state/fleet-configuration/index';
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

  //#region ViewChild
  @ViewChild('progressBar', { static: false }) progressBar: ElementRef;
  @ViewChild('small', { static: false }) small: ElementRef;
  //#endregion

  //#region Variable
  radioButtonSelect: 'mModel';
  public filesUpdloaded: NgxFileDropEntry[] = [];
  inputForm: FormGroup;
  color = '#0000005E';
  maxValue = 100;
  value = 80;
  percent = 80;
  fileName = 'CSV File only';
  submited = false;
  selectedType;
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
  isEditing = false
  assetTypeMode = '';
  assetTypeId;
  makeId;
  //#endregion

  get models(): FormArray {
    return this.inputForm.get('models') as FormArray;
  }

  constructor(
    private _fb: FormBuilder,
    private _renderer: Renderer2,
    private _assetConfigurationService: AssetConfigurationService,
    private facade: AssetTypeFacade,
    private _subAssetTypeFacade : SubAssetTypeFacade,
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
    this.dataService.watchType().subscribe(
      (x) => {this.selectedType = x}
    )
    this.errorAndSubmitHandler(this.facade);
    this.errorAndSubmitHandler(this._subAssetTypeFacade);

    this.route.url.subscribe((url) => {
      this.models.clear()
      /* HERE WE HANDLE ASSET TYPE : SUB_ASSET */
      if (url[1].path.includes('sub-asset-edit-model')) {
        this.assetTypeMode = 'SUB_ASSET'
        this.route.params.subscribe((x) => {
          if (x && x.assetType) this.assetTypeId = x.assetType;
          if (x && x.make) this.makeId = x.make;
          this.assetTypeSubs$ = this._subAssetTypeFacade.subAssetType$.subscribe((response) => {
            response.map((obj) => {

              if (x?.assetTypeId) {
                this.isEditing = true
                this.assetTypeId = Number(x?.assetTypeId)
                if (x?.id) {
                  this.makeId = Number(x?.id)
                  if (this.assetTypeId === obj.id) {
                    for (let index = 0; index < obj.makes.length; index++) {
                      if (obj.makes[index].id === this.makeId) {
                        this.dataService.selectedMakeName = obj.makes[index].name
                        for (let j = 0; j < obj.makes[index].models.length; j++) {
                          this.addModel()
                          this.models.controls[j].patchValue({
                            id: obj.makes[index].models[j].id,
                            model: obj.makes[index].models[j].name,
                            modelDescription: obj.makes[index].models[j].description,
                          });
                        }
                      }
                    }
                  }
                }
                return
              }

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
                      model: make.models[index].name,
                      modelDescription: make.models[index].description,
                      trims: make.models[index].trims
                    });
                  }
                  this.addModel();
                }
              });
            });
          });
        });
      }
      /* HERE WE HANDLE ASSET TYPE : ASSET */
      else {
        this.assetTypeMode = 'ASSET'
        this.route.params.subscribe((x) => {
          if (x && x.assetType) this.assetTypeId = x.assetType;
          if (x && x.make) this.makeId = x.make;
          this.assetTypeSubs$ = this.facade.assetType$.subscribe((response) => {
            response.map((obj) => {

              if (x?.assetTypeId) {
                this.isEditing = true
                this.assetTypeId = Number(x?.assetTypeId)
                if (x?.id) {
                  this.makeId = Number(x?.id)
                  if (this.assetTypeId === obj.id) {
                    for (let index = 0; index < obj.makes.length; index++) {
                      if (obj.makes[index].id === this.makeId) {
                        this.dataService.selectedMakeName = obj.makes[index].name
                        for (let j = 0; j < obj.makes[index].models.length; j++) {
                          if (j > 0) {
                            this.addModel()
                          }
                          this.models.controls[j].patchValue({
                            id: obj.makes[index].models[j].id,
                            model: obj.makes[index].models[j].name,
                            modelDescription: obj.makes[index].models[j].description,
                          });
                        }
                      }
                    }
                  }
                }
                return
              }

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
                      model: make.models[index].name,
                      modelDescription: make.models[index].description,
                      trims: make.models[index].trims
                    });
                  }
                  this.addModel();
                }
              });
            });
          });
        });
      }
    })
  }

  createModel(isOptional?: boolean): FormGroup {
    if (isOptional) {
      return this._fb.group({
        id: [''],
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

  ngAfterViewInit() {}

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

  public fileOver(event) {}

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

    if (this.isEditing) {
      const payload = {
        models: []
      }
      if (this.assetTypeMode === 'SUB_ASSET') {
        for (const make of this.inputForm.value.models) {
          payload.models.push({
            id: make.id,
            name: make.model,
            description: make.modelDescription,
            origins: [ 'Japan' ]
            })
        }
        this._subAssetTypeFacade.updateModel(payload, this.assetTypeId, this.makeId)
      } else {
        for (const make of this.inputForm.value.models) {
          payload.models.push(
            {
              id: make.id,
              name: make.model,
              description: make.modelDescription
            }
          )
        }
        this.facade.updateModel(payload, this.assetTypeId, this.makeId)
      }
      return
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

    const models = this.inputForm.value.models;

    let data = {
      models:models.map((x) => {
        if (x.id) {
          if(this.selectedType == "SUB_ASSET"){
            return {
              id: x.id,
              name: x.model,
              description: x.modelDescription,
              origins: ["Japan"]
            }
          }else{
            return {
              id: x.id,
              name: x.model,
              description: x.modelDescription
            }
          }
        } else {
          if(this.selectedType == "SUB_ASSET"){
            return {
              origins: ["Japan"],
              name: x.model,
              description: x.modelDescription
            };
          }else{
            return{
              name: x.model,
              description: x.modelDescription
            }
          }
        }

      })
    };
    switch (this.selectedType) {
      case 'ASSET':
        this.facade.addModel(data, this.assetTypeId, this.makeId);
        break;
      case 'SUB_ASSET':
        this._subAssetTypeFacade.addModel(data, this.assetTypeId , this.makeId)
        break;
      default:
        break;
    }


    // this._assetConfigurationService.loadAddForm(false);
  }
  errorAndSubmitHandler(facade){
    facade.submitted$.subscribe((x) => {
      if (x) {
        if (this.isEditing) {
          this.dialogModal = true;
          this.dialogSetting.header = 'Edit Model';
          this.dialogSetting.message = 'Model Edited Successfully';
          this.dialogSetting.isWarning = false;
          this.dialogSetting.hasError = false;
          this.dialogSetting.confirmButton = 'OK';
          this.dialogSetting.cancelButton = undefined;
          return
        }
        this.dialogModal = true;
        this.dialogSetting.header = 'Add new type';
        this.dialogSetting.message = 'Make Added Successfully';
        this.dialogSetting.isWarning = false;
        this.dialogSetting.hasError = false;
        this.dialogSetting.confirmButton = 'OK';
        this.dialogSetting.cancelButton = undefined;
      }
    });

    facade.error$.subscribe((x) => {
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
  ngOnDestroy(): void {
    this.assetTypeSubs$?.unsubscribe();
    this._subAssetTypeFacade.resetParams();
    this.facade.resetParams();
  }
}

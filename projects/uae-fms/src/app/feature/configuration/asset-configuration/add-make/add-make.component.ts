import {
  AfterViewInit,
  ChangeDetectorRef,
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
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { TableSetting } from '@core/table';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { AssetConfigurationService } from '@feature/configuration/asset-configuration/asset-configuration.service';
import {
  AccessoryTypeFacade,
  AssetTypeFacade,
  SubAssetTypeFacade
} from '@feature/configuration/+state/fleet-configuration/index';
import { Utility } from '@shared/utility/utility';
import { DataService } from '@feature/configuration/asset-configuration/data.service';
import { IAssetType } from '@models/asset-type.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'anms-add-make',
  templateUrl: './add-make.component.html',
  styleUrls: ['./add-make.component.scss']
})
export class AddMakeComponent
  extends Utility
  implements OnInit, AfterViewInit, OnDestroy {
  //#region ViewChild
  @ViewChild('progressBar', { static: false }) progressBar: ElementRef;
  @ViewChild('small', { static: false }) small: ElementRef;
  //#endregion

  //#region Varibale
  radioButtonSelect: 'mModel';
  public filesUpdloaded: NgxFileDropEntry[] = [];
  inputForm: FormGroup;
  color = '#0000005E';
  maxValue = 100;
  value = 80;
  percent = 80;
  fileName = 'CSV File only';
  submited = false;
  isEditing = false;
  assetTypeMode = '';
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
  assetTypeId;
  makeId;
  assets;
  selectedType;
  //#endregion

  get makes(): FormArray {
    return this.inputForm.get('makes') as FormArray;
  }

  constructor(
    private _fb: FormBuilder,
    private _renderer: Renderer2,
    private _assetConfigurationService: AssetConfigurationService,
    private _subAssetTypeFacade: SubAssetTypeFacade,
    private accessoryTypeFacade: AccessoryTypeFacade,
    private facade: AssetTypeFacade,
    public dataService: DataService,
    injector: Injector,
    public route: ActivatedRoute,
    public router: Router
  ) {
    super(injector);
    this.assetConfigurationTableSetting = this._assetConfigurationService.assetConfigurationableSetting();
  }

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      typeCategory: ['asset', Validators.required],
      makes: new FormArray([this.createMake()])
    });
    this.dataService.watchType().subscribe((x) => {
      this.selectedType = x;
    });
    this.errorAndSubmitHandler(this.facade);
    this.errorAndSubmitHandler(this._subAssetTypeFacade);

    this.route.url.subscribe((url) => {
      /* HERE WE HANDLE ASSET TYPE : SUB_ASSET */
      if (this.selectedType == 'SUB_ASSET' || url[1].path.includes('sub-asset-edit-make')) {
        this.assetTypeMode = 'SUB_ASSET';

        this.route.params.subscribe((x) => {
          if (x && x.assetType) this.assetTypeId = x.assetType;
          this.assetTypeSubs$ = this._subAssetTypeFacade.subAssetType$.subscribe(
            (response) => {
              this.makes.clear();
              this.addMake();
              response.map((obj) => {
                if (x?.id) {
                  this.isEditing = true;
                  this.assetTypeId = Number(x?.assetTypeId);
                  this.makeId = Number(x?.id);
                  if (this.assetTypeId === obj.id) {
                    this.dataService.selectedTypeName = obj.name;
                    for (let index = 0; index < obj.makes.length; index++) {
                      if (obj.makes[index].id === this.makeId) {
                        this.makes.controls[0].patchValue({
                          id: obj.makes[index].id,
                          make: obj.makes[index].name,
                          makeDescription: obj.makes[index].description
                        });
                      }
                    }
                  }
                  return;
                }

                if (obj.id === this.dataService.selectedTypeId) {
                  this.assetType = obj;

                  if (this.assetType.type === 'ASSET') {
                    this.inputForm.patchValue({ typeCategory: 'asset' });
                  } else if (this.assetType.type === 'SUB_ASSET') {
                    this.inputForm.patchValue({ typeCategory: 'subAsset' });
                  } else if (this.assetType.type === 'ACCESSORY') {
                    this.inputForm.patchValue({ typeCategory: 'accessory' });
                  }

                  this.makes.clear();
                  for (let index = 0; index < obj.makes.length; index++) {
                    this.addMake();
                    this.makes.controls[index].patchValue({
                      id: obj.makes[index].id,
                      make: obj.makes[index].name,
                      makeDescription: obj.makes[index].description,
                      models: obj.makes[index].models,
                      // @ts-ignore
                      origins: obj.makes[index].origins
                    });
                  }
                  this.addMake();
                }
              });
            }
          );
        });
        return;
      } else if (this.selectedType == 'ACCESSORY' || url[1].path.includes('accessory-edit-make')) {
      /* HERE WE HANDLE ASSET TYPE : ACCESSORY */
        this.assetTypeMode = 'ACCESSORY';

        this.route.params.subscribe((x) => {
          if (x && x.assetType) this.assetTypeId = x.assetType;
          this.assetTypeSubs$ = this.accessoryTypeFacade.accessoryType$.subscribe(
            (response) => {
              this.makes.clear();
              this.addMake();
              response.map((obj) => {
                if (x?.id) {
                  this.isEditing = true;
                  this.assetTypeId = Number(x?.id);
                  if (this.assetTypeId === obj.id) {
                    this.dataService.selectedTypeName = obj.name;
                    for (let index = 0; index < obj.makes.length; index++) {
                      if (index > 0) {
                        this.addMake();
                      }
                      this.makes.controls[index].patchValue({
                        id: obj.makes[index].id,
                        make: obj.makes[index].name,
                        makeDescription: obj.makes[index].description
                      });
                    }
                  }
                  return;
                }

                if (obj.id === this.dataService.selectedTypeId) {
                  this.assetType = obj;

                  if (this.assetType.type === 'ASSET') {
                    this.inputForm.patchValue({ typeCategory: 'asset' });
                  } else if (this.assetType.type === 'SUB_ASSET') {
                    this.inputForm.patchValue({ typeCategory: 'subAsset' });
                  } else if (this.assetType.type === 'ACCESSORY') {
                    this.inputForm.patchValue({ typeCategory: 'accessory' });
                  }

                  this.makes.clear();
                  for (let index = 0; index < obj.makes.length; index++) {
                    this.addMake();
                    this.makes.controls[index].patchValue({
                      id: obj.makes[index].id,
                      make: obj.makes[index].name,
                      makeDescription: obj.makes[index].description,
                      models: obj.makes[index].models,
                      // @ts-ignore
                      origins: obj.makes[index].origins
                    });
                  }
                  this.addMake();
                }
              });
            }
          );
        });
        return;
      } else {
      /* HERE WE HANDLE ASSET TYPE : ASSET */
        this.assetTypeMode = 'ASSET';
        this.route.params.subscribe((x) => {
          if (x && x.assetType) this.assetTypeId = x.assetType;
          this.assetTypeSubs$ = this.facade.assetType$.subscribe((response) => {
            this.makes.clear();
            this.addMake();
            response.map((obj) => {
              if (x?.id) {
                this.isEditing = true;
                this.assetTypeId = Number(x?.assetTypeId);
                this.makeId = Number(x?.id);
                if (this.assetTypeId === obj.id) {
                  this.dataService.selectedTypeName = obj.name;
                  for (let index = 0; index < obj.makes.length; index++) {
                    if (obj.makes[index].id === this.makeId) {
                      this.makes.controls[0].patchValue({
                        id: obj.makes[index].id,
                        make: obj.makes[index].name,
                        makeDescription: obj.makes[index].description
                      });
                    }
                  }
                }
                return;
              }

              if (obj.id === this.dataService.selectedTypeId) {
                this.assetType = obj;
                if (this.assetType.type === 'ASSET') {
                  this.inputForm.patchValue({ typeCategory: 'asset' });
                } else if (this.assetType.type === 'SUB_ASSET') {
                  this.inputForm.patchValue({ typeCategory: 'subAsset' });
                } else if (this.assetType.type === 'ACCESSORY') {
                  this.inputForm.patchValue({ typeCategory: 'accessory' });
                }
                this.makes.clear();
                for (let index = 0; index < obj.makes.length; index++) {
                  this.addMake();
                  this.makes.controls[index].patchValue({
                    id: obj.makes[index].id,
                    make: obj.makes[index].name,
                    makeDescription: obj.makes[index].description,
                    models: obj.makes[index].models,
                    // @ts-ignore
                    origins: obj.makes[index].origins
                  });
                }
                this.addMake();
              }
            });
          });
        });
      }
    });

    this.facade.assetType$.subscribe((x) => {
      this.assets = x;
    });
  }

  createMake(isOptional?: boolean): FormGroup {
    if (isOptional) {
      return this._fb.group({
        id: null,
        make: '',
        makeDescription: '',
        origins: [['USA']],
        models: [[]]
      });
    }
    return this._fb.group({
      id: [],
      make: ['', Validators.required],
      makeDescription: ['', Validators.required],
      origins: [['USA']],
      models: [[]]
    });
  }

  addMake(): void {
    if (this.makes.invalid) {
      return;
    }
    this.makes.push(this.createMake());
  }

  addOptionalMake(): void {
    if (this.makes.invalid) {
      return;
    }
    this.makes.push(this.createMake());
  }

  removeMake(index: number): void {
    this.makes.removeAt(index);
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
        droppedFile.relativePath, fileEntry;
      }
    }
  }

  public fileOver(event) {
    // console.log(event);
  }

  public fileLeave(event) {
    // console.log(event);
  }

  public addModel() {
    const model = new FormControl('');
    (<FormArray>this.inputForm.get('models')).push(model);
  }

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
  errorAndSubmitHandler(facade) {
    facade.submitted$.subscribe((x) => {
      if (x) {
        if (this.isEditing) {
          this.dialogModal = true;
          this.dialogSetting.header = 'Edit Make';
          this.dialogSetting.message = 'Make Edited Successfully';
          this.dialogSetting.isWarning = false;
          this.dialogSetting.hasError = false;
          this.dialogSetting.confirmButton = 'OK';
          this.dialogSetting.cancelButton = undefined;
          return;
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
        x?.error;
        this.dialogModal = true;
        this.dialogSetting.header = 'Add new make';
        this.dialogSetting.hasError = true;
        this.dialogSetting.message = 'Error occurred in progress';
        this.dialogSetting.cancelButton = undefined;
        this.dialogSetting.confirmButton = 'OK';
      }
    });
  }
  submit() {
    this.submited = true;
    if (this.inputForm.invalid) {
      return;
    }

    if (this.isEditing) {
      const payload = {
        makes: []
      };
      for (const make of this.inputForm.value.makes) {
        payload.makes.push({
          id: make.id,
          name: make.make,
          description: make.makeDescription
        });
      }

      if (this.assetTypeMode === 'SUB_ASSET') {
        this._subAssetTypeFacade.updateMake(payload, this.assetTypeId);
      } else {
        this.facade.updateMake(payload, this.assetTypeId);
      }
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
    const data = {
      makes: this.inputForm.value.makes.map((x) => {
        if (x.id)
          return {
            id: x.id,
            name: x.make,
            description: x.makeDescription
          };
        else {
          return {
            name: x.make,
            description: x.makeDescription
          };
        }
      })
    };
    for (let i = 0; i < data.makes.length; i++) {
      if (i === data.makes.length - 1) {
        const newData = data.makes[i];
        data.makes = [];
        data.makes.push(newData);
      }
    }
    switch (this.selectedType) {
      case 'ASSET':
        this.facade.addMake(data, this.assetTypeId);
        break;
      case 'SUB_ASSET':
        this._subAssetTypeFacade.addMake(data, this.assetTypeId);
        break;
      default:
        break;
    }
  }

  ngOnDestroy(): void {
    this.assetTypeSubs$.unsubscribe();
    this._subAssetTypeFacade.resetParams();
    this.facade.resetParams();
  }
}

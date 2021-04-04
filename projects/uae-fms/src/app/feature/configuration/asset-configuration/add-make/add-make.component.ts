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
import { AssetTypeFacade } from '@feature/configuration/+state/asset-configuration';
import { Utility } from '@shared/utility/utility';
import { DataService } from '@feature/configuration/asset-configuration/data.service';
import { IAssetType } from '@models/asset-type.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'anms-add-make',
  templateUrl: './add-make.component.html',
  styleUrls: ['./add-make.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddMakeComponent extends Utility implements OnInit, AfterViewInit {
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

  get makes(): FormArray {
    return this.inputForm.get('makes') as FormArray;
  }

  assetTypeId;
  assets;

  constructor(
    private _fb: FormBuilder,
    private _renderer: Renderer2,
    private _assetConfigurationService: AssetConfigurationService,
    private facade: AssetTypeFacade,
    private changeDetectorRef: ChangeDetectorRef,
    public dataService: DataService,
    injector: Injector,
    public route: ActivatedRoute
  ) {
    super(injector);
    this.assetConfigurationTableSetting = this._assetConfigurationService.assetConfigurationableSetting();
  }

  ngOnInit(): void {
    this.route.params.subscribe(x => {
      if (x && x.assetType)
        this.assetTypeId = x.assetType
    })

    this.facade.assetType$.subscribe(x => {
      this.assets = x;
    })

    this.inputForm = this._fb.group({
      typeCategory: ['asset', Validators.required],
      makes: new FormArray([this.createMake()])
      // typeName: ['', [Validators.required]],
      // activetype: true,
      // description: ['', Validators.required]
      // type: ['mModel'],
      // selectModel: [''],
      // models: this._fb.array([this._fb.control([])])
      // singleModelArray: new FormArray([this.createSingleModel()])
    });

    if (!this.dataService.selectedTypeId) {
      this.router.navigate(['/configuration/asset-configuration']).then(_ => {
        this.facade.resetParams()
      });
    }

    this.facade.assetType$.subscribe((response) => {
      response.map((obj) => {
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
              make: obj.makes[index].make,
              makeDescription: obj.makes[index].makeDescription,
              models: obj.makes[index].models,
              // @ts-ignore
              origins: obj.makes[index].origins
            });
          }
          this.addMake();
        }
      });
    });

    this.facade.submitted$.subscribe((x) => {
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
        (x?.error);
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

  ngAfterViewInit() {
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.filesUpdloaded = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        (droppedFile.relativePath, fileEntry);
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
      id: this.assetTypeId,
      type: type,
      name: this.assetType.name,
      isActive: this.assetType.isActive,
      typeDescription: this.assetType.typeDescription,
      makes: this.inputForm.value.makes.map(x => {
        if (x.id) return x;
        else {
          return {
            make: x.make,
            makeDescription: x.makeDescription,
            models: x.models,
            origins: x.origins,
          }
        }
      })
    };

    data.makes = data.makes.map(x => {
      if (x.models && x.models.length > 0) {
        return {
          ...x,
          models:
            x.models.map(y => {
              if (y.trims && y.trims.length > 0) {
                return {
                  ...y,
                  trims: y.trims.map(z => {
                    if (z.colors && z.colors.length > 0) {
                      return {
                        ...z,
                        colors: z.colors.map(v => {
                          return {
                            name: v.color,
                            hexColor: v.hexColor,
                            id: v.id
                          }
                        })
                      }
                    }
                    else
                      return z;
                  })
                }
              }
              else
                return y;
            })
        }
      }
      else
        return x;
    })
    this.facade.addMake(data);
    // this._assetConfigurationService.loadAddForm(false);
  }
}

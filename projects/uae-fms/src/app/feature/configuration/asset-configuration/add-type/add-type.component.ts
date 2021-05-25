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
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { AssetConfigurationService } from '../asset-configuration.service';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { AccessoryTypeFacade, AssetTypeFacade, SubAssetTypeFacade } from '../../+state/fleet-configuration/index';
import { ActivatedRoute, Router } from '@angular/router';
import { Utility } from '@shared/utility/utility';
import { TableSetting } from '@core/table';
import { DataService } from '@feature/configuration/asset-configuration/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'congifuration-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.scss']
})
export class AddTypeComponent extends Utility implements OnInit, AfterViewInit, OnDestroy {

  //#region ViewChild
  @ViewChild('progressBar', { static: false }) progressBar: ElementRef;
  @ViewChild('small', { static: false }) small: ElementRef;
  //#endregion

  //#region Variable
  radioButtonSelect: 'mModel';
  itemId;
  public filesUpdloaded: NgxFileDropEntry[] = [];
  inputForm: FormGroup;
  color = '#0000005E';
  maxValue = 100;
  value = 80;
  percent = 80;
  fileName = 'CSV File only';
  submited = false;
  type;
  isEdit: boolean = false;
  assetConfigurationTableSetting!: TableSetting;
  dialogModal = false;
  dialogSetting: IDialogAlert = {
    header: 'Add asset configuration',
    hasError: false,
    message: 'Message is Here',
    confirmButton: 'Register Now',
    cancelButton: 'Cancel'
  };
  assetTypes = [];
  //#endregion

  constructor(
    private _fb: FormBuilder,
    private _assetConfigurationService: AssetConfigurationService,
    private facade: AssetTypeFacade,
    private _subAssetTypeFacade: SubAssetTypeFacade,
    private _accessoryTypeFacade: AccessoryTypeFacade,
    public router: Router,
    private _activateRoute: ActivatedRoute,
    private _dataService: DataService,
    injector: Injector
  ) {
    super(injector);
    this.assetConfigurationTableSetting = this._assetConfigurationService.assetConfigurationableSetting();
  }

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      typeCategory: ['asset', Validators.required],
      typeName: ['', [Validators.required]],
      activetype: true,
      description: ['', Validators.required]
    });
    this._dataService.watchType().subscribe(
      (x) => {
        this.type = x
        this.inputForm.patchValue({
          typeCategory: x
        })
      }
    )

    this.facade.assetType$.subscribe((x) => {
      this.assetTypes = x;
    });

    const url = this._activateRoute.snapshot.url
    const hasEditPath = url.filter(x => x.path == 'edit-asset-configuration');
    if (hasEditPath.length > 0) {
      this.isEdit = true;
      this.itemId = +url[url.length - 1];
      switch (this.type) {
        case 'ASSET':
          this.facade.getAssetTypeByID(this.itemId)
          this.facade.specificAssetType$.subscribe(
            x => {
              if (x) {
                this.inputForm.patchValue({
                  typeName: x.name,
                  activetype: x.isActive,
                  description: x.description
                })
              }
            }
          )
          break;
        case 'SUB_ASSET':
          this._subAssetTypeFacade.getSubAssetTypeByID(this.itemId)
          this._subAssetTypeFacade.specificSubAssetType$.subscribe(
            x => {
              if (x) {
                this.inputForm.patchValue({
                  typeName: x.name,
                  activetype: x.isActive,
                  description: x.description
                })
              }
            }
          )
          break;
        case 'ACCESSORY':
          this._accessoryTypeFacade.getAccessoryTypeByID(this.itemId)
          this._accessoryTypeFacade.specificAccessoryType$.subscribe(
            x => {
              if (x) {
                this.inputForm.patchValue({
                  typeName: x.name,
                  activetype: x.isActive,
                  description: x.description
                })
              }
            }
          )
          break;
        default:
          break;
      }
    }
    this.errorAndSubmitHandle(this._accessoryTypeFacade);
    this.errorAndSubmitHandle(this._subAssetTypeFacade);
    this.errorAndSubmitHandle(this.facade);
  }

  get singleModelArray(): FormArray {
    return this.inputForm.get('singleModelArray') as FormArray;
  }

  createSingleModel(): FormGroup {
    return this._fb.group({
      model: [''],
      color1: ['#707070'],
      color2: ['#E0DB66'],
      color3: ['#475F7B'],
      color4: ['#D05E53']
    });
  }

  addSingleModel(): void {
    const list = this.inputForm.get('singleModelArray') as FormArray;
    list.push(this.createSingleModel());
  }

  ngAfterViewInit() { }

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

  }

  public fileLeave(event) {

  }

  public addModel() {
    const model = new FormControl('');
    (<FormArray>this.inputForm.get('models')).push(model);
  }

  dialogType = '';
  public cancel() {
    this.dialogModal = true;
    this.dialogSetting.hasError = false;
    this.dialogSetting.isWarning = true;
    this.dialogSetting.message = this.itemId ? 'Are you sure to cancel changes type?' : 'Are you sure to cancel adding new type?';
    this.dialogSetting.confirmButton = 'Yes';
    this.dialogSetting.cancelButton = 'No';
    this.dialogType = 'cancel';
    // this._assetConfigurationService.loadAddForm(false);
  }

  dialogConfirm($event): void {
    if ($event && this.dialogType == 'cancel') {
      this.facade.resetParams();
      this._subAssetTypeFacade.resetParams()
      this._accessoryTypeFacade.resetParams()
      this.router.navigate(['/configuration/asset-configuration']);
      return;
    }
    this.dialogModal = false;
    if ($event && !this.dialogSetting.hasError) {
      this.router.navigate(['/configuration/asset-configuration']).then((_) => {
        this.facade.resetParams();
        this._subAssetTypeFacade.resetParams()
        this._accessoryTypeFacade.resetParams()
      });
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

  errorAndSubmitHandle(submittedFacade) {
    submittedFacade.submitted$.subscribe((x) => {
      if (x) {
        this.dialogModal = true;
        this.dialogSetting.header = this.itemId ? 'Edit Type' : 'Add new type';
        this.dialogSetting.message = this.itemId ? 'Changes Saved Successfully' : 'Type Added Successfully';
        this.dialogSetting.isWarning = false;
        this.dialogSetting.hasError = false;
        this.dialogSetting.confirmButton = 'OK';
        this.dialogSetting.cancelButton = undefined;
      }
    });

    submittedFacade.error$.subscribe((x) => {
      if (x?.error) {
        this.dialogModal = true;
        this.dialogSetting.header = this.itemId ? 'Edit Type' : 'Add new type';
        this.dialogSetting.hasError = true;
        this.dialogSetting.message = 'Error occurred in progress';
        this.dialogSetting.cancelButton = undefined;
        this.dialogSetting.confirmButton = 'OK';
      }
    });
  }
  submit() {
    this.submited = true;
    this.dialogType = 'submit';
    if (this.inputForm.invalid) {
      this.inputForm.markAllAsTouched();
      return;
    }
    const inputFormValue = this.inputForm.getRawValue();
    let value;
    if (this.isEdit) {
      value = {
        id: this.itemId,
        name: inputFormValue.typeName,
        isActive: inputFormValue.activetype,
        description: inputFormValue.description
      }
    } else {
      value = {
        name: inputFormValue.typeName,
        isActive: inputFormValue.activetype,
        description: inputFormValue.description
      }
    }
    switch (this.type) {
      case 'ASSET':
        if (this.isEdit) {
          this.facade.updateAssetType(value)
        } else {
          this.facade.addAssetType(value);
        }
        break;
      case 'SUB_ASSET':
        if (this.isEdit) {
          this._subAssetTypeFacade.updateSubAssetType(value)
        } else {
          this._subAssetTypeFacade.addSubAssetType(value)
        }
        break;
      case 'ACCESSORY':
        if (this.isEdit) {
          this._accessoryTypeFacade.updateAccessoryType(value)
        } else {
          this._accessoryTypeFacade.addAccessoryType(value)
        }
        break;
      default:
        break;
    }
  }

  ngOnDestroy() {
    this._accessoryTypeFacade.resetParams();
    this._subAssetTypeFacade.resetParams();
    this.facade.resetParams();
  }



  getAssetText() {
    if (this.type == "ASSET") return "configuration.asset_configuration." + (this.isEdit ? "edit_asset_type" : "add_asset_type");
    if (this.type == "SUB_ASSET") return "configuration.asset_configuration." + (this.isEdit ? "edit_sub_asset_type" : "add_sub_asset_type");
    if (this.type == "ACCESSORY") return "configuration.asset_configuration." + (this.isEdit ? "edit_accessory_type" : "add_accessory_type");
  }
}

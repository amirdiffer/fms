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
import {
  AccessoryTypeFacade,
  AssetTypeFacade,
  SubAssetTypeFacade
} from '../../+state/fleet-configuration/index';
import { ActivatedRoute, Router } from '@angular/router';
import { Utility } from '@shared/utility/utility';
import { TableSetting } from '@core/table';
import { DataService } from '@feature/configuration/asset-configuration/data.service';
import { Observable } from 'rxjs';
import { DialogService } from '@core/dialog/dialog-template.component';

@Component({
  selector: 'congifuration-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.scss']
})
export class AddTypeComponent
  extends Utility
  implements OnInit, AfterViewInit, OnDestroy {
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
  assetTypes = [];
  successDialog;
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
    injector: Injector,
    private dialogService: DialogService
  ) {
    super(injector);
    this.assetConfigurationTableSetting = this._assetConfigurationService.assetConfigurationableSetting();
  }

  ngOnInit(): void {
    let activeRoute = this._activateRoute.snapshot.url[0].path;
    console.log(activeRoute);
    switch (activeRoute) {
      case 'add-asset-configuration':
      case 'edit-asset-configuration':
        this.type = 'ASSET';
        break;
      case 'add-sub-asset-configuration':
      case 'edit-sub-asset-configuration':
        this.type = 'SUB_ASSET';
        break;
      case 'add-accessory-configuration':
      case 'edit-accessory-configuration':
        this.type = 'ACCESSORY';
        break;
    }
    this.inputForm = this._fb.group({
      typeCategory: ['asset', Validators.required],
      typeName: ['', [Validators.required]],
      activetype: true,
      description: ['', Validators.required]
    });
    this.inputForm.patchValue({
      typeCategory: this.type
    });

    this.facade.assetType$.subscribe((x) => {
      this.assetTypes = x;
    });

    const url = this._activateRoute.snapshot.url;
    const hasEditPath = url.filter(
      (x) =>
        x.path == 'edit-asset-configuration' ||
        x.path == 'edit-sub-asset-configuration' ||
        x.path == 'edit-accessory-configuration'
    );
    if (hasEditPath.length > 0) {
      this.isEdit = true;
      this.itemId = +url[url.length - 1];
      switch (this.type) {
        case 'ASSET':
          this.facade.getAssetTypeByID(this.itemId);
          this.facade.loaded$.subscribe((load) => {
            if (load) {
              this.facade.specificAssetType$.subscribe((x) => {
                if (x) {
                  this.inputForm.patchValue({
                    typeName: x.name,
                    activetype: x.isActive,
                    description: x.description
                  });
                }
              });
            }
          });
          break;
        case 'SUB_ASSET':
          this._subAssetTypeFacade.getSubAssetTypeByID(this.itemId);
          this._subAssetTypeFacade.loaded$.subscribe((load) => {
            if (load) {
              this._subAssetTypeFacade.specificSubAssetType$.subscribe((x) => {
                if (x) {
                  this.inputForm.patchValue({
                    typeName: x.name,
                    activetype: x.isActive,
                    description: x.description
                  });
                }
              });
            }
          });
          break;
        case 'ACCESSORY':
          this._accessoryTypeFacade.getAccessoryTypeByID(this.itemId);
          this._accessoryTypeFacade.loaded$.subscribe((load) => {
            if (load) {
              this._accessoryTypeFacade.specificAccessoryType$.subscribe(
                (x) => {
                  if (x) {
                    this.inputForm.patchValue({
                      typeName: x.name,
                      activetype: x.isActive,
                      description: x.description
                    });
                  }
                }
              );
            }
          });
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

  public fileLeave(event) {}

  public addModel() {
    const model = new FormControl('');
    (<FormArray>this.inputForm.get('models')).push(model);
  }

  dialogType = '';
  public cancel() {
    const dialog = this.dialogService.show('warning', 'Add asset configuration',
      this.itemId ? 'Are you sure to cancel changes type ?' : 'Are you sure to cancel adding new type ?',
      'Yes', 'No');
    dialog.dialogClosed$.subscribe(result => {
      if (result === 'confirm') {
        this.router.navigate(['/configuration/asset-configuration']).then();
      }
    });
    // this._assetConfigurationService.loadAddForm(false);
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
        const dialog = this.dialogService.show('success', this.itemId ? 'Edit Type' : 'Add new type',
          this.itemId ? 'Changes Saved Successfully' : 'Type Added Successfully',
          'OK', '');
        dialog.dialogClosed$.subscribe(result => {
          if (result === 'confirm') {
            if (this.type === 'ASSET') {
              this.facade.resetParams();
            } else if (this.type === 'SUB_ASSET') {
              this._subAssetTypeFacade.resetParams();
            } else {
              this._accessoryTypeFacade.resetParams();
            }
            this.router.navigate(['/configuration/asset-configuration']).then();
          }
        });
      }
    });

    submittedFacade.error$.subscribe((x) => {
      if (x?.error) {
        const dialog = this.dialogService.show('danger', this.itemId ? 'Edit Type' : 'Add new type',
          'Error occurred in progress',
          'OK', '');
        dialog.dialogClosed$.subscribe(result => {
          if (result === 'confirm') {
          } else {
          }
        });
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
      };
    } else {
      value = {
        name: inputFormValue.typeName,
        isActive: inputFormValue.activetype,
        description: inputFormValue.description
      };
    }
    switch (this.type) {
      case 'ASSET':
        if (this.isEdit) {
          this.facade.updateAssetType(value);
        } else {
          this.facade.addAssetType(value);
        }
        break;
      case 'SUB_ASSET':
        if (this.isEdit) {
          this._subAssetTypeFacade.updateSubAssetType(value);
        } else {
          this._subAssetTypeFacade.addSubAssetType(value);
        }
        break;
      case 'ACCESSORY':
        if (this.isEdit) {
          this._accessoryTypeFacade.updateAccessoryType(value);
        } else {
          this._accessoryTypeFacade.addAccessoryType(value);
        }
        break;
      default:
        break;
    }
  }

  ngOnDestroy() {
    this._dataService.selectType('ASSET');
  }

  getAssetText() {
    if (this.type == 'ASSET')
      return (
        'configuration.asset_configuration.' +
        (this.isEdit ? 'edit_asset_type' : 'add_asset_type')
      );
    if (this.type == 'SUB_ASSET')
      return (
        'configuration.asset_configuration.' +
        (this.isEdit ? 'edit_sub_asset_type' : 'add_sub_asset_type')
      );
    if (this.type == 'ACCESSORY')
      return (
        'configuration.asset_configuration.' +
        (this.isEdit ? 'edit_accessory_type' : 'add_accessory_type')
      );
  }
}

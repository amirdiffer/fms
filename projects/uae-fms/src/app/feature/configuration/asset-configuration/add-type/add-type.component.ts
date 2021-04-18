import {
  AfterViewInit,
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
import { AssetConfigurationService } from '../asset-configuration.service';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { AssetTypeFacade } from '../../+state/asset-configuration';
import { Router } from '@angular/router';
import { Utility } from '@shared/utility/utility';
import { TableSetting } from '@core/table';
import { DataService } from '@feature/configuration/asset-configuration/data.service';

@Component({
  selector: 'congifuration-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.scss']
})
export class AddTypeComponent extends Utility implements OnInit, AfterViewInit {
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

  dialogModal = false;

  dialogSetting: IDialogAlert = {
    header: 'Add asset configuration',
    hasError: false,
    message: 'Message is Here',
    confirmButton: 'Register Now',
    cancelButton: 'Cancel'
  };

  assetTypes;

  constructor(
    private _fb: FormBuilder,
    private _renderer: Renderer2,
    private _assetConfigurationService: AssetConfigurationService,
    private facade: AssetTypeFacade,
    public router: Router,
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

    this.facade.assetType$.subscribe((x) => {
      this.assetTypes = x;
    });
    this._dataService.watchType().subscribe((x) => {
      this.inputForm.patchValue({
        typeCategory: x
      });
    });
    this.facade.submitted$.subscribe((x) => {
      if (x) {
        this.dialogModal = true;
        this.dialogSetting.header = 'Add new type';
        this.dialogSetting.message = 'Type Added Successfully';
        this.dialogSetting.isWarning = false;
        this.dialogSetting.hasError = false;
        this.dialogSetting.confirmButton = 'OK';
        this.dialogSetting.cancelButton = undefined;
      }
    });

    this.facade.error$.subscribe((x) => {
      if (x?.error) {
        this.dialogModal = true;
        this.dialogSetting.header = 'Add new type';
        this.dialogSetting.hasError = true;
        this.dialogSetting.message = 'Error occurred in progress';
        this.dialogSetting.cancelButton = undefined;
        this.dialogSetting.confirmButton = 'OK';
      }
    });
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

  dialogType = '';
  public cancel() {
    this.dialogModal = true;
    this.dialogSetting.hasError = false;
    this.dialogSetting.isWarning = true;
    this.dialogSetting.message = 'Are you sure to cancel adding new type?';
    this.dialogSetting.confirmButton = 'Yes';
    this.dialogSetting.cancelButton = 'No';
    this.dialogType = 'cancel';
    // this._assetConfigurationService.loadAddForm(false);
  }

  dialogConfirm($event): void {
    if (this.dialogType == 'cancel') {
      this.facade.resetParams();
      this.router.navigate(['/configuration/asset-configuration']);
      return;
    }
    this.dialogModal = false;
    if ($event && !this.dialogSetting.hasError) {
      this.router.navigate(['/configuration/asset-configuration']).then((_) => {
        this.facade.resetParams();
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

  submit() {
    this.submited = true;
    this.dialogType = 'submit';
    if (this.inputForm.invalid) {
      this.inputForm.markAllAsTouched();
      return;
    }

    let type: string = this.inputForm.value.typeCategory;
    // switch (this.inputForm.value.typeCategory) {
    //   case 'asset':
    //     type = 'ASSET';
    //     break;
    //   case 'subAsset':
    //     type = 'SUB_ASSET';
    //     break;
    //   case 'accessory':
    //     type = 'ACCESSORY';
    //     break;
    //   default:
    //     type = 'ASSET';
    // }

    const data = [
      ...this.assetTypes.map((x) => {
        return {
          id: x.id,
          type: x.type,
          name: x.name,
          isActive: x.isActive,
          typeDescription: x.typeDescription
        };
      }),
      {
        type: type,
        name: this.inputForm.value.typeName,
        isActive: this.inputForm.value.activetype,
        typeDescription: this.inputForm.value.description
      }
    ];
    /*       const value ={
        type: type,
        name: this.inputForm.value.typeName,
        isActive: this.inputForm.value.activetype,
        typeDescription: this.inputForm.value.description
      } */

    this.facade.addAssetType(data);
  }
}

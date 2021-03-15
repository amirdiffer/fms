import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  Renderer2,
  AfterViewInit,
  Injector
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Utility } from '@shared/utility/utility';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry
} from 'ngx-file-drop';
import { AssetConfigurationService } from '../asset-configuration.service';
import { TableSetting } from '@core/table';
import { IDialogAlert } from '@core/alret-dialog/alret-dialog.component';

@Component({
  selector: 'congifuration-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  constructor(
    private _fb: FormBuilder,
    private _renderer: Renderer2,
    private _assetConfigurationService: AssetConfigurationService,
    injector: Injector
  ) {
    super(injector);
    this.assetConfigurationTableSetting = this._assetConfigurationService.assetConfigurationableSetting();
  }

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      typeCategory: [''],
      typeName: [''],
      activetype: [false],
      description: [''],
      type: ['mModel'],
      selectModel: [''],
      // models: this._fb.array([this._fb.control([])])
      models: [''],
      colors: ['']
    });
  }
  ngAfterViewInit() {
    this.percent = (+this.value * 100) / +this.maxValue;
    this._renderer.setStyle(
      this.progressBar.nativeElement,
      'width',
      `${this.percent}%`
    );
    this._renderer.setStyle(
      this.progressBar.nativeElement,
      'background-color',
      `${this.color}`
    );
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

  public addModel() {
    const model = new FormControl('');
    (<FormArray>this.inputForm.get('models')).push(model);
    console.log();
  }

  public cancel() {
    this.dialogModal = true;
    this.dialogSetting.hasError = false;
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

  submit() {
    this.dialogModal = true;
    this.submited = true;
    if (this.inputForm.invalid) {
      this.dialogSetting.hasError = true;
      this.dialogSetting.message = 'Some fields are empty, please fill them';
      this.dialogSetting.confirmButton = 'OK';
      this.dialogSetting.cancelButton = undefined;
      return;
    }

    this.dialogSetting.hasError = false;
    this.dialogSetting.message = 'Type added successfully';
    this.dialogSetting.confirmButton = 'OK';
    this.dialogSetting.cancelButton = undefined;

    // this._assetConfigurationService.loadAddForm(false);
  }
}

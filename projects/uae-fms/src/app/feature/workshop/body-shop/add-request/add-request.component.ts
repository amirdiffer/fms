import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { AddRequestFakeService } from './_fake.service';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry
} from 'ngx-file-drop';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
@Component({
  selector: 'anms-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddRequestComponent implements OnInit {
  dialogModal = false;

  dialogSetting: IDialogAlert = {
    header: 'Add Request',
    hasError: false,
    message: 'Message is Here',
    confirmButton: 'Register Now',
    cancelButton: 'Cancel'
  };

  activePriority: string = 'high';
  progressBarValue = 50;
  bufferValue = 70;
  tableSettingServie;
  tableSettingWarranty;
  oldAssetSuggests: any[];
  filteredAsset: any[];
  submited = false;
  assets: any[] = [
    { name: 'Item No 234567890', gps: '456783234658' },
    { name: 'Item No 234567891', gps: '666663345435' },
    { name: 'Item No 234567892', gps: '567434234244' },
    { name: 'Item No 234567893', gps: '541565456465' },
    { name: 'Item No 234567894', gps: '489456141856' }
  ];
  inputForm: FormGroup;
  public filesUpdloaded: NgxFileDropEntry[] = [];
  constructor(
    private _fb: FormBuilder,
    private _fakeService: AddRequestFakeService,
    private _roter: Router
  ) {}

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      assetSearch: ['', [Validators.required, this.autocompleteValidation]],
      assetInfo: this._fb.group({
        asset: [''],
        gpsMeterSource: ['']
      }),
      reason: [false],
      accidentOption: ['miner'],
      jobType: ['estimate'],
      issueInfo: this._fb.group({
        issue: ['', Validators.required],
        repertedBy: ['', Validators.required],
        description: ['', Validators.required]
      }),
      priority: [''],
      file: ['']
    });

    this.tableSettingServie = this._fakeService.tableSettingService;
    this.tableSettingWarranty = this._fakeService.tableSettingWarranty;
  }

  searchAsset(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.assets.length; i++) {
      let asset = this.assets[i];
      if (asset.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(asset);
      }
    }
    this.filteredAsset = filtered;
  }

  selectedAsset(value) {
    this.inputForm.patchValue({
      assetInfo: {
        asset: value.name,
        gpsMeterSource: value.gps
      }
    });
  }
  autocompleteValidation(input: FormControl) {
    const inputValid = input.value.name;
    if (inputValid) {
      return null;
    } else {
      return { needsExclamation: true };
    }
  }

  dialogConfirm($event): void {
    this.dialogModal = false;
    if ($event && !this.dialogSetting.hasError) {
      this._roter.navigate(['/workshop/body-shop']).then();
    }
  }

  addRequest() {
    this.submited = true;
    if (this.inputForm.invalid) {
      return;
    }
    // console.log(this.inputForm.value);
    // this._roter.navigate(['/workshop/body-shop']);
    // } else {
    // console.log('have an Error');
    // const controls = this.inputForm.controls;
    // for (const name in controls) {
    //   if (controls[name].invalid) {
    //     controls[name].markAsTouched();
    //   }
    // }
    // }

    this.dialogModal = true;
    this.dialogSetting.isWarning = false;
    this.dialogSetting.hasError = false;
    this.dialogSetting.message = 'Request added successfully';
    this.dialogSetting.confirmButton = 'OK';
    this.dialogSetting.cancelButton = undefined;
  }

  cancelForm() {
    this.dialogModal = true;
    this.dialogSetting.isWarning = true;
    this.dialogSetting.message = 'Are you sure to cancel adding new reqeust?';
    this.dialogSetting.confirmButton = 'Yes';
    this.dialogSetting.cancelButton = 'No';

    // if (this.inputForm.dirty) {
    //   confirm('Are You sure that you want to cancel?')
    //     ? this._roter.navigate(['/workshop/body-shop'])
    //     : null;
    // } else {
    //   this._roter.navigate(['/workshop/body-shop']);
    // }
  }
  changePriority(statusPriority): void {
    this.activePriority = statusPriority;
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
}

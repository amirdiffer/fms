import { Component, OnInit, Injector } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { Utility } from '@shared/utility/utility';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry
} from 'ngx-file-drop';
import { DialogService } from '@core/dialog/dialog-template.component';
@Component({
  selector: 'anms-add-toll',
  templateUrl: './add-toll.component.html',
  styleUrls: ['./add-toll.component.scss']
})
export class AddTollComponent extends Utility implements OnInit {
  fileValid = false;
  formSubmitted = false;
  uploadReview: boolean = false;
  progressBarValue = 80;
  closeIcon = 'assets/icons/times.svg';
  openReview = false;
  inputForm: FormGroup;
  public filesUpdloaded: NgxFileDropEntry[] = [];
  allFileUpload = new Array();
  submited = false;

  constructor(private _fb: FormBuilder, injector: Injector, private dialogService: DialogService) {
    super(injector);
  }

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      // upload:[this.allFileUpload , Validators.required]
      upload: this._fb.array([])
    });
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.filesUpdloaded = files;
    let fileUpload = null;
    for (const droppedFile of files) {
      if (
        droppedFile.fileEntry.isFile &&
        this.dropAndDragValidation(droppedFile.fileEntry.name)
      ) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.allFileUpload.push(droppedFile);
          const fileArrayForm = new FormControl(fileEntry.file, [
            Validators.required
          ]);
          (<FormArray>this.inputForm.get('upload')).push(fileArrayForm);
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;

        const dialog = this.dialogService.show('danger',  'Add Toll',
          'file format incorrect (CSV only)', 'OK', '');
        dialog.dialogClosed$.subscribe(result => {
          if (result === 'confirm') {

          }
        })
      }
    }
  }
  public fileOver(event) {
    // console.log(event);
  }

  public fileLeave(event) {
    // console.log(event);
  }

  dropAndDragValidation(file: string) {
    let isFileAllowed = false;
    const allowedFiles = ['.csv'];
    const regex = /(?:\.([^.]+))?$/;
    const extension = regex.exec(file);
    if (undefined !== extension && null !== extension) {
      for (const ext of allowedFiles) {
        if (ext === extension[0]) {
          isFileAllowed = true;
        }
      }
    }
    return isFileAllowed;
  }

  submit() {
    this.submited = true;
    if (this.allFileUpload.length < 1) {
      return;
    } else {
      this.openReview = true;
    }
  }
  cancel() {
    if (!this.openReview) {
      if (this.allFileUpload.length > 0) {
        const dialog = this.dialogService.show('warning', 'Add Toll',
          'Are you sure that you want to cancel the toll creation?', 'Yes', 'No');
        dialog.dialogClosed$.subscribe(result => {
          if (result === 'confirm') {
            this.goToList();
          }
        });
      } else {
        this.goToList();
      }
    } else {
      this.openReview = false;
    }
  }
  save() {
    const dialog = this.dialogService.show('success', 'Add Toll',
      'New Toll Successfully Added', 'OK', '');
    dialog.dialogClosed$.subscribe(result => {
      if (result === 'confirm') {
        this.goToList();
      }
    });
  }
  deleteFile(index) {
    this.allFileUpload.splice(index, 1);
  }
}

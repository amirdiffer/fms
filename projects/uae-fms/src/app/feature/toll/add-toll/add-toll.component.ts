import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Injector } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDialogAlert } from '@core/alret-dialog/alret-dialog.component';
import { Utility } from '@shared/utility/utility';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry
} from 'ngx-file-drop';
@Component({
  selector: 'anms-add-toll',
  templateUrl: './add-toll.component.html',
  styleUrls: ['./add-toll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTollComponent extends Utility implements OnInit {
  uploadReview: boolean= false;
  progressBarValue = 80;
  closeIcon = 'assets/icons/times.svg';
  openReview = false;
  inputForm: FormGroup;
  public filesUpdloaded: NgxFileDropEntry[] = [];
  allFileUpload= new Array();
  submited=false;
  dialogModalError= false;
  dialogModalCancel = false;
  dialogModalAdd= false;
  dialogSettingError : IDialogAlert ={
    header:'Add Toll',
    hasError:true,
    hasHeader:true,
    message:'file format incorrect (CSV only)',
    confirmButton: 'OK',
  }
  dialogSettingCancel : IDialogAlert ={
    header:'Add Toll',
    hasError:false,
    hasHeader:true,
    isWarning:true,
    message:'Are you sure that you want to cancel the toll creation?',
    confirmButton: 'Yes',
    cancelButton:'No',
  }

  dialogSettingAdd : IDialogAlert ={
    header:'Add Toll',
    hasError:false,
    hasHeader:true,
    message:'New Toll Successfully Added',
    confirmButton: 'OK',
  }
  constructor(private _cd : ChangeDetectorRef , private _fb: FormBuilder , injector: Injector,) { super(injector);}

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      // upload:[this.allFileUpload , Validators.required]
      upload: this._fb.array([])
    })
  }
  
  public dropped(files: NgxFileDropEntry[]) {
    this.filesUpdloaded = files;
    let fileUpload = null;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile  && this.dropAndDragValidation(droppedFile.fileEntry.name) ) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.allFileUpload.push(droppedFile)
          this._cd.markForCheck();
          const fileArrayForm = new FormControl(fileEntry.file, [Validators.required]);
          (<FormArray>this.inputForm.get('upload')).push(fileArrayForm);
          console.log(this.allFileUpload)
        });
        console.log('2', droppedFile.relativePath);
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
        this.dialogModalError = true;
      }
      console.log('3', files);
      
    }
  }
  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  dropAndDragValidation(file:string){
    let isFileAllowed = false;
    const allowedFiles = ['.csv'];
    const regex = /(?:\.([^.]+))?$/;
    const extension = regex.exec(file);
    if (undefined !== extension && null !== extension){
      for (const ext of allowedFiles) {
        if (ext === extension[0]) {
          isFileAllowed = true;
        }
      }
    }
    return isFileAllowed;
  }

  dialogErrorConfirm(value){
    this.dialogModalError = false
  }
  dialogCancelConfirm(value){
    if(value === true){
      this.goToList();
    }
    this.dialogModalCancel = false
  }
  dialogAddConfirm(value){
    if(value === true){
      this.goToList();
    }
    this.dialogModalAdd = false;
  }
  submit(){
    this.submited = true;
    if (this.allFileUpload.length < 1) {
      return;
    }else{
      this.openReview = true;
      console.log('hamid')
    }
    
  }
  cancel(){
    if(!this.openReview){
      if(this.allFileUpload.length > 0){
        this.dialogModalCancel = true;
      } else {
        this.goToList();
      }
    }else{
      this.openReview = false
    }
  }
  save(){
    this.dialogModalAdd = true;
  }
  deleteFile(index){
    this.allFileUpload.splice(index , 1 )
  }
  
}

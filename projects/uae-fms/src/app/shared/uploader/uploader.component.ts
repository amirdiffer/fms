import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  OnChanges
} from '@angular/core';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry
} from 'ngx-file-drop';
import { UploaderService } from '@shared/uploader/uploader.service';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpResponse
} from '@angular/common/http';
import { environment } from '@environments/environment';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';

@Component({
  selector: 'anms-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploaderComponent implements OnInit , OnChanges{
  @Input() hasError = false
  @Input() maxSize = 5120;
  @Input() uploaderName = '';
  @Input() multiple = false;
  @Input() readCSVFile= false;
  @Input() iconIsHidden = false;
  @Input() preview = true;
  @Input() isImage = false;
  @Input() files = [];
  @Input() accept = ['.csv', '.png', '.jpg', '.txt', '.json'];
  @Output() uploadedEvent: EventEmitter<object> = new EventEmitter<object>();
  @Output() csvTextEvent: EventEmitter<any> = new EventEmitter<any>();
  allFileUpload: Array<any> = [];
  uploadReview: boolean = false;
  isUploading = false;
  filesUploadSuccess = 0;
  filesUploadError = 0;
  progressBarValue = 0;
  filesSize = 0;
  formData = new FormData();
  closeIcon = 'assets/icons/times.svg';
  fileIcon = 'assets/icons/files.svg';
  fileName = '';
  fileImage: string = undefined;
  imageModal:boolean = false;
  /* Ngx File Drop */
  public filesUpdloaded: NgxFileDropEntry[] = [];
  dialogModalError = false;
  dialogSettingError: IDialogAlert = {
    header: 'Upload File',
    hasError: true,
    hasHeader: true,
    message: `File format incorrect`,
    confirmButton: 'OK',
  }
  constructor(
    private _uploaderService: UploaderService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    
  }

  ngOnChanges(){
    if(!this.multiple && typeof this.files[0] == 'undefined'){
      this.files =[];
    }
    if(this.isImage && this.files.length > 0){
      this.fileImage = `${environment.baseApiUrl}document/${this.files[0]}`;
    }
  }
  public dropped(files: NgxFileDropEntry[], option: string, index?: number) {
    this.filesUpdloaded = files;
    let fileUpload = null;
    let fileSize = 0;
    let fileSuffix = '';
    for (const droppedFile of files) {
      this.fileName = droppedFile.fileEntry.name;
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          fileSize = file.size / 1024;
          fileSuffix = this.getSuffix(file);
          if ((fileSize < this.maxSize, this.accept.includes(fileSuffix))) {
            this.formData.delete('doc');
            this.allFileUpload.push(droppedFile);
            this.filesSize += fileSize;
            this.formData.append('doc', file);
            this.upload(index);
            this.changeDetector.markForCheck();
          } else if (!this.accept.includes(fileSuffix)){
            this.dialogModalError = true;
            this.changeDetector.markForCheck();
          }
        });
      }
    }
  }

  setFiles(index?: number): void {
    if(this.files){
      this.uploadedEvent.emit({
        name: this.uploaderName,
        files: this.files,
        index: index
      });
    }
  }

  getSuffix(file: File): string {
    let namesArr = file.name.split('.');
    return '.' + namesArr[namesArr.length - 1];
  }

  getFile(id) {
    return this._uploaderService.getDoc(id);
  }

  getAddress(id): string {
    return environment.baseApiUrl + `document/${id}`;
  }
  getValueCSV(id){
    this._uploaderService.getCSVfile(id).subscribe(x => {processData(x)})
    let that = this;
    function processData(allText) {
      let textEmit = allText.split(/\r\n|\n/);
      console.log(textEmit);
      that.csvTextEvent.emit(textEmit);
    }
  }
  upload(indexUploadBox?: number) {
    this.filesUploadSuccess = 0;
    this.filesUploadError = 0;
    this.isUploading = true;
    this._uploaderService.uploadDoc(this.formData).subscribe(
      (event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            break;
          case HttpEventType.ResponseHeader:
            break;
          case HttpEventType.UploadProgress:
            this.progressBarValue = Math.round(
              (event.loaded / event.total) * 100
              );
              (this.progressBarValue + ' %');
              this.changeDetector.markForCheck();
            break;
          case HttpEventType.Response:
            setTimeout(() => {
              this.progressBarValue = 0;
              this.isUploading = false;
            }, 1500);
            this.changeDetector.markForCheck();
            this.changeDetector.detectChanges();
        }
        if (event instanceof HttpResponse) {
          if (!event.body.error) {
            if (!this.multiple) this.files = [];
            this.files.push(event.body.message.id);
            console.log(event.body.message.id)
            this.changeDetector.markForCheck();
            if(this.readCSVFile){
              this.getValueCSV(event.body.message.id)
            }
            this.fileImage = `${event.url}/${event.body.message.id}`;
            this.filesUploadSuccess++;
            this.progressBarValue = 0;
            this.setFiles(indexUploadBox);
          }
        }
        this.changeDetector.detectChanges();
      },
      (error) => {
        this.filesUploadError++;
        this.changeDetector.detectChanges();
      }
    );
    this.changeDetector.detectChanges();
  }

  removeFile(index) {
    this.files.splice(index, 1);
    this.setFiles(index);
    this.fileName = '';
    this.changeDetector.detectChanges();
  }

  dialogErrorConfirm(value) {
    this.dialogModalError = false
  }
  showImage(){
    console.log(this.imageModal)
    console.log('Image')
    this.imageModal= true
  }
}

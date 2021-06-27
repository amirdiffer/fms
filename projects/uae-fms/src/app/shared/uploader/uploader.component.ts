import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
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
import { resolve } from 'path';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'anms-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit , OnChanges{
  @Input() hasError = false;
  @Input() maxSize = 5120;
  @Input() uploaderName = '';
  @Input() multiple = false;
  @Input() readCSVFile = false;
  @Input() iconIsHidden = false;
  @Input() preview = true;
  @Input() isImage = false;
  @Input() files = [];
  @Input() accept = [
    '.csv',
    '.png',
    '.jpg',
    '.txt',
    '.json',
    '.pdf',
    '.doc',
    '.docx',
    '.xls',
    '.xlsx'
  ];
  @Input() isSmall = false;
  @Input() dropzoneLabel = '';
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
  imageModal: boolean = false;
  fileServer = environment.baseApiUrl + 'document/';
  /* Ngx File Drop */
  public filesUpdloaded: NgxFileDropEntry[] = [];
  dialogModalError = false;
  dialogSettingError: IDialogAlert = {
    header: 'Upload File',
    hasError: true,
    hasHeader: true,
    message: `File format incorrect`,
    confirmButton: 'OK'
  };
  constructor(private _uploaderService: UploaderService) {}

  ngOnInit(): void {
    if(!this.multiple && !this.files[0]){
      this.files = []
    }
  }
  ngOnChanges(){
    if(this.files.length>0){
      this.files = this.files.map(x => {
        if(x){
          return {id: x , type: this.getFileType(x)}
        }
      })
    }
  }

  public dropped(files: NgxFileDropEntry[], option: string, index?: number) {
    this.filesUpdloaded = files;
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
          } else if (!this.accept.includes(fileSuffix)) {
            this.dialogModalError = true;
          }
        });
      }
    }
  }

  setFiles(index?: number): void {
    if (this.files) {
      this.uploadedEvent.emit({
        name: this.uploaderName,
        files: this.files.map(x => {
          return x.id ? x.id : x
        }),
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
  getValueCSV(id) {
    this._uploaderService.getCSVfile(id).subscribe((x) => {
      processData(x);
    });
    let that = this;
    function processData(allText) {
      let textEmit = allText.split(/\r\n|\n/);
      that.csvTextEvent.emit(textEmit);
    }
  }
  upload(indexUploadBox?: number) {
    this.filesUploadSuccess = 0;
    this.filesUploadError = 0;
    this.isUploading = true;
    let id;
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
            this.progressBarValue + ' %';
            break;
          case HttpEventType.Response:
            setTimeout(() => {
              this.progressBarValue = 0;
              this.isUploading = false;
            }, 1500);
        }
        if (event instanceof HttpResponse) {
          if (!event.body.error) {
            if (!this.multiple) this.files = [];
            id = event.body.message.id;
            this.files.push({id :id , type: this.getFileType(id) });
            if (this.readCSVFile) {
              this.getValueCSV(event.body.message.id);
            }
            this.fileImage = `${event.url}/${id}`;
            this.filesUploadSuccess++;
            this.progressBarValue = 0;
            this.setFiles(indexUploadBox);
          }
        }
      },
      (error) => {
        this.isUploading = false;
        this.progressBarValue = 0;
        this.filesUploadError++;
      },

    );
  }

  filterFilesOfNull(): Array<any> {
    return this.files.filter((x) => x != null);
  }

  removeFile(index) {
    this.files.splice(index, 1);
    this.setFiles(index);
    this.fileName = '';
  }

  dialogErrorConfirm(value) {
    this.dialogModalError = false;
  }
  showImage() {
    this.imageModal = true;
  }
  getFileType(id:number):Observable<string>{
    return this.getFile(id).pipe(map(x => {
      return x.body.type
    }))
  }

  findContentType(contentType:string){
    if(contentType && contentType !== null){
      switch (true) {
        case contentType.includes('excel'):
          return 'assets/icons/file-excel.svg'
        case contentType.includes('sheet'):
          return 'assets/icons/file-excel.svg'
        case contentType.includes('pdf'):
          return 'assets/icons/file-pdf.svg'
        case contentType.includes('csv'):
          return 'assets/icons/file-csv.svg'
        default: 
          return 'assets/icons/file-alt.svg'
      }
    }
  }
  findContentTypeColor(contentType:string){
    if(contentType && contentType !== null){
      switch (true) {
        case contentType.includes('excel'):
          return '#1d6f42'
        case contentType.includes('sheet'):
          return '#1d6f42'
        case contentType.includes('pdf'):
          return '#F40F02'
        case contentType.includes('csv'):
          return '#1d6f42'
        default: 
          return '#808080'
      }
    }
  }
}

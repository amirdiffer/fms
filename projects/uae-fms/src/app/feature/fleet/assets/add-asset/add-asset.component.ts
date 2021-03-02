import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry
} from 'ngx-file-drop';

@Component({
  selector: 'anms-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddAssetComponent implements OnInit {
  isEditable: boolean = true;
  isLinear: boolean = true;
  isStart: boolean = true;
  progressBarValue = 80;
  calenderIcon = 'assets/icons/calendar-alt-regular.svg';
  public filesUpdloaded: NgxFileDropEntry[] = [];

  /* Forms */
  formGroupAssetDetail: FormGroup;
  formGroupFinancial:FormGroup;
  formGroupMaintenance:FormGroup;
  formGroupGenerate:FormGroup;


  @ViewChild('stepper') stepper: MatStepper;
  itemTypes = [
    { name: 'Item type 1', id: 1 },
    { name: 'Item type 2', id: 2 },
    { name: 'Item type 3', id: 3 },
    { name: 'Item type 4', id: 4 },
    { name: 'Item type 5', id: 5 },
    { name: 'Item type 6', id: 6 }
  ];

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroupAssetDetail = this._fb.group({
      businessInfo: this._fb.group({
        businessCategory:[''],
        ownership:['']
      }),
      assetDetails: this._fb.group({
        year:[''],
        make:[''],
        model:[''],
        color:[''],
        trim:[''],
        origin:[''],
        meterType:['']
      }),
      purchasedFor: this._fb.group({
        department:[''],
        operator:['']
      }),
      uploadFile:['']
    })
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
  next() {
    this.stepper.next();
    this.isStart = false;
  }
  previous() {
    this.stepper.previous();
  }
}

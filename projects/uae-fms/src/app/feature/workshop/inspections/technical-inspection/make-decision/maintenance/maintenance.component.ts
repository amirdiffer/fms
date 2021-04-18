import { Utility } from './../../../../../../shared/utility/utility';
import { Output, Injector } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry
} from 'ngx-file-drop';

@Component({
  selector: 'step3-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent extends Utility implements OnInit {
  @Output('formGroup') formGroup: EventEmitter<FormGroup> = new EventEmitter();
  @Input('submit') submit = false;
  public filesUpdloaded: NgxFileDropEntry[] = [];
  inputForm: FormGroup;
  constructor(private _fb: FormBuilder, injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      service: this._fb.group({
        purchase: [true, Validators.compose([Validators.required])],
        integration: [false, Validators.compose([Validators.required])]
      }),
      priodicService: ['', Validators.compose([Validators.required])],
      warrantyPackage: ['', Validators.compose([Validators.required])],
      warrantyDat: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      file: ['']
    });
    this.inputForm.valueChanges.subscribe((form) => {
      this.formGroup.emit(form);
    });
  }

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
}

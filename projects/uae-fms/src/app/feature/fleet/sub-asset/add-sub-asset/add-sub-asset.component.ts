import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injector
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utility } from '@shared/utility/utility';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry
} from 'ngx-file-drop';
@Component({
  selector: 'anms-add-sub-asset',
  templateUrl: './add-sub-asset.component.html',
  styleUrls: ['./add-sub-asset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddSubAssetComponent extends Utility implements OnInit {
  subAssetForm: FormGroup;
  warranties: FormArray;
  submited = false;
  public filesUpdloaded: NgxFileDropEntry[] = [];
  constructor(injector: Injector, private _fb: FormBuilder) {
    super(injector);
  }

  subAssetTypes = [
    { name: 'type 1', id: 1 },
    { name: 'type 2', id: 2 },
    { name: 'type 3', id: 3 },
    { name: 'type 4', id: 4 },
    { name: 'type 5', id: 5 },
    { name: 'type 6', id: 6 }
  ];
  makes = [
    { name: 'make 1', id: 1 },
    { name: 'make 2', id: 2 },
    { name: 'make 3', id: 3 },
    { name: 'make 4', id: 4 },
    { name: 'make 5', id: 5 },
    { name: 'make 6', id: 6 }
  ];
  models = [
    { name: 'model 1', id: 1 },
    { name: 'model 2', id: 2 },
    { name: 'model 3', id: 3 },
    { name: 'model 4', id: 4 },
    { name: 'model 5', id: 5 },
    { name: 'model 6', id: 6 }
  ];
  years = [
    { name: 'year 1', id: 1 },
    { name: 'year 2', id: 2 },
    { name: 'year 3', id: 3 },
    { name: 'year 4', id: 4 },
    { name: 'year 5', id: 5 },
    { name: 'year 6', id: 6 }
  ];

  origins = [
    { name: 'type 1', id: 1 },
    { name: 'type 2', id: 2 },
    { name: 'type 3', id: 3 },
    { name: 'type 4', id: 4 },
    { name: 'type 5', id: 5 },
    { name: 'type 6', id: 6 }
  ];

  policyTypes = [
    { name: 'type 1', id: 1 },
    { name: 'type 2', id: 2 },
    { name: 'type 3', id: 3 },
    { name: 'type 4', id: 4 },
    { name: 'type 5', id: 5 },
    { name: 'type 6', id: 6 }
  ];

  units = [
    { name: 'Year ', id: 1 },
    { name: 'Month ', id: 2 },
    { name: 'Day ', id: 3 },
    { name: 'Week ', id: 4 },
    { name: '2 Week ', id: 5 },
    { name: '3 Week', id: 6 }
  ];

  ngOnInit(): void {
    this.subAssetForm = this._fb.group({
      subAssetType: ['', [Validators.required]],
      make: ['', [Validators.required]],
      model: ['', [Validators.required]],
      year: ['', [Validators.required]],
      origin: ['', [Validators.required]],
      policyType: ['', [Validators.required]],
      purchaseValue: ['', [Validators.required]],
      description: [''],
      warranties: this._fb.array([this.createWarantyForm()])
    });
  }

  addWarranty(): void {
    this.warranties = this.subAssetForm.get('warranties') as FormArray;
    this.warranties.push(this.createWarantyForm());
  }

  createWarantyForm(): FormGroup {
    return this._fb.group({
      item: [''],
      year: [''],
      duration: [''],
      startDate: [''],
      doc: ['']
    });
  }
  submit() {
    this.submited = true;
    if (this.subAssetForm.invalid) {
      return;
    }
    this.goToList();
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

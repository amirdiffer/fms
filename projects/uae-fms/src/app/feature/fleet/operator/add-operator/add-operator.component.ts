import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry
} from 'ngx-file-drop';
@Component({
  selector: 'anms-add-operator',
  templateUrl: './add-operator.component.html',
  styleUrls: ['./add-operator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddOperatorComponent implements OnInit {
  calenderIcon = 'assets/icons/calendar-alt-regular.svg';
  public filesUpdloaded: NgxFileDropEntry[] = [];
  progressBarValue = 70;
  employeNumber = [
    { name: 'Employee 1', id: 1 },
    { name: 'Employee 2', id: 2 },
    { name: 'Employee 3', id: 3 },
    { name: 'Employee 4', id: 4 },
    { name: 'Employee 5', id: 5 },
    { name: 'Employee 6', id: 6 }
  ];
  filteredEmploye: any[];
  constructor() {}

  ngOnInit(): void {}

  searchEmploye(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.employeNumber.length; i++) {
      let asset = this.employeNumber[i];
      if (asset.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(asset);
      }
    }
    this.filteredEmploye = filtered;
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

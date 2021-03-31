import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataService {
  isEditing = false;
  dataToEditFromTable: any;

  constructor() {}
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  selectedTypeId = 0;
  selectedMakeId = 0;

  constructor() {}
}

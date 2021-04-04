import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  selectedTypeId = 0;
  selectedTypeName = '';
  selectedMakeId = 0;
  selectedMakeName = '';
  selectedModelId = 0;
  selectedModelName = '';

  constructor() {}
}

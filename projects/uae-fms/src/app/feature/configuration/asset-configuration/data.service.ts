import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

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
  private _typeCategory = new BehaviorSubject<string>('ASSET');
  public selectType(type:string){
    this._typeCategory.next(type)
  }
  public watchType():Observable<string>{
    return this._typeCategory.asObservable()
  }
  constructor() {}
}

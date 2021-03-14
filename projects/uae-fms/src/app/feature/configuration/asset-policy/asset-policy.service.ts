import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetPolicyEditFormService {
  private _editAssetPolicy$ = new Subject<any>();
  constructor() {}

  public load(data:any) {
    this._editAssetPolicy$.next(data);
  }
  public get(): Observable<any> {
    return this._editAssetPolicy$.asObservable();
  }
}
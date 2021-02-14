import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessoryService {
  private _addAccessory$ = new Subject<boolean>();

  public loadAddForm(open: boolean) {
    this._addAccessory$.next(open);
  }
  public getAddForm(): Observable<boolean> {
    return this._addAccessory$.asObservable();
  }
  constructor() {}
}

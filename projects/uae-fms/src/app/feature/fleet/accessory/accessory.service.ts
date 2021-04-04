import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ResponseBody } from '@models/responseBody';
import { IUser } from '@models/configuration';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';

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

  constructor(private _http: HttpClient) {}
}

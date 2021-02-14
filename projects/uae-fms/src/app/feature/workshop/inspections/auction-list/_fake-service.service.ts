import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FakeServiceAuctionList {
  private _showEditList$ = new Subject<boolean>();

  public loadEdit(open: boolean) {
    this._showEditList$.next(open);
  }
  public getEdit(): Observable<boolean> {
    return this._showEditList$.asObservable();
  }
  constructor() {}
}

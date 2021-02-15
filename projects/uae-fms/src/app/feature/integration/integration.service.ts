import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {
  private _addIntegration$ = new Subject<boolean>();
  constructor() {}

  public loadInegrationForm(open: boolean) {
    this._addIntegration$.next(open);
  }
  public getIntegrationForm(): Observable<boolean> {
    return this._addIntegration$.asObservable();
  }
}

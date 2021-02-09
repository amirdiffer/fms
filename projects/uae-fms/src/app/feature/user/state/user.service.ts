import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IUserProfileModel } from './user.entity';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor() { }

  private _userData$ = new Subject<IUserProfileModel[]>();

  public loadUserData(data){
    this._userData$.next(data)
  }
  public getUserData (): Observable<IUserProfileModel[]>{
    return this._userData$.asObservable();
  }
}

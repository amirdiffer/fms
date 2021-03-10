import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ResponseBody } from '@models/responseBody';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { IProfile } from '@models/profile';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  constructor(private http: HttpClient) {}

  loadProfile(): Observable<ResponseBody<IProfile>> {
    return this.http.get<ResponseBody<IProfile>>(
      environment.baseApiUrl + 'profile'
    );
  }

}

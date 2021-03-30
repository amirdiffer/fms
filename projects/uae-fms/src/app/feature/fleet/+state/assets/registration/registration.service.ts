import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/responseBody';
import { IPendingRegistration } from '@models/pending-registration.model';

@Injectable()
export class RegistrationService {
  constructor(private _http: HttpClient) {}

  loadAll(): Observable<ResponseBody<IPendingRegistration[]>> {
    return this._http.get<ResponseBody<IPendingRegistration[]>>(
      environment.baseApiUrl + 'asset/registration'
    );
  }
}

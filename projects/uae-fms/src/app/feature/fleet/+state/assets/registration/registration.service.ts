import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRegistrationModel } from '@feature/fleet/+state/assets/registration/registration.entity';

@Injectable()
export class RegistrationService {
  constructor(private _http: HttpClient) {}

  loadAll(): Observable<IRegistrationModel[]> {
    return this._http.get<IRegistrationModel[]>('');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrganizationStateModel } from './organization.entity';

@Injectable()
export class OrganizationService {
  constructor(private _http: HttpClient) {}

  loadAll(): Observable<OrganizationStateModel[]> {
    return this._http.get<OrganizationStateModel[]>('');
  }
}

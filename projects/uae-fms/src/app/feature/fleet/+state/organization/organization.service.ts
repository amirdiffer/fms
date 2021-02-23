import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseBody } from '@models/responseBody';
import { IOrganization } from '@models/organization';
import { environment } from '@environments/environment';

@Injectable()
export class OrganizationService {
  constructor(private _http: HttpClient) {}

  loadAll(): Observable<ResponseBody<IOrganization[]>> {
    return this._http.get<ResponseBody<IOrganization[]>>(
      environment.baseApiUrl + 'organization'
    );
  }
}

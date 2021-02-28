import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRole } from '@models/configuration';
import { ResponseBody } from '@models/response-body';
import { environment } from '@environments/environment';

@Injectable()
export class RolePermissionService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<ResponseBody<IRole[]>> {
    return this.http.get<ResponseBody<IRole[]>>(
      environment.baseApiUrl + 'configuration/role'
    );
  }
}

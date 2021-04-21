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
  addNewRole(data): Observable<ResponseBody<IRole>> {
    return this.http.post<ResponseBody<IRole>>(
      environment.baseApiUrl + 'configuration/role',
      data
    );
  }

  updateRole(data): Observable<ResponseBody<IRole>> {
    return this.http.post<ResponseBody<IRole>>(
      environment.baseApiUrl + 'configuration/role/' + data.id + '/update',
      data
    );
  }

  getRoleByRoleID(roleId){
    return this.http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'configuration/role/' + roleId
    )
  }
}

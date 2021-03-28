import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RolePermissionStateModel } from './role-permission.entity';

@Injectable()
export class RolePermissionService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<RolePermissionStateModel[]> {
    return this.http.get<RolePermissionStateModel[]>('');
  }
}

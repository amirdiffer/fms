import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dashboard } from '@models/dashboard';

@Injectable()
export class DashboardService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<Dashboard> {
    return this.http.get<Dashboard>('');
  }
}

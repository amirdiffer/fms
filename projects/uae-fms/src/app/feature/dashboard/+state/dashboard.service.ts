import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardState } from './dashboard.entity';

@Injectable()
export class DashboardService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<DashboardState> {
    return this.http.get<DashboardState>('');
  }
}

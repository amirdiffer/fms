import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FleetStatusStateModel } from './fleet-status.entity';

@Injectable()
export class FleetStatusService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<FleetStatusStateModel[]> {
    return this.http.get<FleetStatusStateModel[]>('');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrafficFineTableStateModel } from './traffic-fine-table.entity';

@Injectable()
export class TrafficFineTableService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<TrafficFineTableStateModel[]> {
    return this.http.get<TrafficFineTableStateModel[]>('');
  }
}

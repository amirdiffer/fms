import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovementOverviewStateModel } from './movement-overview.entity';

@Injectable()
export class MovementOverviewService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<MovementOverviewStateModel[]> {
    return this.http.get<MovementOverviewStateModel[]>('');
  }
}

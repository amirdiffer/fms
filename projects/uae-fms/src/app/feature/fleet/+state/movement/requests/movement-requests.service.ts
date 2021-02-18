import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovementRequestsStateModel } from './movement-requests.entity';

@Injectable()
export class MovementRequestsService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<MovementRequestsStateModel[]> {
    return this.http.get<MovementRequestsStateModel[]>('');
  }
}

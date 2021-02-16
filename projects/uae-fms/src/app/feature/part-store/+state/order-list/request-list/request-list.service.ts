import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestListStateModel } from './request-list.entity';

@Injectable()
export class RequestListService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<RequestListStateModel[]> {
    return this.http.get<RequestListStateModel[]>('');
  }
}

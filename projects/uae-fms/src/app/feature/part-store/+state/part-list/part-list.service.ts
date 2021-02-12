import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PartListStateModel } from './part-list.entity';

@Injectable()
export class PartListService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<PartListStateModel[]> {
    return this.http.get<PartListStateModel[]>('');
  }
}

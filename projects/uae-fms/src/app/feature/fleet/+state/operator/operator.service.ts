import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOperatorStateModel } from './operator.entity';

@Injectable()
export class OperatorService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<IOperatorStateModel[]> {
    return this.http.get<IOperatorStateModel[]>('');
  }
}
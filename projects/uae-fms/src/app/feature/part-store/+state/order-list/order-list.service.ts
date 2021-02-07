import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderListStateModel } from './order-list.entity';

@Injectable()
export class OrderListService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<OrderListStateModel[]> {
    return this.http.get<OrderListStateModel[]>('');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMyOrderListModel } from '@feature/part-store/+state/order-list/my-order/my-order.entity';

@Injectable()
export class MyOrderService {
  constructor(private _http: HttpClient) {}

  loadAll(): Observable<IMyOrderListModel[]> {
    return this._http.get<IMyOrderListModel[]>('');
  }
}

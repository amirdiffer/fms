import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISuppliersListModel } from '@feature/part-store/+state/order-list/suppliers/suppliers.entity';

@Injectable()
export class SuppliersService {
  constructor(private _http: HttpClient) {}

  loadAll(): Observable<ISuppliersListModel[]> {
    return this._http.get<ISuppliersListModel[]>('');
  }
}

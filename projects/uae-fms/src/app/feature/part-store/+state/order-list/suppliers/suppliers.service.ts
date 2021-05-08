import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISuppliersListModel } from '@feature/part-store/+state/order-list/suppliers/suppliers.entity';
import { ResponseBody } from '@models/responseBody';
import { environment } from '@environments/environment';

@Injectable()
export class SuppliersService {
  constructor(private _http: HttpClient) {}

  loadAll(): Observable<ISuppliersListModel[]> {
    return this._http.get<ISuppliersListModel[]>('');
  }

  loadAllSupplier():Observable<ResponseBody<any[]>>{
    return this._http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + 'partstore/supplier'
    )
  }

}

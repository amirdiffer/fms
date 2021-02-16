import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISoldListModel } from '@feature/workshop/+state/auction-list/sold/sold-list.entity';

@Injectable()
export class SoldListService {
  constructor(private _http: HttpClient) {}

  loadAll(): Observable<ISoldListModel[]> {
    return this._http.get<ISoldListModel[]>('');
  }
}

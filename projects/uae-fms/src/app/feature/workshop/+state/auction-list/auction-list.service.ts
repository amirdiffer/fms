import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { IAuctionListModel } from './auction-list.entity';

@Injectable()
export class AuctionListService {
  constructor(private _http: HttpClient) { }

  loadAll(): Observable<IAuctionListModel[]> {
    return this._http.get<IAuctionListModel[]>('');
  }
}

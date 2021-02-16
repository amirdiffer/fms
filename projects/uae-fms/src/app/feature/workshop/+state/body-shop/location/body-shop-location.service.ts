import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBodyShopLocationStateModel } from './body-shop-location.entity';

@Injectable()
export class BodyShopLocationService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<IBodyShopLocationStateModel[]> {
    return this.http.get<IBodyShopLocationStateModel[]>('');
  }
}

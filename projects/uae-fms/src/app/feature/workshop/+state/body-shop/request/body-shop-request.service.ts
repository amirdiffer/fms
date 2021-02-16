import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BodyshopRequestStateModel } from './body-shop-request.entity';

@Injectable()
export class BodyShopRequestService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<BodyshopRequestStateModel[]> {
    return this.http.get<BodyshopRequestStateModel[]>('');
  }
}

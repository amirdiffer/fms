import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBodyshopJobCardStateModel } from './body-shop-job-card.entity';

@Injectable()
export class BodyShopJobCardService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<IBodyshopJobCardStateModel[]> {
    return this.http.get<IBodyshopJobCardStateModel[]>('');
  }
}

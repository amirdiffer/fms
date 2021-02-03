import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { BodyshopStateModel } from "./body-shop.entity";

@Injectable()
export class BodyShopService {
  constructor(private http: HttpClient) { }

  loadAll(): Observable<BodyshopStateModel[]> {
    return this.http.get<BodyshopStateModel[]>('');
  }
}

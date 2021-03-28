import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBodyShopTechnicianStateModel } from './body-shop-technician.entity';

@Injectable()
export class BodyShopTechnicianService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<IBodyShopTechnicianStateModel[]> {
    return this.http.get<IBodyShopTechnicianStateModel[]>('');
  }
}

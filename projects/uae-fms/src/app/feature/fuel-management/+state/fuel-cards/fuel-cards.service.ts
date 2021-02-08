import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FuelCardsStateModel } from './fuel-cards.entity';

@Injectable()
export class FuelCardsService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<FuelCardsStateModel[]> {
    return this.http.get<FuelCardsStateModel[]>('');
  }
}

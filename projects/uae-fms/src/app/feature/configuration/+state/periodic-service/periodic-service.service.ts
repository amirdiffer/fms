import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeriodicServiceStateModel } from './periodic-service.entity';

@Injectable()
export class PeriodicServiceService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<PeriodicServiceStateModel[]> {
    return this.http.get<PeriodicServiceStateModel[]>('');
  }
}

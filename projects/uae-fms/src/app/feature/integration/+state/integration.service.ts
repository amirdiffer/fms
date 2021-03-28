import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IntegrationStateModel } from './integration.entity';

@Injectable()
export class IntegrationService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<IntegrationStateModel[]> {
    return this.http.get<IntegrationStateModel[]>('');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IIntegration } from '@models/integration';
import { environment } from '@environments/environment';

@Injectable()
export class IntegrationService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<IIntegration[]> {
    return this.http.get<IIntegration[]>(
      environment.baseApiUrl + 'configuration/integrations'
    );
  }
}

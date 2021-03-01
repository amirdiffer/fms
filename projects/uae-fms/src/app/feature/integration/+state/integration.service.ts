import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IIntegration } from '@models/integration';
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/response-body';

@Injectable()
export class IntegrationService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<ResponseBody<IIntegration[]>> {
    return this.http.get<ResponseBody<IIntegration[]>>(
      environment.baseApiUrl + 'configuration/integrations'
    );
  }
}

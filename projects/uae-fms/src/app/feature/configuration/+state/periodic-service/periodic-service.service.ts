import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { IPeriodicService } from '@models/configuration';

@Injectable()
export class PeriodicServiceService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<IPeriodicService[]> {
    return this.http.get<IPeriodicService[]>(
      environment.baseApiUrl + 'configuration/periodic-service'
    );
  }
}

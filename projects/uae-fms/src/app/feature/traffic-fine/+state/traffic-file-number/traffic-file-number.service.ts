import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment.prod';

@Injectable({providedIn: 'root'})
export class TrafficFileNumberService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.httpClient.get(environment.baseApiUrl + '');
  }

  addTrafficFile(data: any): Observable<any> {
    return this.httpClient.post(environment.baseApiUrl + 'traffic-fine/traffic-number', data);
  }

  updateTrafficFile(id: number, data: any): Observable<any> {
    return this.httpClient.post(environment.baseApiUrl + 'traffic-fine/traffic-number/' + id, data);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITrafficFine } from '@models/traffic-fine';
import { environment } from '@environments/environment';

@Injectable()
export class TrafficFineTableService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<ITrafficFine[]> {
    return this.http.get<ITrafficFine[]>(
      environment.baseApiUrl + 'traffic-fine'
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TollStateModel } from './toll.entity';
import { environment } from '@environments/environment';

@Injectable()
export class TollService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<TollStateModel[]> {
    return this.http.get<TollStateModel[]>(environment.baseApiUrl + 'toll');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOwnerShip } from '@models/configuration';
import { environment } from '@environments/environment';

@Injectable()
export class OwnershipService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<IOwnerShip[]> {
    return this.http.get<IOwnerShip[]>(
      environment.baseApiUrl + 'configuration/ownership'
    );
  }
}

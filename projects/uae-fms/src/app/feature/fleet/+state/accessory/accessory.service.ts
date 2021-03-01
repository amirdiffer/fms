import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAccessoryStateModel } from './accessory.entity';
import { environment } from '@environments/environment';
import { IAccessoryStatistics } from '@models/statistics';

@Injectable()
export class AccessoryService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<IAccessoryStateModel[]> {
    return this.http.get<IAccessoryStateModel[]>('');
  }

  loadStatistics(): Observable<IAccessoryStatistics> {
    return this.http.get<IAccessoryStatistics>(
      environment.baseApiUrl + 'accessory/stats'
    );
  }
}

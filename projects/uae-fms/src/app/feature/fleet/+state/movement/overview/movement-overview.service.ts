import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovementOverviewStateModel } from './movement-overview.entity';
import { ResponseBody } from '@models/response-body';
import { IOwnerShip } from '@models/configuration';
import { environment } from '@environments/environment';

@Injectable()
export class MovementOverviewService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<MovementOverviewStateModel[]> {
    return this.http.get<MovementOverviewStateModel[]>(
      environment.baseApiUrl + 'movement/permanent/overview'
    );
  }

}

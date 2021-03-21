import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { IFuelManagementFuelCard } from '@models/fuel-management';
import { ResponseBody } from '@models/responseBody';
import { IFuelManagementStatistics } from '@models/statistics';

@Injectable()
export class FuelCardsService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<ResponseBody<IFuelManagementFuelCard[]>> {
    return this.http.get<ResponseBody<IFuelManagementFuelCard[]>>(
      environment.baseApiUrl + 'fuel-management/card'
    );
  }
  loadAllStatistics(): Observable<ResponseBody<IFuelManagementStatistics>> {
    return this.http.get<ResponseBody<IFuelManagementStatistics>>(
      environment.baseApiUrl + 'fuel-management/stats'
    );
  }

  addFuelCard(data): Observable<ResponseBody<IFuelManagementFuelCard>> {
    return this.http.post<ResponseBody<IFuelManagementFuelCard>>(
      environment.baseApiUrl + 'fuel-management/card',
      data
    );
  }
}

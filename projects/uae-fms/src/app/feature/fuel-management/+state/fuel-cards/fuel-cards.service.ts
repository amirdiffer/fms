import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { IFuelManagementFuelCard } from '@models/fuel-management';
import { ResponseBody } from '@models/responseBody';

@Injectable()
export class FuelCardsService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<ResponseBody<IFuelManagementFuelCard[]>> {
    return this.http.get<ResponseBody<IFuelManagementFuelCard[]>>(
      environment.baseApiUrl + 'fuel-management/card'
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '@environments/environment';
import { IFuelManagementFuelCard } from '@models/fuel-management';
import { ResponseBody } from '@models/responseBody';
import { IFuelManagementStatistics } from '@models/statistics';

@Injectable()
export class FuelCardsService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<ResponseBody<IFuelManagementFuelCard[]>> {
    /* return this.http.get<ResponseBody<IFuelManagementFuelCard[]>>(
      environment.baseApiUrl + 'fuel-management/card'
    ); */
    return of({
      error: false,
      resultNumber: 6,
      message: [
        {
          id: 1,
          tagNo: {
            tagNo: 'test data',
            data: [
              {
                litters: 'test data',
                km: 'test data',
                day: 'test data',
                date: 'test data',
                time: 'test data'
              },
              {
                litters: 'test data',
                km: 'test data',
                day: 'test data',
                date: 'test data',
                time: 'test data'
              },
              {
                litters: 'test data',
                km: 'test data',
                day: 'test data',
                date: 'test data',
                time: 'test data'
              }
            ]
          },
          used: 'test data',
          usageLimit: 'test data',
          asset: 'test data',
          cardType: 'test data',
          expire: 'test data',
          statusColor: '#B892FF'
        },
        {
          id: 2,
          tagNo: {
            tagNo: 'test data',
            data: [
              {
                litters: 'test data',
                km: 'test data',
                day: 'test data',
                date: 'test data',
                time: 'test data'
              },
              {
                litters: 'test data',
                km: 'test data',
                day: 'test data',
                date: 'test data',
                time: 'test data'
              },
              {
                litters: 'test data',
                km: 'test data',
                day: 'test data',
                date: 'test data',
                time: 'test data'
              }
            ]
          },
          used: 'test data',
          usageLimit: 'test data',
          asset: 'test data',
          cardType: 'test data',
          expire: 'test data',
          statusColor: '#B892FF'
        },
        {
          id: 3,
          tagNo: {
            tagNo: 'test data',
            data: [
              {
                litters: 'test data',
                km: 'test data',
                day: 'test data',
                date: 'test data',
                time: 'test data'
              },
              {
                litters: 'test data',
                km: 'test data',
                day: 'test data',
                date: 'test data',
                time: 'test data'
              },
              {
                litters: 'test data',
                km: 'test data',
                day: 'test data',
                date: 'test data',
                time: 'test data'
              }
            ]
          },
          used: 'test data',
          usageLimit: 'test data',
          asset: 'test data',
          cardType: 'test data',
          expire: 'test data',
          statusColor: '#B892FF'
        },
        {
          id: 4,
          tagNo: {
            tagNo: 'test data',
            data: [
              {
                litters: 'test data',
                km: 'test data',
                day: 'test data',
                date: 'test data',
                time: 'test data'
              },
              {
                litters: 'test data',
                km: 'test data',
                day: 'test data',
                date: 'test data',
                time: 'test data'
              },
              {
                litters: 'test data',
                km: 'test data',
                day: 'test data',
                date: 'test data',
                time: 'test data'
              }
            ]
          },
          used: 'test data',
          usageLimit: 'test data',
          asset: 'test data',
          cardType: 'test data',
          expire: 'test data',
          statusColor: '#B892FF'
        },
        {
          id: 5,
          tagNo: {
            tagNo: 'test data',
            data: [
              {
                litters: 'test data',
                km: 'test data',
                day: 'test data',
                date: 'test data',
                time: 'test data'
              },
              {
                litters: 'test data',
                km: 'test data',
                day: 'test data',
                date: 'test data',
                time: 'test data'
              },
              {
                litters: 'test data',
                km: 'test data',
                day: 'test data',
                date: 'test data',
                time: 'test data'
              }
            ]
          },
          used: 'test data',
          usageLimit: 'test data',
          asset: 'test data',
          cardType: 'test data',
          expire: 'test data',
          statusColor: '#B892FF'
        },
        {
          id: 6,
          tagNo: {
            tagNo: 'test data',
            data: [
              {
                litters: 'test data',
                km: 'test data',
                day: 'test data',
                date: 'test data',
                time: 'test data'
              },
              {
                litters: 'test data',
                km: 'test data',
                day: 'test data',
                date: 'test data',
                time: 'test data'
              },
              {
                litters: 'test data',
                km: 'test data',
                day: 'test data',
                date: 'test data',
                time: 'test data'
              }
            ]
          },
          used: 'test data',
          usageLimit: 'test data',
          asset: 'test data',
          cardType: 'test data',
          expire: 'test data',
          statusColor: '#B892FF'
        }
      ]
    });
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

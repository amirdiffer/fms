import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IAssetUsageStateModel } from './asset-usage.entity';
import { ResponseBody } from '@models/responseBody';

@Injectable()
export class AssetUsageService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<ResponseBody<IAssetUsageStateModel[]>> {
    // return this.http.get<IAssetUsageStateModel[]>('');
    return of({
      error: false,
      resultNumber: 6,
      message: [
        {
          id: 1,
          asset: {
            assetName: 'test data',
            assetSubName: 'test data',
            ownership: 'test data',
            img: 'test data'
          },
          plateNumber: 'test data',
          tageNo: 'test data',
          date: 'test data',
          amount: 'test data',
          mileage: 'test data',
          totalUsage: 'test data',
          cost: 'test data',
          cardType: 'test data'
        },
        {
          id: 2,
          asset: {
            assetName: 'test data',
            assetSubName: 'test data',
            ownership: 'test data',
            img: 'test data'
          },
          plateNumber: 'test data',
          tageNo: 'test data',
          date: 'test data',
          amount: 'test data',
          mileage: 'test data',
          totalUsage: 'test data',
          cost: 'test data',
          cardType: 'test data'
        },
        {
          id: 3,
          asset: {
            assetName: 'test data',
            assetSubName: 'test data',
            ownership: 'test data',
            img: 'test data'
          },
          plateNumber: 'test data',
          tageNo: 'test data',
          date: 'test data',
          amount: 'test data',
          mileage: 'test data',
          totalUsage: 'test data',
          cost: 'test data',
          cardType: 'test data'
        },
        {
          id: 4,
          asset: {
            assetName: 'test data',
            assetSubName: 'test data',
            ownership: 'test data',
            img: 'test data'
          },
          plateNumber: 'test data',
          tageNo: 'test data',
          date: 'test data',
          amount: 'test data',
          mileage: 'test data',
          totalUsage: 'test data',
          cost: 'test data',
          cardType: 'test data'
        },
        {
          id: 5,
          asset: {
            assetName: 'test data',
            assetSubName: 'test data',
            ownership: 'test data',
            img: 'test data'
          },
          plateNumber: 'test data',
          tageNo: 'test data',
          date: 'test data',
          amount: 'test data',
          mileage: 'test data',
          totalUsage: 'test data',
          cost: 'test data',
          cardType: 'test data'
        },
        {
          id: 6,
          asset: {
            assetName: 'test data',
            assetSubName: 'test data',
            ownership: 'test data',
            img: 'test data'
          },
          plateNumber: 'test data',
          tageNo: 'test data',
          date: 'test data',
          amount: 'test data',
          mileage: 'test data',
          totalUsage: 'test data',
          cost: 'test data',
          cardType: 'test data'
        }
      ]
    });
  }
}

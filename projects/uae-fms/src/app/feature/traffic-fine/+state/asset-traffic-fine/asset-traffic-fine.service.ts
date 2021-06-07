import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '@environments/environment';
import { IAssetTrafficFine, ITrafficFine } from '@models/traffic-fine';
import { ResponseBody } from '@models/response-body';

@Injectable()
export class AssetTrafficFineService {
  constructor(private http: HttpClient) {}

  data: IAssetTrafficFine[] = this.returnMockData();

  returnMockData(): IAssetTrafficFine[] {
    let d: IAssetTrafficFine[] = [];
    for (let i = 1; i < 8; i++) {
      d.push(
        {
          amount: i,
          asset: { dpd: 'test data', id: i },
          businessCategoryId: i,
          dpd: 'test data',
          id: 0,
          operator: { firstName: 'test data', id: i, lastName: 'test data' },
          ownershipId: i,
          plateNumber: 'test data',
          status: 'test data',
          totalFines: i,
          type: 'test data'
        },
      )
    }
    return d;
  }

  loadAll(): Observable<ResponseBody<IAssetTrafficFine[]>> {
    // return this.http.get<ResponseBody<IAssetTrafficFine[]>>(
    //   environment.baseApiUrl + 'traffic-fine/asset'
    // );
    return of({
      error: false,
      resultNumber: this.returnMockData().length,
      message: this.returnMockData()
    })
  }
}

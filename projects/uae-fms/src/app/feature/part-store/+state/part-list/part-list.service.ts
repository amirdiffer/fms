import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PartListStateModel } from './part-list.entity';
import { environment } from '@environments/environment';
import { tap } from 'rxjs/operators';
import { TableFacade } from '@core/table/+state/table.facade';
import { IPartListStatistics } from '@models/statistics';

@Injectable()
export class PartListService {
  params = new HttpParams();

  constructor(private http: HttpClient, private _tableFacade: TableFacade) {}

  getParam(name) {
    this._tableFacade.getPaginationByName(name).subscribe((x) => {
      if (x != null) {
        this.params = this.params
          .set('page', x.page.toString())
          .set('sort', 'item_id')
          .set('size', x.ipp.toString());
      }
    });
    return this.params;
  }

  loadAllAsset(): Observable<any> {
    // return this.http.get<any>(environment.baseApiUrl + 'partstore/part-list/asset/accumulated' , {params: this.getParam('accumulated')})
    //   .pipe(
    //     tap(res => console.log(res))
    //   )
    return this.http
      .get<any>(environment.baseApiUrl + '/partstore/part-list/asset/item/1', {
        params: this.getParam('accumulated')
      })
      .pipe(tap((res) => console.log(res)));
    // return this.http.get<any>(environment.baseApiUrl + '/partstore/part-list/asset/stats')
    //   .pipe(
    //     tap(res => console.log(res))
    //   )
  }

  loadAllSubAsset(): Observable<any> {
    return this.http
      .get<any>(
        environment.baseApiUrl + '/partstore/part-list/sub-asset/accumulated',
        { params: this.getParam('accumulated') }
      )
      .pipe(tap((res) => console.log(res)));
  }

  loadAssetStatistics(): Observable<IPartListStatistics> {
    return this.http
      .get<IPartListStatistics>(
        environment.baseApiUrl + '/partstore/part-list/asset/stats'
      )
      .pipe(tap((res) => console.log(res)));
  }

  loadSubAssetStatistics(): Observable<IPartListStatistics> {
    return this.http
      .get<IPartListStatistics>(
        environment.baseApiUrl + '/partstore/part-list/sub-asset/stats'
      )
      .pipe(tap((res) => console.log(res)));
  }
}

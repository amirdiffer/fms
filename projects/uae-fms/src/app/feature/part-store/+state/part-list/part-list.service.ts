import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { TableFacade } from '@core/table/+state/table.facade';
import { ResponseBody } from '@models/responseBody';
import { IPartListStatistics } from '@models/statistics';

@Injectable()
export class PartListService {
  params = new HttpParams();

  constructor(private _http: HttpClient, private _tableFacade: TableFacade) {}

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
  };

  /* Asset Part */

  getAccumulatedPartOfAsset(id): Observable<ResponseBody<any>>{
    return this._http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + 'partstore/part-list/asset/category/' + id +'/accumulated' ,{params: this.getParam('asset-accumulated-part-list')}
    )
  };

  getPartListOfAsset(id): Observable<ResponseBody<any>>{
    return this._http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + 'partstore/part-list/asset/item/' + id , {params: this.getParam('part-list-item')}
    )
  };

  getSpecificPartOfAsset(id):Observable<ResponseBody<any>>{
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/part-list/asset/part/' + id
    )
  };

  updatePartOfAsset(data): Observable<ResponseBody<any>> {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/part-list/asset/part/' + data.id + '/update',
      data
    );
  };


  /* Sub Asset Part */

  getAccumulatedPartOfSubAsset(id): Observable<ResponseBody<any>>{
    return this._http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + 'partstore/part-list/sub-asset/category/'+ id+'/accumulated' , {params: this.getParam('subasset-accumulated-part-list')}
    )
  };

  getPartListOfSubAsset(id): Observable<ResponseBody<any>>{
    return this._http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + 'partstore/part-list/sub-asset/item/' + id , {params: this.getParam('part-list-item')}
    )
  };

  getSpecificPartOfSubAsset(id):Observable<ResponseBody<any>>{
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/part-list/sub-asset/part/' + id
    )
  };

  updatePartOfSubAsset(data): Observable<ResponseBody<any>> {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/part-list/sub-asset/part/' + data.id + '/update',
      data
    );
  };

  getStatisticsPartOfAsset(id):Observable<ResponseBody<IPartListStatistics>>{
    return this._http.get<ResponseBody<IPartListStatistics>>(
      environment.baseApiUrl + 'partstore/part-list/asset/category/'+id+'/stats'
    )
  };

  getStatisticsPartOfSubAsset(id):Observable<ResponseBody<IPartListStatistics>>{
    return this._http.get<ResponseBody<IPartListStatistics>>(
      environment.baseApiUrl + 'partstore/part-list/sub-asset/category/'+id+'/stats'
    )
  };

}

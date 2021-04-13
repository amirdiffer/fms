import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/response-body';
import { IJobCard } from '@models/body-shop';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class BodyShopJobCardService {
  constructor(private http: HttpClient, private _tableFacade: TableFacade) {}

  params = new HttpParams();
  getParam(name) {
    this._tableFacade.getPaginationByName(name).subscribe(x => {
      if (x != null) {
        this.params = this.params.set('page', x.page.toString())
          .set('size', x.ipp.toString());
      }
    });
    return this.params;
  }

  loadAll(): Observable<ResponseBody<IJobCard[]>> {
    return this.http.get<ResponseBody<IJobCard[]>>(
      environment.baseApiUrl + 'workshop/bodyshop/jobcard', {params: this.getParam('body-shop_jobcard')}
    );
  }
  post(data, assetId): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'workshop/bodyshop/jobcard/asset/' + assetId,
      data
    );
  }

  editJobCard(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl +
        'workshop/bodyshop/jobcard/' +
        data.id +
        '/update',
      data
    );
  }
  getJobCardById(id) {
    return this.http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'workshop/bodyshop/jobcard/' + id
    );
  }
  getAllAssethasJobCard(): Observable<ResponseBody<any[]>>{
    return this.http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + 'workshop/bodyshop/asset/request?page=0&sort=createdAt,desc&size=10000'
    );
  }
}


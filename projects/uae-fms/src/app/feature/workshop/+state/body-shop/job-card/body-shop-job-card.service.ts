import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/response-body';
import { IJobCard } from '@models/body-shop';
import { TableFacade } from '@core/table/+state/table.facade';
import { TableFilterService } from '@core/table/table-filter/table-filter.service';

@Injectable()
export class BodyShopJobCardService {
  constructor(
    private http: HttpClient,
    private _tableFacade: TableFacade,
    private _tblFilterService: TableFilterService
  ) {}

  params = new HttpParams();
  getParam(name) {
    this._tableFacade.getPaginationByName(name).subscribe((x) => {
      if (x != null) {
        this.params = this.params
          .set('page', x.page.toString())
          .set('size', x.ipp.toString());
      }
    });
    return this.params;
  }

  getFilter() {
    let removeFilterKey = [];
    this._tableFacade.getFiltersByName('bodyShop_jobCard').subscribe((x) => {
      let filter = '';
      if (x != null) {
        let value: object[] = x.value ? Object.values(x.value) : [];
        value.forEach((y) => {
          if (y['value'] && y['value'] != '') {
            let filterApiKey = y['filterApiKey']
              ? y['filterApiKey']
              : y['name'];
            if (!removeFilterKey.includes(filterApiKey)) {
              let b = this._tblFilterService.convertData(y);
              filter = filter + b + ';';
            }
          }
        });
      }
      this.params = this.params.set('filter', filter);
    });
  }

  loadAll(): Observable<ResponseBody<IJobCard[]>> {
    this.getFilter();
    return this.http.get<ResponseBody<IJobCard[]>>(
      environment.baseApiUrl + 'workshop/bodyshop/jobcard',
      { params: this.getParam('body-shop_jobcard') }
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

  getAssetActiveJobCard(id: number): Observable<ResponseBody<any[]>> {
    return this.http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + `workshop/bodyshop/jobcard/asset/${id}`
    );
  }

  getAllAssethasJobCard(): Observable<ResponseBody<any[]>> {
    return this.http.get<ResponseBody<any[]>>(
      environment.baseApiUrl +
        'workshop/bodyshop/asset/request?page=0&sort=createdAt,desc&size=10000'
    );
  }

  getAllRequests(id) {
    return this.http.get(
      environment.baseApiUrl + 'workshop/serviceshop/jobcard/asset/' + id
    );
  }

  getAllActiveJobcards(id) {
    return this.http.get(
      environment.baseApiUrl + 'workshop/serviceshop/jobcard/asset/' + id
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { IBusinessCategory } from '@models/business-category.model';
import { ResponseBody } from '@models/response-body.model';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class BusinessCategoryService {
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

  loadAll(): Observable<ResponseBody<IBusinessCategory[]>> {
    return this.http.get<ResponseBody<IBusinessCategory[]>>(
      environment.baseApiUrl + 'configuration/business-category', {params: this.getParam('business-category')}
    );
  }

  getOne(id: number): Observable<ResponseBody<IBusinessCategory>> {
    return this.http.get<ResponseBody<IBusinessCategory>>(
      environment.baseApiUrl + 'configuration/business-category/' + id
    );
  }

  post(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'configuration/business-category',
      data
    );
  }

  editCategory(data: any): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl +
        'configuration/business-category/' +
        data.id +
        '/update',
      data
    );
  }
}

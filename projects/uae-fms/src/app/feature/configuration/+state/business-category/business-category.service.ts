import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { IBusinessCategory } from '@models/business-category.model';
import { ResponseBody } from '@models/response-body.model';

@Injectable()
export class BusinessCategoryService {
  constructor(private http: HttpClient) { }

  loadAll(): Observable<ResponseBody<IBusinessCategory[]>> {
    return this.http.get<ResponseBody<IBusinessCategory[]>>(
      environment.baseApiUrl + 'configuration/business-category'
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

  editCategory(data: any, id): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl +
      'configuration/business-category/' +
      id +
      '/update',
      data
    );
  }
}

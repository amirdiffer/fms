import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/responseBody';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class PartMasterService {
  constructor(private _http: HttpClient) {}


  /* Category Of Asset */

  getCategoryOfAsset(id){
    return this._http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + 'partstore/part-master/asset/category/configuration/' + id
    )
  }

  getSpecificCategoryOfAsset(id){
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/part-master/asset/category/' + id
    )
  }


  updateCategoryOfAsset(data): Observable<ResponseBody<any>> {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/part-master/asset/category/' + data.id + '/update',
      data
    );
  }





  /* Category Of Sub Asset */
  
  getCategoryOfSubAsset(id){
    return this._http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + 'partstore/part-master/sub-asset/category/configuration/' + id
    )
  }

  getSpecificCategoryOfSubAsset(id){
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/part-master/sub-asset/category/' + id
    )
  }

  updateCategoryOfSubAsset(data): Observable<ResponseBody<any>> {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/part-master/sub-asset/category/' + data.id + '/update',
      data
    );
  }



  /* Item Of Asset */
  getItemOfAsset(id){
    return this._http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + 'partstore/part-master/asset/category/' + id
    )
  }

  getSpecificItemOfAsset(id){
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/part-master/asset/item/' + id
    )
  }

  addItemOfAsset(data): Observable<ResponseBody<any>> {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/part-master/asset/item',
      data
    );
  }

  updateItemOfAsset(data): Observable<ResponseBody<any>> {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/part-master/asset/item/' + data.id + '/update',
      data
    );
  }



  /* Item Of Sub Asset */

  getItemOfSubAsset(id){
    return this._http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + 'partstore/part-master/sub-asset/category/' + id
    )
  }

  getSpecificItemOfSubAsset(id){
    return this._http.get<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/part-master/sub-asset/item/' + id
    )
  }

  addItemOfSubAsset(data): Observable<ResponseBody<any>> {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/part-master/sub-asset/item',
      data
    );
  }

  updateItemOfSubAsset(data): Observable<ResponseBody<any>> {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/part-master/sub-asset/item/' + data.id + '/update',
      data
    );
  }

  /* Add Sub Asset and Asset Category */
  addCategory(data): Observable<ResponseBody<any>> {
    return this._http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'partstore/part-master/category',
      data
    );
  }

  
  private addCategory$ = new BehaviorSubject(null);

  public getCategoryData (){
    return this.addCategory$.asObservable()
  }
  public setCategoryData(data){
    return this.addCategory$.next(data)
  }
}

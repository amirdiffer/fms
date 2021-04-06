import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseBody } from '@models/response-body';
import { IUser } from '@models/configuration';
import { environment } from '@environments/environment';
import { IUserStatistics } from '@models/statistics';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class UsersService {
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

  loadAll(): Observable<ResponseBody<IUser[]>> {
    return this.http.get<ResponseBody<IUser[]>>(
      environment.baseApiUrl + 'configuration/user', {params: this.getParam('users')}
    );
  }

  loadAllStatistics(): Observable<ResponseBody<IUserStatistics>> {
    return this.http.get<ResponseBody<IUserStatistics>>(
      environment.baseApiUrl + 'configuration/user/stats'
    );
  }

  post(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'configuration/user',
      data
    );
  }

  editUser(data): Observable<ResponseBody<any>> {
    return this.http.post<ResponseBody<any>>(
      environment.baseApiUrl + 'configuration/user/' + data.id + "/update",
      data
    );
  }

  searchEmployee(id) {
    return this.http.get<ResponseBody<IUserStatistics>>(
      environment.baseApiUrl + 'configuration/user/employee/' + id
    );
  }

  getUserById(id) {
    return this.http.get<ResponseBody<IUser>>(
      environment.baseApiUrl + 'configuration/user/' + id
    );
  }
}

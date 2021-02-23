import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseBody } from '@models/responseBody';
import { IUser } from '@models/configuration';
import { environment } from '@environments/environment';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<ResponseBody<IUser[]>> {
    return this.http.get<ResponseBody<IUser[]>>(
      environment.baseApiUrl + 'configuration/user'
    );
  }
}

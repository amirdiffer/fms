import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITaskMasterModel } from './task-master.entity';
import { environment } from '@environments/environment';
import { ResponseBody } from '@models/responseBody';

@Injectable()
export class TaskMasterService {
  constructor(private _http: HttpClient) {}

  loadAll(): Observable<ResponseBody<any[]>> {
    return this._http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + 'workshop/taskmaster'
    );
  }

  skills(): Observable<ResponseBody<any[]>> {
    return this._http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + 'workshop/taskmaster/skill'
    );
  }

}

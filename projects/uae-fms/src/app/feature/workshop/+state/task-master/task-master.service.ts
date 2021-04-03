import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITaskMasterModel } from './task-master.entity';
import { ResponseBody } from '@models/responseBody';

@Injectable()
export class TaskMasterService {
  constructor(private _http: HttpClient) {}

  loadAll(): Observable<ITaskMasterModel[]> {
    return this._http.get<ITaskMasterModel[]>(
      environment.baseApiUrl + 'workshop/taskmaster'
    );
  }

  getTaskMaster(id: number) {
    return this._http.get<ITaskMasterModel[]>(
      environment.baseApiUrl + `workshop/taskmaster/${id}`
    );
  }

  addTaskMaster(data) {
    console.log({ taskMasterAdd: data });
    return this._http.post<ResponseBody<ITaskMasterModel>>(
      environment.baseApiUrl + 'workshop/taskmaster',
      data
    );
  }

  editTaskMaster(data) {
    console.log({ taskMasterEdit: data });
    const { id } = data;
    return this._http.post<ResponseBody<ITaskMasterModel>>(
      environment.baseApiUrl + `workshop/taskmaster/${id}/update`,
      data
    );
  }
}

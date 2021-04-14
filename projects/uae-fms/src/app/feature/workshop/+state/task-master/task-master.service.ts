import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITaskMasterModel } from './task-master.entity';
import { ResponseBody } from '@models/responseBody';
import { TableFacade } from '@core/table/+state/table.facade';

@Injectable()
export class TaskMasterService {
  constructor(private _http: HttpClient, private _tableFacade: TableFacade) {}

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

  loadAll(): Observable<ResponseBody<any[]>> {
    return this._http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + 'workshop/taskmaster', {params: this.getParam('taskmaster')}
    );
  }

  //   loadAll(): Observable<ITaskMasterModel[]> {
  //     return this._http.get<ITaskMasterModel[]>(
  //       environment.baseApiUrl + 'workshop/taskmaster'
  //     );
  //   }

  getTaskMaster(id: number) {
    return this._http.get<ITaskMasterModel[]>(
      environment.baseApiUrl + `workshop/taskmaster/${id}`
    );
  }

  addTaskMaster(data) {
    return this._http.post<ResponseBody<ITaskMasterModel>>(
      environment.baseApiUrl + 'workshop/taskmaster',
      data
    );
  }

  editTaskMaster(data) {
    const { id } = data;
    return this._http.post<ResponseBody<ITaskMasterModel>>(
      environment.baseApiUrl + `workshop/taskmaster/${id}/update`,
      data
    );
  }

  skills(): Observable<ResponseBody<any[]>> {
    return this._http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + 'workshop/taskmaster/skill'
    );
  }
  getAllTaks():Observable<ResponseBody<any[]>> {
    return this._http.get<ResponseBody<any[]>>(
      environment.baseApiUrl + 'workshop/taskmaster?page=0&sort=createdAt,desc&size=10000'
    );
  }
  
}

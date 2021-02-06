import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ITaskMasterModel } from './task-master.entity';


@Injectable()
export class TaskMasterService {
  constructor(private _http: HttpClient) { }

  loadAll(): Observable<ITaskMasterModel[]> {
    return this._http.get<ITaskMasterModel[]>('');
  }
}

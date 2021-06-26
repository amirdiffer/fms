import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseBody } from '@models/responseBody';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyTasksNetworkService {
  constructor(private httpClient: HttpClient) {}

  getMyTasks(type: TaskType = ''): Observable<ResponseBody<any>> {
    return this.httpClient.get<ResponseBody<any>>(
      environment.baseApiUrl + `technician/dashboard/task/${type}`
    );
  }

  startTaskWithId(id: number): Observable<ResponseBody<any>> {
    return this.httpClient.post<ResponseBody<any>>(
      environment.baseApiUrl + `technician/dashboard/task/${id}/time/start`,
      null
    );
  }

  resumeTaskWithId(id: number): Observable<ResponseBody<any>> {
    return this.httpClient.post<ResponseBody<any>>(
      environment.baseApiUrl + `technician/dashboard/task/${id}/time/resume`,
      null
    );
  }

  pauseTaskWithId(id: number): Observable<ResponseBody<any>> {
    return this.httpClient.post<ResponseBody<any>>(
      environment.baseApiUrl + `technician/dashboard/task/${id}/time/pause`,
      null
    );
  }

  completeTaskWithId(id: number): Observable<ResponseBody<any>> {
    return this.httpClient.post<ResponseBody<any>>(
      environment.baseApiUrl + `technician/dashboard/task/${id}/time/complete`,
      null
    );
  }
}

export type TaskType = '' | 'active' | 'paused' | 'delayed';

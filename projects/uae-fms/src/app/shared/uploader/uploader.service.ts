import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { environment } from '@environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploaderService {
  constructor(private _http: HttpClient) { }

  uploadDoc(data: FormData) {
    return this._http.post(environment.baseApiUrl + 'document', data, {
      headers: new HttpHeaders({}),
      reportProgress: true,
      observe: 'events'
    });
  }

  getDoc(id) {
    return this._http.get(environment.baseApiUrl + `document/${id}` , {observe: 'response' , responseType: 'blob'})
  }

  getCSVfile(id) {
    return this._http.get(environment.baseApiUrl + `document/${id}`, {
      responseType: 'text'
    });
  }
}

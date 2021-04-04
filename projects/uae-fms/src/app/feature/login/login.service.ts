import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { LoginRequest, LoginResponse } from './login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  private loginApiUrl = environment.baseApiUrl + 'login';
  private baseUrl = environment.baseApiUrl;

  login(loginRequest: LoginRequest): Observable<any> {
    let form = new FormData();
    form.append("username", loginRequest.username);
    form.append("password", loginRequest.password);

    return this.http.post(this.loginApiUrl, form, { headers: new HttpHeaders() });
  }

  logOut() {
    return this.http.get(this.baseUrl + 'logout');
  }

  getUserProfile() {
    return this.http.get(this.baseUrl + "profile");
  }
}

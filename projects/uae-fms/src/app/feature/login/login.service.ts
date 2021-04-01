import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { LoginRequest, LoginResponse } from './login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

  private loginApiUrl = environment.baseApiUrl + 'login';

  login(loginRequest: LoginRequest): Observable<any> {
    let form = new FormData();
    form.append("username", "admin");
    form.append("password", "pass");

    return this.http.post(this.loginApiUrl, form);
  }
}

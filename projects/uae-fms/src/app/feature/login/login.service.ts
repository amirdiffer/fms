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

  private loginApiUrl = environment.baseLoginApiUrl + 'users/login';
  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post(this.loginApiUrl, loginRequest).pipe(
      tap((response: LoginResponse) => {
        window.localStorage.setItem(
          'user_info',
          JSON.stringify(response.fleetUser)
        );
        window.localStorage.setItem('jwt', response.token);
      })
    );
  }
}

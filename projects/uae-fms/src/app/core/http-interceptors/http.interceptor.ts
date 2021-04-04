import { Injectable, Injector, ErrorHandler } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor as HttpInterceptorBase,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/** Passes HttpErrorResponse to application-wide error handler */
@Injectable()
export class HttpInterceptor implements HttpInterceptorBase {
  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let req;
    let headers;
    request = request.clone({
      withCredentials: true
    });

    if (request.url.indexOf('login') < 0) {
      headers = new HttpHeaders({
        permission_level: '123456',
        user_id: '1',
        'Content-Type': 'application/json'
      });
      req = request.clone({ headers: headers });
    } else {
      req = request;
    }
    if (req) {
      return next.handle(req).pipe(
        tap({
          error: (err: any) => {
            if (err.url.indexOf('login') < 0) {
              if (err instanceof HttpErrorResponse) {
                const appErrorHandler = this.injector.get(ErrorHandler);
                appErrorHandler.handleError(err);
              }
            }
          }
        })
      );
    }
  }
}

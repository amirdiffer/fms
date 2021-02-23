import {
  HttpEvent,
  HttpInterceptor as HttpInterceptorBase,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable, Injector, ErrorHandler } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/** Passes HttpErrorResponse to application-wide error handler */
@Injectable()
export class HttpInterceptor implements HttpInterceptorBase {
  constructor(private injector: Injector) {}
  headers = new HttpHeaders({
    user_id: '1',
    permission_level: '12345',
    'Content-Type': 'application/json',
    'x-mock-response-code': '200'
  });

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = request.clone({
      headers: this.headers
    });

    return next.handle(authReq).pipe(
      tap({
        error: (err: any) => {
          if (err instanceof HttpErrorResponse) {
            const appErrorHandler = this.injector.get(ErrorHandler);
            appErrorHandler.handleError(err);
          }
        }
      })
    );
  }
}

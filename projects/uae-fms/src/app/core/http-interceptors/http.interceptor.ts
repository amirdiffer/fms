import { Injectable, Injector, ErrorHandler } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor as HttpInterceptorBase,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/** Passes HttpErrorResponse to application-wide error handler */
@Injectable()
export class HttpInterceptor implements HttpInterceptorBase {
  constructor(private injector: Injector) {}
  httpHeaders = new HttpHeaders({
    'x-mock-response-code': '200',
    'Content-Type': 'application/json',
    permission_level: '123456',
    user_id: '1'
  });

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const req = request.clone({ headers: this.httpHeaders });
    return next.handle(req).pipe(
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

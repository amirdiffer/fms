import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '../spinner/spinner.service'

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(public loaderService: SpinnerService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // APIConfig;
            this.loaderService.display(true);
            return next.handle(req).pipe(
                finalize(() => {
                        this.loaderService.display(false);
                })
            );
    }
}

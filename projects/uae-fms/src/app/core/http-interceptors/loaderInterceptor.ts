import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '../spinner/spinner.service'

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  counter: number = 0;
  counter$ = new Subject();

  constructor(public loaderService: SpinnerService) {
    this.counter$.subscribe(x => {
      if (x) {
        this.counter += 1;
        this.loaderService.display(true);
      }
      else {
        this.counter -= 1;
        if (this.counter == 0)
          this.loaderService.display(false);
      }
    })
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // APIConfig;
    if (req) {
      this.counter$.next(true);
      return next.handle(req).pipe(
        finalize(() => {
          this.counter$.next(false)
        })
      );
    }
  }
}

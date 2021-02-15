import { HostListener, Injectable, OnInit } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WindowResizeService {

  private resize$ = fromEvent(window, 'resize');

  private resize = new Subject<ResizeEvent>();
  resized$: Observable<ResizeEvent> = this.resize.asObservable();

  constructor() {
    this.resize$.subscribe(x => {
      this.resized(x.target["innerWidth"], x.target["innerHeight"]);
    })
  }

  private resized(innerWidth: number, innerHeight: number) {
    this.resize.next({ innerHeight, innerWidth });
  }

  public getCurrent(): ResizeEvent {
    return { innerWidth: window.innerWidth, innerHeight: window.innerHeight }
  }
}

export interface ResizeEvent {
  innerHeight: number;
  innerWidth: number;
}

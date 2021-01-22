import { HostListener, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WindowResizeService {
    private onResize = new Subject();
    public resize$ = this.onResize.asObservable();

    constructor() { }

    @HostListener('window:resize', ['$event'])
    _onResize(event) {
        this.onResize.next(event.target.innerWidth);
    }
}
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class TableServiceS {

  searchBox$ = new Subject<string>();

  constructor() {
  }

  getSearchBoxData(elementID: string) {
    let input = document.getElementById(elementID) as HTMLInputElement;
    if (input != null) {
      input.addEventListener('keyup', (x) => {
        this.searchBox$.next(input.value)
      });
    }
    return this.searchBox$.asObservable();
  }

}

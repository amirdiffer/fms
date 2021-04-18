import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  selectedTypeId = 0;
  selectedTypeName = '';
  selectedMakeId = 0;
  selectedMakeName = '';
  selectedModelId = 0;
  selectedModelName = '';
  private _typeCategory = new BehaviorSubject<string>('ASSET');
  public selectType(type: string) {
    this._typeCategory.next(type);
  }
  public watchType(): Observable<string> {
    return this._typeCategory.asObservable();
  }

  tree = [];
  updateTree(id, type, obj) {
    let arr = this.tree.filter((x) => x.type == type);
    let exist = arr.find((x) => x.id == id);
    !exist
      ? this.tree.push({ id: id, type: type, data: obj })
      : this.tree.map((x) => {
          if (x.id == id)
            return {
              id: id,
              type: type,
              data: x.data
            };
        });
    return this.tree;
  }

  returnTreeItem(id, type) {
    let arr = this.tree.filter((x) => x.type == type && x.id == id);
    return arr[0];
  }

  constructor() {}
}

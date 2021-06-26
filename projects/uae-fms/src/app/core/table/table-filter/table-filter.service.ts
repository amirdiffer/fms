import { Injectable } from '@angular/core';
import { FilterType } from '@core/table/table.component';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TableFilterService {
  filterType = FilterType;

  constructor() {}

  convertData(data) {
    let type = data['filterType'];
    let key = data['filterApiKey'] ? data['filterApiKey'] : data['name'];
    let value = data['value'];
    switch (type) {
      case this.filterType.list: {
        return key + ':' + value.id;
      }
      case this.filterType.range_date: {
        let start = moment.utc(value[0]).valueOf();
        let end = moment.utc(value[1]).valueOf();
        if (end) {
          return key + '>=' + start + ';' + key + '<=' + end;
        }
        return key + ':' + start;
      }
      case this.filterType.checkbox_list: {
        break;
      }
      default:
        return key + ':' + value;
    }
  }
}

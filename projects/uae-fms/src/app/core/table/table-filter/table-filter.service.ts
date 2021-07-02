import { Injectable } from '@angular/core';
import { FilterType } from '@core/table/table.component';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TableFilterService {
  filterType = FilterType;
  itemValue_isArray = [];
  constructor() {}

  convertData(data) {
    let type = data['filterType'];
    let key = data['filterApiKey'] ? data['filterApiKey'] : data['name'];
    let value = data['value'];
    let getVal = (val) => {
      if (this.itemValue_isArray.includes(key))
        return (<Array<any>>val).toString();
      else return val;
    };
    switch (type) {
      case this.filterType.status:
      case this.filterType.list: {
        return key + ':' + getVal(value.id);
      }
      case this.filterType.range_date: {
        let start = moment.utc(value[0]).valueOf();
        let end = moment.utc(value[1]).valueOf();
        if (end) {
          return key + '>=' + start + ';' + key + '<=' + end;
        }
        return key + ':' + start;
      }
      case this.filterType.number: {
        return key + value['comparison'] + getVal(value.val);
      }
      default:
        return key + ':' + getVal(value);
    }
  }

  convertDate(date) {
    if (date != '') {
      let start = moment.utc(date[0]).toDate();
      let end = date[1];
      if (end) end = moment.utc(date[1]).toDate();
      return end ? [start, end] : [start, null];
    }
    return null;
  }
}

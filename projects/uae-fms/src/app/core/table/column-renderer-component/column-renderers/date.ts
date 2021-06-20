import { Component, Input, OnInit } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'table-date-renderer',
  template: ` <div pTooltip='{{this.date}}' tooltipPosition='bottom'>{{ this.date }}</div> `,
  styles: [``]
})
export class DateRenderer implements OnInit {
  @Input() data;
  date = '';

  constructor() {}

  ngOnInit() {
    console.log(this.data);
    this.date = moment
      .utc(this.data * 1000)
      .local()
      .format('DD-MM-YYYY');
  }
}

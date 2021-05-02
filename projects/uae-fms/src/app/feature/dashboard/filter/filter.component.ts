import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FilterComponent implements OnInit {
  calenderIcon='assets/icons/calendar-alt-regular.svg';
  dotIcon = 'assets/icons/ellipsis-v.svg';
  
  constructor() { }

  ngOnInit(): void {
  }

}

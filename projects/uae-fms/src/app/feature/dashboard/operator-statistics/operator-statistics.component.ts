import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-operator-statistics',
  templateUrl: './operator-statistics.component.html',
  styleUrls: ['./operator-statistics.component.scss']
})
export class OperatorStatisticsComponent implements OnInit {
  totalIcon = '/assets/icons/operator-total.svg';
  totalFineIcon = '/assets/icons/operator-total-fine.svg';
  activeIcon = '/assets/icons/operator-active.svg';
  deactiveIcon = '/assets/icons/operator-deactive.svg';
  constructor() {}

  ngOnInit(): void {}
}

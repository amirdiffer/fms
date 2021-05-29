import { Component, OnInit } from '@angular/core';
import { ICardDetailRedialChart } from './asset-overview/detail-card-dashboard/detail-card-dashboard.component';

@Component({
  selector: 'anms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  finedOperator: { lowestFinedOperator: null; highestFinedOperator: null };

  constructor() {}

  ngOnInit(): void {}
}

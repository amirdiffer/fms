import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'detail-card-dashboard',
  templateUrl: './detail-card-dashboard.component.html',
  styleUrls: ['./detail-card-dashboard.component.scss']
})
export class DetailCardDashboardComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() chartData: ICardDetailRedialChart[];
  dotIcon = 'assets/icons/ellipsis-v.svg';
  arrowUp = 'assets/icons/arrow-down.svg';
  showMoreInit: number = 3;
  constructor() {}

  ngOnInit(): void {}
}

export interface ICardDetailRedialChart {
  title: string;
  percent: number;
  color?: string;
}

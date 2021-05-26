import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'detail-mini-card-dashboard',
  templateUrl: './detail-mini-card-dashboard.component.html',
  styleUrls: ['./detail-mini-card-dashboard.component.scss']
})
export class DetailMiniCardDashboardComponent implements OnInit {
  @Input() data = [];
  @Input() title = 'Title';
  @Input() labels = [];
  @Input() routerLink: IRouterLink;
  constructor() {}

  ngOnInit(): void {}
}
export interface IRouterLink {
  title: string;
  router: string;
}

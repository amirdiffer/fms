import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-alert-dashboard',
  templateUrl: './card-alert-dashboard.component.html',
  styleUrls: ['./card-alert-dashboard.component.scss']
})
export class CardAlertDashboardComponent implements OnInit {
  @Input() title: string = 'Title is Here';
  @Input() subTitle: string = 'Sub Title is Here';
  @Input() isAlert: boolean = false;
  @Input() data;
  congratulationsIcon = '/assets/icons/operator-congratulations.svg';
  congratulationsIcon2 = '/assets/icons/operator-congratulations2.svg';
  warningIcon = '/assets/icons/operator-warning.svg';
  constructor() {}

  ngOnInit(): void {}
}

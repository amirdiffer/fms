import { Component, OnInit } from '@angular/core';
import { SettingsFacade } from '@core/settings/settings.facade';
import { IOperator, IOperatorDrivingLicense } from '@models/operator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'anms-overviewtab',
  templateUrl: './overview-tab.component.html',
  styleUrls: ['./overview-tab.component.scss']
})
export class OperatorOverviewTabComponent implements OnInit {
  activeLang = '';

  // activatedRouteSubscriber
  operatorSubscriber: Subscription
  operator: IOperator
  drivingLicenseInfo: IOperatorDrivingLicense

  constructor(private settingFacade: SettingsFacade) {}

  ngOnInit(): void {
    this.settingFacade.language.subscribe((lang) => {
      this.activeLang = lang;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { SettingsFacade } from '@core/settings/settings.facade';

@Component({
  selector: 'anms-overviewtab',
  templateUrl: './overview-tab.component.html',
  styleUrls: ['./overview-tab.component.scss']
})
export class OperatorOverviewTabComponent implements OnInit {
  activeLang = '';

  constructor(private settingFacade: SettingsFacade) {}

  ngOnInit(): void {
    this.settingFacade.language.subscribe((lang) => {
      this.activeLang = lang;
    });
  }
}

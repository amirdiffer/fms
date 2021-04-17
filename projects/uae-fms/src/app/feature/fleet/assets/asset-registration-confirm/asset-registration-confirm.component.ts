import { Component, OnInit } from '@angular/core';
import { SettingsFacade } from '@core/settings/settings.facade';

@Component({
  selector: 'anms-asset-registration-confirm',
  templateUrl: './asset-registration-confirm.component.html',
  styleUrls: ['./asset-registration-confirm.component.scss']
})
export class AssetRegistrationConfirmComponent implements OnInit {
  activeLang: string;
  constructor(private settingFacade: SettingsFacade) {}

  ngOnInit(): void {
    this.settingFacade.language.subscribe((lang) => (this.activeLang = lang));
  }
}

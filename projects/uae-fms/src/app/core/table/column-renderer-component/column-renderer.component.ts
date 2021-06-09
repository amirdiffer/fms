import { Component, Host, Input, OnInit, Optional, Self } from '@angular/core';
import { ColumnDifinition, TableComponent, TableSetting } from '@core/table';
import { SettingsFacade } from '@core/settings/settings.facade';

@Component({
  selector: 'anms-column-renderer',
  templateUrl: './column-renderer.component.html'
})
export class ColumnRendererComponent implements OnInit {
  @Input() setting: TableSetting;
  @Input() data: any;
  @Input() col: ColumnDifinition;
  @Input() context;
  @Input() index;

  activeLang = 'en';

  constructor(private settingsFacade: SettingsFacade) {
    settingsFacade.language.subscribe((lang) => {
      this.activeLang = lang;
    });
  }

  ngOnInit(): void {}
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-company-setting',
  templateUrl: './company-setting.component.html',
  styleUrls: ['./company-setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanySettingComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MakeDecisionService } from '../make-decision.service';

@Component({
  selector: 'step4-customization',
  templateUrl: './customization.component.html',
  styleUrls: ['./customization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomizationComponent implements OnInit {
  tableSetting;
  constructor(private _makeDecisionService: MakeDecisionService) {}

  ngOnInit(): void {
    this.tableSetting = this._makeDecisionService.tableSettingCustomization;
  }
}

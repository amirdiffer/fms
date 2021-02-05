import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MakeDecisionService } from '../make-decision.service';

@Component({
  selector: 'detail-decision',
  templateUrl: './detail-decision.component.html',
  styleUrls: ['./detail-decision.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailDecisionComponent implements OnInit {
  tableSetting;
  radioButtonSelect: string;
  constructor(private _makeDecisionService: MakeDecisionService) { }

  ngOnInit(): void {
    this.tableSetting = this._makeDecisionService.tableSetting;
  }

}

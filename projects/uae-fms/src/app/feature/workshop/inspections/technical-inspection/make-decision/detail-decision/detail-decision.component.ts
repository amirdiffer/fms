import { MakeDecisionComponent } from './../make-decision.component';
import { Component, OnInit, ChangeDetectionStrategy, Output } from '@angular/core';
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

  constructor(private _makeDecisionService: MakeDecisionService) {}

  ngOnInit(): void {
    this.tableSetting = this._makeDecisionService.tableSetting;
    this.radioButtonSelect = this._makeDecisionService.activeRadio;
  }

  clickedRadio(radioButton?): void {
    console.log(radioButton.value)
    if(radioButton) this._makeDecisionService.activeRadio = radioButton.value;
    this._makeDecisionService.isStartStepper$.next(false);
  }

}

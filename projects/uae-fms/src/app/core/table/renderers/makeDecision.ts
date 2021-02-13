import { Component, OnInit } from '@angular/core';
import { MakeDecisionService } from '@feature/workshop/inspections/technical-inspection/make-decision/make-decision.service';

@Component({
  selector: 'make-decision-renderer',
  template: ` <button (click)="openMakeDecision()">Make Decision</button> `,
  styles: [
    `
      button {
        background: #0da06e 0% 0% no-repeat padding-box;
        border-radius: 6px;
        color: #fff;
        font-size: 15px;
        height: 66px;
        border: none;
        padding: 0 20px;
      }
    `
  ]
})
export class MakeDecisionRendererComponent implements OnInit {
  constructor(private _makeDecisionService: MakeDecisionService) {}

  ngOnInit() {}
  openMakeDecision() {
    this._makeDecisionService.loadMakeDecision(true);
  }
}

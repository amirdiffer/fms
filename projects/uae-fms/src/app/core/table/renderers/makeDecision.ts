import { Component, OnInit } from '@angular/core';
import { MakeDecisionService } from '@feature/workshop/inspections/technical-inspection/make-decision/make-decision.service';

@Component({
  selector: 'make-decision-renderer',
  template: `
    <button class="btn-primary-large" (click)="openMakeDecision()">
      {{ 'workshop.technical_inspection.make_decision' | translate }}
    </button>
  `,
  styles: [
    `
      button {
        padding: 1em 0.7em;
        height: 5em;
        width: 11em;
        font-size: 1em;
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

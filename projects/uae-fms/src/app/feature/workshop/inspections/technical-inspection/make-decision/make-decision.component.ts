import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-make-decision',
  templateUrl: './make-decision.component.html',
  styleUrls: ['./make-decision.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MakeDecisionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

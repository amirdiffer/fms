import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MakeDecisionService } from '../make-decision.service';

@Component({
  selector: 'technical-make-decision-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  constructor(private _makeDecisionService: MakeDecisionService) {}

  ngOnInit(): void {}
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'step1-technical-inspection',
  templateUrl: './technical-inspection.component.html',
  styleUrls: ['./technical-inspection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechnicalInspectionStepComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'anms-operator-congratulations',
  templateUrl: './operator-congratulations.component.html',
  styleUrls: ['./operator-congratulations.component.scss']
})
export class OperatorCongratulationsComponent implements OnInit {
  congratulationsIcon = '/assets/icons/operator-congratulations.svg';
  congratulationsIcon2 = '/assets/icons/operator-congratulations2.svg';

  constructor() {}

  ngOnInit(): void {}
}

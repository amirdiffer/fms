import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'anms-operator-warning',
  templateUrl: './operator-warning.component.html',
  styleUrls: ['./operator-warning.component.scss']
})
export class OperatorWarningComponent implements OnInit {
  warningIcon = '/assets/icons/operator-warning.svg';

  constructor() {}

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'anms-workshop-job-type',
  templateUrl: './workshop-job-type.component.html',
  styleUrls: ['./workshop-job-type.component.scss']
})
export class WorkshopJobTypeComponent implements OnInit {
  estimateIcon = 'assets/icons/estimate.svg';
  repairIcon = 'assets/icons/repair.svg';
  technicalReportIcon = 'assets/icons/technical-report.svg';
  installationIcon = 'assets/icons/installation.svg';

  constructor() {}

  ngOnInit(): void {}
}

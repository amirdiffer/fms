import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-job-type',
  templateUrl: './job-type.component.html',
  styleUrls: ['./job-type.component.scss']
})
export class JobTypeComponent implements OnInit {
  estimateIcon = 'assets/icons/estimate.svg';
  repairIcon = 'assets/icons/repair.svg';
  technicalReportIcon = 'assets/icons/technical-report.svg';
  installationIcon = 'assets/icons/installation.svg';
  constructor() { }

  ngOnInit(): void {
  }

}

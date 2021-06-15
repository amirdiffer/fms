import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrafficFineTableService } from '@feature/traffic-fine/+state/traffic-fine';
import { SettingsFacade } from '@core/settings/settings.facade';

@Component({
  selector: 'anms-traffic-file-overview',
  templateUrl: './traffic-file-overview.component.html',
  styleUrls: ['./traffic-file-overview.component.scss']
})
export class TrafficFileOverviewComponent implements OnInit {

  isLtr = true;

  trafficFines: any[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private networkService: TrafficFineTableService,
              private settingsFacade: SettingsFacade) {
    settingsFacade.language.subscribe((lang) => {
      this.isLtr = lang === 'en'
    })
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getFinesForId(params.id);
    });
  }

  private getFinesForId(id: number): void {
    this.networkService.getFinesOfSpecificFileNumber(id)
      .subscribe((response) => {
        this.trafficFines = response.message;
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SettingsFacade } from '@core/settings/settings.facade';
import { OperatorService } from '@feature/fleet/+state/operator';
import { IOperator, IOperatorDrivingLicense } from '@models/operator';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'anms-overviewtab',
  templateUrl: './overview-tab.component.html',
  styleUrls: ['./overview-tab.component.scss']
})
export class OperatorOverviewTabComponent implements OnInit {
  activeLang = '';

  operatorSubscriber: Subscription
  operator: IOperator
  drivingLicenseInfo: IOperatorDrivingLicense
  drivingLicense$ : Observable<any>;
  constructor(private settingFacade: SettingsFacade, 
              private _service: OperatorService,
              private _activatedRoute:ActivatedRoute
              ) {}

  ngOnInit(): void {
    this.settingFacade.language.subscribe((lang) => {
      this.activeLang = lang;
    });
    let id = this._activatedRoute.snapshot.params.id
    id ? this.getOperatorsDrivingLicense(id) : null;
  }

  private getOperatorsDrivingLicense(id: number): void {
    this.drivingLicense$ = this._service.getOperatorsDrivingLicence(id).pipe(
      map(response => {
        return response.message
      })
    )
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OperatorService } from '@feature/fleet/+state/operator';
import { IOperatorOverview } from '@models/statistics';

@Component({
  selector: 'dashboard-operator-statistics',
  templateUrl: './operator-statistics.component.html',
  styleUrls: ['./operator-statistics.component.scss']
})
export class OperatorStatisticsComponent implements OnInit {

  @Output('finedOperator') finedOperator: EventEmitter<any> = new EventEmitter();
  totalIcon = '/assets/icons/operator-total.svg';
  totalFineIcon = '/assets/icons/operator-total-fine.svg';
  activeIcon = '/assets/icons/operator-active.svg';
  deactiveIcon = '/assets/icons/operator-deactive.svg';

  operatorOverviewData: IOperatorOverview = {
    numOfActiveOperators: 0,
    numOfInactiveOperators: 0,
    totalAmountOfFines: 0,
    totalNumOfOperators: 0
  };

  constructor(
    private _operatorOverview: OperatorService
  ) {}

  ngOnInit(): void {
    this._operatorOverview.operatorOverview().subscribe(x => {
      let data = x.message;
      this.operatorOverviewData = data;
      this.finedOperator.emit({
        lowestFinedOperator: data.lowestFinedOperator,
        highestFinedOperator: data.highestFinedOperator
      })
    })
  }

}

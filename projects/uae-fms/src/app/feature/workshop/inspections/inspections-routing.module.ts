import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuctionListComponent } from './auction-list/auction-list.component';
import { TechnicalInspectionComponent } from './technical-inspection/technical-inspection.component';
import { TechnicalOverviewComponent } from './technical-inspection/technical-overview/technical-overview.component';
const routes: Routes = [
  {
    path: 'auction-list',
    component: AuctionListComponent
  },

  {
    path: 'technical-inspection',
    component: TechnicalInspectionComponent
  },
  {
    path: 'technical-inspection-report/:id',
    component: TechnicalOverviewComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspectionsRoutingModule {}

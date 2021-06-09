import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  
  
  {
    path: 'body-shop',
    loadChildren: () =>
      import('./body-shop/body-shop.module').then((m) => m.BodyShopModule)
  },
  {
    path: 'service-shop',
    loadChildren: () =>
      import('./service-shop/service-shop.module').then(
        (m) => m.ServiceShopModule
      )
  },
  {
    path: 'location',
    loadChildren: () =>
      import('./location/location.module').then((m) => m.LocationModule)
  },

  {
    path: 'task-master',
    loadChildren: () =>
      import('./task-master/task-master.module').then((m) => m.TaskMasterModule)
  },

  {
    path:'inspections',
    loadChildren: () =>
      import('./inspections/inspections.module').then((m) => m.InspectionsModule)
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshopRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetsComponent } from './assets/assets.component';

import { FleetComponent } from './fleet.component';
import { MovementComponent } from './movement/movement.component';

const routes: Routes = [
  { path: '', 
    component: FleetComponent ,
  },
  {path:'assets', component:AssetsComponent},
  {path: 'movement' , component: MovementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetRoutingModule {}

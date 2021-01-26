import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BodyShopComponent } from "./body-shop/body-shop.component";

const routes: Routes = [
  { path: '', redirectTo: 'body-shop' },
  { path: 'body-shop', component: BodyShopComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshopRoutingModule { }

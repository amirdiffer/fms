import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuardService } from '@core/auth/auth-guard.service';
import { MainTemplateComponent } from './template/main-template/main-template.component';
import { LoginTemplateComponent } from './template/login-template/login-template.component';
import { DesignSystemComponent } from './template/design-system/design-system.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('../app/feature/login/login.module').then((m) => m.LoginModule),
    component: LoginTemplateComponent
  },
  {
    path: 'dashboard',
    canLoad: [AuthGuardService],
    loadChildren: () =>
      import('./feature/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    component: MainTemplateComponent
  },
  {
    path: 'fleet',
    canLoad: [AuthGuardService],
    loadChildren: () =>
      import('./feature/fleet/fleet.module').then((m) => m.FleetModule),
    component: MainTemplateComponent
  },
  {
    path: 'workshop',
    canLoad: [AuthGuardService],
    loadChildren: () =>
      import('./feature/workshop/workshop.module').then(
        (m) => m.WorkshopModule
      ),
    component: MainTemplateComponent
  },
  {
    path: 'configuration',
    canLoad: [AuthGuardService],
    loadChildren: () =>
      import('./feature/configuration/configuration.module').then(
        (m) => m.ConfigurationModule
      ),
    component: MainTemplateComponent
  },
  {
    path: 'part-store',
    canLoad: [AuthGuardService],
    loadChildren: () =>
      import('./feature/part-store/part-store.module').then(
        (m) => m.PartStoreModule
      ),
    component: MainTemplateComponent
  },
  /* {
    path: 'traffic-fine',
    canLoad: [AuthGuardService],
    loadChildren: () =>
      import('./feature/traffic-fine/traffic-fine.module').then(
        (m) => m.TrafficFineModule
      ),
    component: MainTemplateComponent
  }, */
  /*  {
    path: 'toll',
    canLoad: [AuthGuardService],
    loadChildren: () =>
      import('./feature/toll/toll.module').then((m) => m.TollModule),
    component: MainTemplateComponent
  }, */
  /* {
    path: 'integration',
    canLoad: [AuthGuardService],
    loadChildren: () =>
      import('./feature/integration/integration.module').then(
        (m) => m.IntegrationModule
      ),
    component: MainTemplateComponent
  }, */
  /* {
    path: 'fuel-management',
    canLoad: [AuthGuardService],
    loadChildren: () =>
      import('./feature/fuel-management/fuel-management.module').then(
        (m) => m.FuelManagementModule
      ),
    component: MainTemplateComponent
  }, */
  /* {
    path: 'user-profile',
    canLoad: [AuthGuardService],
    loadChildren: () =>
      import('./feature/user/user.module').then((m) => m.UserProfileModule),
    component: MainTemplateComponent
  }, */
  /* {
    path: 'design-system',
    component: DesignSystemComponent
  }, */
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

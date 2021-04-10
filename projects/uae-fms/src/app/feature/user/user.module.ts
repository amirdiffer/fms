import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { UserProfileRoutingModule } from './user-routing.module';
import { UserWidgetComponent } from './user-widget.component';
import { EffectsModule } from '@ngrx/effects';
import { UserProfileEffect } from './state/user.effects';
import { UserProfileFacade, UserProfileService } from './state';
import { StoreModule } from '@ngrx/store';
import { USER_PROFILE_FEATURE_KEY } from './state/user.entity';
import { reducer } from './state/user.reducer';
import { SharedModule } from '@shared/shared.module';
import { UserDetailComponent } from './profile/user-detail/user-detail.component';

@NgModule({
  declarations: [ProfileComponent, UserWidgetComponent, UserDetailComponent],
  exports: [UserWidgetComponent , UserDetailComponent],
  imports: [
    StoreModule.forFeature(USER_PROFILE_FEATURE_KEY, reducer),
    EffectsModule.forFeature([UserProfileEffect]),
    CommonModule,
    UserProfileRoutingModule,
    SharedModule
  ],
  providers: [UserProfileService, UserProfileFacade]
})
export class UserProfileModule {}

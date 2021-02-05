import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
// import {NgxSpinnerModule} from "ngx-spinner";
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    LoginRoutingModule,
    HttpClientModule,
    SharedModule
    // NgxSpinnerModule,
  ]
})
export class LoginModule {}

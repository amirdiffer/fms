import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from './login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  //In this componet some icons not exist now.Fix this later. Username and password and login icons is commented now
  public credentialsFG: FormGroup;
  public language = 'en';
  constructor(
    private loginService: LoginService,
    private router: Router // private spinner: NgxSpinnerService,
  ) {
    this.credentialsFG = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  changeLanguage(lang: string) {
    if (lang === 'en') {
      localStorage.setItem('lang', 'en');
    } else if (lang === 'ar') {
      localStorage.setItem('lang', 'ar');
    } else {
      localStorage.setItem('lang', 'en');
    }
    window.top.location.reload();
  }

  ngOnInit() {
    /**
     * Redirect to default route if user is logged in already
     */
    let jwt = window.localStorage.getItem('jwt');
    if (jwt) {
      this.router.navigate(['/dashboard']);
    }
  }

  login(): void {
    this.router.navigate(['/dashboard']);
    this.loginService
      .login({
        username: this.credentialsFG.value.username,
        password: this.credentialsFG.value.password
      })
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          if (error.error.toLowerCase().indexOf('password') > -1) {
            this.credentialsFG.controls.password.setErrors({ incorrect: true });
            this.credentialsFG.controls.password.markAllAsTouched();
          } else if (error.error.toLowerCase().indexOf('user') > -1) {
            this.credentialsFG.controls.username.setErrors({ incorrect: true });
            this.credentialsFG.controls.username.markAllAsTouched();
          }
        }
      );
  }
}

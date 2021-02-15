import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'login-template',
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginTemplateComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}

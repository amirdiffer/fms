import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { environment } from '@environments/environment';
import { UserProfileService } from './state';
import { UserProfileFacade } from './state/user.facade';

@Component({
  selector: 'user-widget',
  template:`
    <span class="user-navbar">
      <span class="user-image"><img [src]="fileServerBase + profileImage"></span>
      <span class="user-info">
        <p>{{firstName}}  {{lastName}}</p>
        <small>{{userName}}</small>
      </span>
    </span>
  `,
  styles:[`
    .user-navbar{
      display: flex;
      align-items: center;
      margin-left:7px;
    }
    .user-image{
      margin: 0;
      padding: 0;
      height: 40px;
      width: 40px;
    }
    .user-image img{
      height: 100%;
      border-radius: 50%;
    }
    .user-info{
      height: 40px;
      line-height: 1.3;
      margin-left: 15px;
      font-family: '29LT Bukra'
    }
    .user-info p{
      padding: 0;
      margin: 0;
      font-size: 15px
    }
    .user-info small{
      font-size: 12px;
      font-weight: bold;
    }

  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserWidgetComponent implements OnInit {
  fileServerBase = environment.baseFileServer;
  firstName;
  lastName;
  userName;
  profileImage = 'user-image.png';
  constructor(private _facade: UserProfileFacade , private _service : UserProfileService) { }

  ngOnInit(): void {
    const data = JSON.parse(localStorage.getItem( 'user_info'));
    this.firstName = data['firstName'];
    this.lastName = data['lastName'];
    this.userName = data['username'];
    this._facade.loadAll();
  }

}

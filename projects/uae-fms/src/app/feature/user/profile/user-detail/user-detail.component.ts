import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'user-detail-side',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  @Input() hasActivate:boolean = false
  userImage='assets/user-profile.svg';
  organizationIcon='assets/icons/organization.svg';
  emailIcon='assets/icons/envelope.svg';
  phoneIcon='assets/icons/phone.svg';
  editIcon='assets/icons/pen.svg';
  constructor() { }

  ngOnInit(): void {
  }

}

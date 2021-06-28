import { Component, OnInit, Input } from '@angular/core';
import { IOperator } from '@models/operator';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
@Component({
  selector: 'user-detail-side',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  @Input() hasActivate: boolean = false;
  @Input() data$: Observable<IOperator>;
  @Input() position: string;
  userImage = 'assets/user-profile.svg';
  organizationIcon = 'assets/icons/organization.svg';
  emailIcon = 'assets/icons/envelope.svg';
  phoneIcon = 'assets/icons/phone.svg';
  editIcon = 'assets/icons/pen.svg';
  activeChecked: boolean = false;
  constructor() {}

  ngOnInit(): void {
    this.data$?.subscribe((x) => {
      if (x) {
        this.activeChecked = x.isActive;
      }
    });
  }
}

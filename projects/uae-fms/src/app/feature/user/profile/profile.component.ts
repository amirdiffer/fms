import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserProfileFacade } from '../state';

@Component({
  selector: 'anms-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  constructor(private facade: UserProfileFacade) {}

  ngOnInit(): void {
    this.facade.loadAll();
  }
}

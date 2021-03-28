import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserProfileFacade } from '../state';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'anms-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  constructor(private facade: UserProfileFacade, private _fb: FormBuilder) {
    this.migrateForm();
  }

  form: FormGroup;
  migrateForm(): void {
    this.form = this._fb.group({
      role: this._fb.group({
        id: null,
        permissions: this._fb.group({
          asset: null,
          subAsset: null,
          organization: null,
          accessory: null,
          movement: null,
          fuelManagement: null,
          trafficFine: null,
          toll: null,
          workshop: null,
          partstore: null
        })
      }),
      profile: this._fb.group({
        userId: null,
        firstName: null,
        lastName: null,
        roleId: null,
        employeeNumber: null,
        organizationId: null,
        departmentId: null,
        email: null,
        phoneNumber: null,
        notificationType: null,
        vehicleComments: null,
        serviceEntryComment: null,
        fuelEntryComments: null,
        vehicleStatusChanges: null,
        voidedFuelEntries: null,
        dueSoonInspections: null,
        overdueInspections: null,
        newFaults: null,
        newRecalls: null,
        notifyByNewIssueEmail: null,
        notifyByNewIssuePush: null,
        notifyByIssueAssignedEmail: null,
        notifyByIssueAssignedPush: null,
        notifyByCommentOnIssueEmail: null,
        notifyByCommentOnIssuePush: null,
        notifyByIssueResolvedEmail: null,
        notifyByIssueResolvedPush: null,
        notifyByIssueCloseEmail: null,
        notifyByIssueClosePush: null
      })
    });
  }

  ngOnInit(): void {
    this.facade.loadAll();
    this.facade.loadData$.subscribe((data) => {
      if (data) this.form.patchValue(data);
      console.log(this.form.getRawValue());
    });
  }
}

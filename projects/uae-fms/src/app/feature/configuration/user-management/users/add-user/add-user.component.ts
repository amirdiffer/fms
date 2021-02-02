import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'anms-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      portalInformation: this.formBuilder.group({
        employeeNumber: [''],
        department: [''],
        role: [''],
        activeEmployee: false
      }),
      fileUpload: this.formBuilder.group({
        fileName: [''],
        fileSize: ['']
      }),
      personalInformation: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
        phoneNumber: [''],
        callCheckbox: false,
        smsCheckbox: false,
        emailCheckbox: false,
        whatsappCheckbox: false
      })
    });
  }

  submit(): void {}
}

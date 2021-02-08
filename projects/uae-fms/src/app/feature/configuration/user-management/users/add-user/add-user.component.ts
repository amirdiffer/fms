import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterCardSetting } from '@core/filter';

@Component({
  selector: 'anms-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserComponent implements OnInit {
  form: FormGroup;

  filter: FilterCardSetting[] = [
    {
      isCalendar: true,
      filterTitle: 'This Month',
      filterCount: '0',
      filterTagColor: '#fff',
      onActive(index: number) {}
    },
    {
      filterTitle: 'Total',
      filterCount: '13',
      filterTagColor: '#6EBFB5',
      filterSupTitle: 'User',
      onActive(index: number) {}
    },
    {
      filterTitle: 'Active',
      filterCount: '08',
      filterTagColor: '#6870B4',
      filterSupTitle: 'User',
      onActive(index: number) {}
    },
    {
      filterTitle: 'Inactive',
      filterCount: '02',
      filterTagColor: '#BA7967',
      filterSupTitle: 'User',
      onActive(index: number) {}
    }
  ];

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

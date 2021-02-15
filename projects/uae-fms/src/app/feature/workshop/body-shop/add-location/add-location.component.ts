import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injector
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { TableSetting } from '@core/table';
import { Utility } from '@shared/utility/utility';

@Component({
  selector: 'anms-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddLocationComponent extends Utility implements OnInit {
  inputForm: FormGroup;
  submited = false;
  filteredLocation;
  locationID: any[] = [
    {
      id: '1',
      name: 'Location ID 1'
    },
    {
      id: '2',
      name: 'Location ID 2'
    },
    {
      id: '3',
      name: 'Location ID 3'
    },
    {
      id: '4',
      name: 'Location ID 4'
    },
    {
      id: '5',
      name: 'Location ID 5'
    },
    {
      id: '6',
      name: 'Location ID 6'
    }
  ];
  addLocation_Table: TableSetting = {
    columns: [
      { lable: 'Location ID', type: 1, field: 'Location_ID' },
      { lable: 'Services', type: 1, field: 'Services' },
      { lable: 'Location', type: 1, field: 'Location' },
      { lable: 'Section', type: 1, field: 'Section' },
      { lable: 'Job Card', type: 1, field: 'Job_Card', sortable: true },
      { lable: 'Technician', type: 1, field: 'Technician', sortable: true },
      { lable: 'Assets', type: 1, field: 'Assets', sortable: true },
      {
        lable:
          '<img src="../../../../../assets/icons/ellipsis-v.svg" class="icon24px">',
        type: 3,
        width: 70,
        isIconLable: true,
        field: 'addButton',
        renderer: 'addButtonRenderer'
      }
    ],
    data: [
      {
        Location_ID: '00234567',
        Services: 'Repair, Car-wash, Fuei',
        Location: 'Bardubai, Street Number 2',
        Section: '3',
        Job_Card: '123456789',
        Technician: '123',
        Assets: '123456/1234',
        addButton: ''
      },
      {
        Location_ID: '00234567',
        Services: 'Repair, Car-wash, Fuei',
        Location: 'Bardubai, Street Number 2',
        Section: '3',
        Job_Card: '123456789',
        Technician: '123',
        Assets: '123456/1234',
        addButton: ''
      },
      {
        Location_ID: '00234567',
        Services: 'Repair, Car-wash, Fuei',
        Location: 'Bardubai, Street Number 2',
        Section: '3',
        Job_Card: '123456789',
        Technician: '123',
        Assets: '123456/1234',
        addButton: ''
      },
      {
        Location_ID: '00234567',
        Services: 'Repair, Car-wash, Fuei',
        Location: 'Bardubai, Street Number 2',
        Section: '3',
        Job_Card: '123456789',
        Technician: '123',
        Assets: '123456/1234',
        addButton: ''
      },
      {
        Location_ID: '00234567',
        Services: 'Repair, Car-wash, Fuei',
        Location: 'Bardubai, Street Number 2',
        Section: '3',
        Job_Card: '123456789',
        Technician: '123',
        Assets: '123456/1234',
        addButton: ''
      },
      {
        Location_ID: '00234567',
        Services: 'Repair, Car-wash, Fuei',
        Location: 'Bardubai, Street Number 2',
        Section: '3',
        Job_Card: '123456789',
        Technician: '123',
        Assets: '123456/1234',
        addButton: ''
      }
    ]
  };

  constructor(
    private _fb: FormBuilder,
    injector: Injector,
    private _roter: Router
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      locationID: [
        '',
        [Validators.required, this.autocompleteValidationLocationID]
      ],
      address: ['', [Validators.required]],
      section: this._fb.array([this._fb.control('', [Validators.required])])
    });
  }
  searchLocation(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.locationID.length; i++) {
      let location = this.locationID[i];
      if (location.id.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(location);
      }
    }
    this.filteredLocation = filtered;
  }
  autocompleteValidationLocationID(input: FormControl) {
    const inputValid = input.value.id;
    if (inputValid) {
      return null;
    } else {
      return { needsExclamation: true };
    }
  }
  addSection() {
    const section = new FormControl(null, [Validators.required]);
    (<FormArray>this.inputForm.get('section')).push(section);
  }

  addRequest() {
    this.submited = true;
    if (this.inputForm.invalid) {
      return;
    } else {
      console.log(this.inputForm.value);
      this._roter.navigate(['/workshop/body-shop']);
    }

    this.goToList();
  }

  cancelForm() {
    if (this.inputForm.dirty) {
      confirm('Are You sure that you want to cancel?')
        ? this._roter.navigate(['/workshop/body-shop'])
        : null;
    } else {
      this._roter.navigate(['/workshop/body-shop']);
    }
  }
}

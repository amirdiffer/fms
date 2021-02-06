import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ColumnType, TableSetting } from '@core/table';

@Component({
  selector: 'anms-add-technician',
  templateUrl: './add-technician.component.html',
  styleUrls: ['./add-technician.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTechnicianComponent implements OnInit {
  inputForm:FormGroup;
  filteredEmployeNumb;
  filteredLocation;
  employes : any[] =[
    {
      id:'1',
      fName:'Hamid',
      lName:'Mottaghian',
      email:'admin@jointscopes.com',
      number:'+989351730011',
      employeNumber:'1234568'
    },
    {
      id:'2',
      fName:'Alireza',
      lName:'Hamidi',
      email:'admin@jointscopes.com',
      number:'+989351730011',
      employeNumber:'1234568'
    },
    {
      id:'3',
      fName:'Amir Hossein',
      lName:'Hosseini',
      email:'admin@jointscopes.com',
      number:'+989351730011',
      employeNumber:'1234568'
    },
    {
      id:'4',
      fName:'Mahdi',
      lName:'MaddahPour',
      email:'admin@jointscopes.com',
      number:'+989351730011',
      employeNumber:'1234568'
    }
    
  ];
  locations: any[] =[
    {
      name: 'Hamid',
      city: 'Dubai',
      address:'street 1',
    },
    {
      name: 'Nirvana',
      city: 'Dubai',
      address:'street 2',
    },
    {
      name: 'Mellisa',
      city: 'Dubai',
      address:'street 3',
    },
    {
      name: 'Farid',
      city: 'Dubai',
      address:'street 4',
    },
    {
      name: 'Eden',
      city: 'Dubai',
      address:'street 5',
    }
  ]

  addTechnician_Table: TableSetting = {
    columns: [
      {
        lable: 'Technician',
        field: 'technician',
        renderer: 'userRenderer',
        thumbField: 'picture'
      },
      { lable: 'Skill', field: 'skill', type: ColumnType.lable },
      {
        lable: 'Status',
        field: 'status',
        type: ColumnType.lable,
        width: 120,
        textColor: '#6870B4'
      },
      { lable: 'Tasks', field: 'tasks', type: ColumnType.lable, width: 120 },
      {
        lable: 'Information',
        field: 'information',
        type: ColumnType.lable,
        width: 100,
        renderer: 'informationRenderer'
      },
      {
        lable: 'Rate Per Hour',
        field: 'ratePerHour',
        type: ColumnType.lable,
        width: 100
      }
    ],
    data: [
      {
        statusColor: '#6870B4',
        firstName: 'Sam',
        lastName: 'Smith',
        picture: 'user-image.png',
        id: '123456789',
        skill:
          'Electrician, Electrician, Electrician, Electrician, Electrician, Electrician',
        status: 'Available',
        tasks: '2',
        information: {
          email: 'sample@gmail.com',
          phoneNumber: '+971505653793'
        },
        ratePerHour: '0000 AED'
      },
      {
        statusColor: '#6870B4',
        firstName: 'Sam',
        lastName: 'Smith',
        picture: 'user-image.png',
        id: '123456789',
        skill:
          'Electrician, Electrician, Electrician, Electrician, Electrician, Electrician',
        status: 'Available',
        tasks: '2',
        information: {
          email: 'sample@gmail.com',
          phoneNumber: '+971505653793'
        },
        ratePerHour: '0000 AED'
      },
      {
        statusColor: '#6870B4',
        firstName: 'Sam',
        lastName: 'Smith',
        picture: 'user-image.png',
        id: '123456789',
        skill:
          'Electrician, Electrician, Electrician, Electrician, Electrician, Electrician',
        status: 'Available',
        tasks: '2',
        information: {
          email: 'sample@gmail.com',
          phoneNumber: '+971505653793'
        },
        ratePerHour: '0000 AED'
      },
      {
        statusColor: '#6870B4',
        firstName: 'Sam',
        lastName: 'Smith',
        picture: 'user-image.png',
        id: '123456789',
        skill:
          'Electrician, Electrician, Electrician, Electrician, Electrician, Electrician',
        status: 'Available',
        tasks: '2',
        information: {
          email: 'sample@gmail.com',
          phoneNumber: '+971505653793'
        },
        ratePerHour: '0000 AED'
      },
      {
        statusColor: '#6870B4',
        firstName: 'Sam',
        lastName: 'Smith',
        picture: 'user-image.png',
        id: '123456789',
        skill:
          'Electrician, Electrician, Electrician, Electrician, Electrician, Electrician',
        status: 'Available',
        tasks: '2',
        information: {
          email: 'sample@gmail.com',
          phoneNumber: '+971505653793'
        },
        ratePerHour: '0000 AED'
      }
    ]
  };

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      portalInfo : this._fb.group({
        emplyeeNumber:[''],
        payPerHours:[''],
        active:[false]
      }),
      professional: this._fb.group({
        skills: this._fb.array([
          this._fb.control([''])
        ]),
        location: this._fb.array([
          this._fb.control([''])
        ])
      }),
      file:[''],
      pesonalInfo: this._fb.group({
        firstName: [''],
        lastName:[''],
        email: this._fb.array([
          this._fb.control([''])
        ]),
        phoneNumber: this._fb.array([
          this._fb.control([''])
        ]),
        notification: this._fb.group({
          call:[true],
          sms:[true],
          email:[true],
          whatsapp:[false],
        })
      })
    })
  };

  searchEmploye(event){
    let filtered : any[] = [];
    let query = event.query;
    for(let i = 0; i < this.employes.length; i++) {
        let employe = this.employes[i];
        if (employe.fName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(employe);
        }
    }
    this.filteredEmployeNumb = filtered;
  }

  selectedEmploye(value){
    this.inputForm.patchValue({
      pesonalInfo:{
        firstName: value.fName,
        lastName: value.lName,
        email: value.email,
        phoneNumber: value.number,
      }
    })
  }

  searchLocation(event){
    let filtered : any[] = [];
    let query = event.query;
    for(let i = 0; i < this.locations.length; i++) {
        let location = this.locations[i];
        if (location.city.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(location);
        }
    }
    this.filteredLocation = filtered;
  }
}

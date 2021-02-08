import { Component, OnInit, ChangeDetectionStrategy ,Injector } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ColumnType, TableSetting } from '@core/table';
import { Utility } from '@shared/utility/utility';
@Component({
  selector: 'anms-add-technician',
  templateUrl: './add-technician.component.html',
  styleUrls: ['./add-technician.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTechnicianComponent extends Utility implements OnInit {
  inputForm:FormGroup;
  filteredEmployeNumb;
  filteredLocation;
  submited= false;
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

  constructor(private _fb: FormBuilder , injector: Injector , private _roter:Router) { super(injector);}

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      portalInfo : this._fb.group({
        emplyeeNumber:['', [Validators.required , this.autocompleteValidationEmployeNumber]],
        payPerHours:['',[Validators.required]],
        active:[false]
      }),
      professional: this._fb.group({
        skills: this._fb.array([
          this._fb.control('' , [Validators.required])
        ]),
        location: this._fb.array([
          this._fb.control('' , [Validators.required , this.autocompleteValidationLocation])
        ])
      }),
      file:[''],
      pesonalInfo: this._fb.group({
        firstName: ['' , [Validators.required]],
        lastName:['' , [Validators.required]],
        email: this._fb.array([
          this._fb.control('', [Validators.required])
        ]),
        phoneNumber: this._fb.array([
          this._fb.control('' , [Validators.required])
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
        email: [value.email],
        phoneNumber: [value.number],
      }
    })
    this.inputForm.get('pesonalInfo.firstName').markAsDirty();
    this.inputForm.get('pesonalInfo.lastName').markAsDirty();
    this.inputForm.get('pesonalInfo.email')['controls'][0].markAsDirty();
    this.inputForm.get('pesonalInfo.phoneNumber')['controls'][0].markAsDirty();
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

  /* AutoComplete Validation  */
  autocompleteValidationEmployeNumber (input: FormControl){
    const inputValid = input.value.employeNumber;
    if(inputValid){
      return null
    } else {
      return { needsExclamation: true }
    }
  }
  autocompleteValidationLocation (input: FormControl){
    const inputValid = input.value.city;
    if(inputValid){
      return null
    } else {
      return { needsExclamation: true }
    }
  }

  /* Add Forrm Array */
  addSkill(){
    const skill = new FormControl(null , [Validators.required]);
    (<FormArray>this.inputForm.get('professional.skills')).push(skill);
  }
  addLocation(){
    const location = new FormControl(null , [Validators.required ,  this.autocompleteValidationLocation]);
    (<FormArray>this.inputForm.get('professional.location')).push(location);
  }
  addEmail(){
    const email = new FormControl(null ,[Validators.required]);
    (<FormArray>this.inputForm.get('pesonalInfo.email')).push(email);
  }
  addPhoneNumber(){
    const phoneNumber = new FormControl(null , [Validators.required]);
    (<FormArray>this.inputForm.get('pesonalInfo.phoneNumber')).push(phoneNumber)
  }
  addRequest(){
    console.log(this.inputForm.value);
    this.submited = true;
    if (this.inputForm.invalid) {
      return;
    }
    this.goToList();
  }

  cancelForm(){
    if(this.inputForm.dirty){
      confirm('Are You sure that you want to cancel?') ? this._roter.navigate(['/workshop/body-shop']) : null;
    }else{
      this._roter.navigate(['/workshop/body-shop']);
    }
  }
}

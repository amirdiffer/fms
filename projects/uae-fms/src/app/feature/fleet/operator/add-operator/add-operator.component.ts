import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-add-operator',
  templateUrl: './add-operator.component.html',
  styleUrls: ['./add-operator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddOperatorComponent implements OnInit {

  employeNumber= [
    { name: 'Employee 1', id: 1 },
    { name: 'Employee 2', id: 2 },
    { name: 'Employee 3', id: 3 },
    { name: 'Employee 4', id: 4 },
    { name: 'Employee 5', id: 5 },
    { name: 'Employee 6', id: 6 }
  ];
  filteredEmploye: any[];
  constructor() {}

  ngOnInit(): void {}

  searchEmploye(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.employeNumber.length; i++) {
      let asset = this.employeNumber[i];
      if (asset.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(asset);
      }
    }
    this.filteredEmploye = filtered;
  }
}

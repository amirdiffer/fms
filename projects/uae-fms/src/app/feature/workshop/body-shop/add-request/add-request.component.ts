import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AddRequestFakeService } from './_fake.service';

@Component({
  selector: 'anms-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddRequestComponent implements OnInit {
  activePriority: string = 'high';
  tableSettingServie;
  tableSettingWarranty;
  inputForm : FormGroup;

  constructor(private _fb : FormBuilder, private _fakeService: AddRequestFakeService) {}

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      assetSearch:[''],
      reason:[false],
      jobType:[''],
      issueInfo : this._fb.group({
        issue:[''],
        repertedBy: [''],
        description:[''],
      }),
      priority:[''],
      file:['']
    });
    this.tableSettingServie = this._fakeService.tableSettingService;
    this.tableSettingWarranty = this._fakeService.tableSettingWarranty
  }


  addRequest(){
    console.log(this.inputForm.value)
  }
  changePriority(statusPriority): void {
    this.activePriority = statusPriority;
  }
}

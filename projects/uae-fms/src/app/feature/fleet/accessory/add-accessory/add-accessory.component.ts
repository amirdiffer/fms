import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccessoryService } from '../accessory.service';

@Component({
  selector: 'add-accessory',
  templateUrl: './add-accessory.component.html',
  styleUrls: ['./add-accessory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddAccessoryComponent implements OnInit {
  public inputForm: FormGroup;
  constructor(private _fb:FormBuilder , private _accessoryService : AccessoryService) { }

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      itemName:[''],
      assignTo:[''],
      search:[''],
      accessoryType:[''],
      quantity:[''],
      assignedTo:[''],
    })
  }
  cancel(){
    this._accessoryService.loadAddForm(false);
  }
}

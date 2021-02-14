import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IntegrationService } from '../integration.service';

@Component({
  selector: 'add-integration',
  templateUrl: './add-integration.component.html',
  styleUrls: ['./add-integration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddIntegrationComponent implements OnInit {
  public inputForm: FormGroup;
  constructor(private _fb: FormBuilder, private _integrationservice: IntegrationService) { }

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      type:[''],
      companyName:[''],
      grp:['']
    })
  }

  cancel(){
    this._integrationservice.loadInegrationForm(false)
  }

}

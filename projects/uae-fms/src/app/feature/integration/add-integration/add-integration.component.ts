import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IntegrationFacade } from '../+state/index';
import { IntegrationService } from '../integration.service';

@Component({
  selector: 'add-integration',
  templateUrl: './add-integration.component.html',
  styleUrls: ['./add-integration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddIntegrationComponent implements OnInit {
  public inputForm: FormGroup;
  types = [
    { name: 'type1', id: 1 },
    { name: 'type2', id: 2 },
    { name: 'type3', id: 3 },
    { name: 'type4', id: 4 },
    { name: 'type5', id: 5 },
    { name: 'type6', id: 6 },
    { name: 'type7', id: 7 }
  ];
  constructor(
    private _fb: FormBuilder,
    private _integrationservice: IntegrationService,
    private _facade: IntegrationFacade
  ) {}

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      type: [''],
      companyName: [''],
      grp: ['']
    });
  }

  cancel() {
    this._integrationservice.loadInegrationForm(false);
  }
  save() {
    this._facade.addIntegration(this.inputForm.value);
    this._integrationservice.loadInegrationForm(false);
  }
}

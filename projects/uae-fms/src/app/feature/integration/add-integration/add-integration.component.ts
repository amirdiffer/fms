import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IntegrationFacade } from '../+state/index';
import { IntegrationService } from '../integration.service';
import { DialogService } from '@core/dialog/dialog-template.component';

@Component({
  selector: 'add-integration',
  templateUrl: './add-integration.component.html',
  styleUrls: ['./add-integration.component.scss']
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
    private _facade: IntegrationFacade,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.inputForm = this._fb.group({
      type: [''],
      companyName: [''],
      grp: ['']
    });

    this._facade.submitted$.subscribe(response => {
      if (response) {
        const dialog = this.dialogService.show('success', 'Add Integration',
          'Integration added successfully.', 'OK', '');
        dialog.dialogClosed$.subscribe(result => {
          if (result === 'confirm') {
            this._integrationservice.loadInegrationForm(false);
          }
        })
      }
    })
  }

  cancel() {
    const dialog = this.dialogService.show('warning', 'Add Integration',
      'Are you sure that you want to cancel adding new integration ?', 'Yes', 'No');
    dialog.dialogClosed$.subscribe(result => {
      if (result === 'confirm') {
        this._integrationservice.loadInegrationForm(false);
      }
    });
  }
  save() {
    this._facade.addIntegration(this.inputForm.value);
    this._integrationservice.loadInegrationForm(false);
  }
}

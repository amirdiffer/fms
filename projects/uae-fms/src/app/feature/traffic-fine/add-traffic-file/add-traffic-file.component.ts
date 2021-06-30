import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from '@core/dialog/dialog-template.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TrafficFileNumberService } from '@feature/traffic-fine/+state/traffic-file-number/traffic-file-number.service';
import { tap } from 'rxjs/operators';
import { TrafficFineTableFacade } from '@feature/traffic-fine/+state/traffic-fine';

@Component({
  selector: 'anms-add-traffic-file',
  templateUrl: './add-traffic-file.component.html',
  styleUrls: ['./add-traffic-file.component.scss']
})
export class AddTrafficFileComponent implements OnInit {

  dialogTitle = 'Add Traffic File';

  inputForm: FormGroup;

  isEditing = false;
  editingItemId = 0;

  constructor(private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private trafficFileNumberService: TrafficFileNumberService,
    private trafficFineFacade: TrafficFineTableFacade) {
    this.inputForm = formBuilder.group({
      trafficFileNumber: '',
      status: false
    });
  }

  ngOnInit(): void {
    this.trafficFineFacade.loadAll();
    this.activatedRoute.params.subscribe((params) => {
      if (params?.id) {
        this.handleEditMode(params?.id);
      }
    });
  }

  cancel(): void {
    const dialog = this.dialogService.show('warning', this.dialogTitle,
      this.isEditing ? 'Are you sure to cancel editing the traffic file ?' : 'Are you sure to cancel adding new traffic file ?',
      'Yes', 'No');
    dialog.dialogClosed$.subscribe(result => {
      if (result === 'confirm') {
        this.router.navigate(['/traffic-fine/traffic-file-number']).then();
      }
    });
  }

  submit(): void {

    const formValues = this.inputForm.value;

    const payload = {
      trafficNumber: formValues.trafficFileNumber,
      isActive: formValues.status
    };

    if (this.isEditing) {
      this.trafficFileNumberService.updateTrafficFile(this.editingItemId, payload)
        .pipe(
          tap(response => {
            const dialog = this.dialogService.show('success', this.dialogTitle,
              'Traffic File Edited Successfully', 'Ok', '');
            dialog.dialogClosed$.subscribe(result => {
              if (result === 'confirm') {
                this.router.navigate(['/traffic-fine/traffic-file-number']).then();
              }
            });
          }, error => {
            const dialog = this.dialogService.show('danger', this.dialogTitle,
              'Error Occurred In Progress', 'Ok', '');
            dialog.dialogClosed$.subscribe(result => {
              if (result === 'confirm') {
              } else {
              }
            });
          })
        ).subscribe();
    } else {
      this.trafficFileNumberService.addTrafficFile(payload)
        .pipe(
          tap(response => {
            const dialog = this.dialogService.show('success', this.dialogTitle,
              'Traffic File Added Successfully', 'Ok', '');
            dialog.dialogClosed$.subscribe(result => {
              if (result === 'confirm') {
                this.router.navigate(['/traffic-fine/traffic-file-number']).then();
              }
            });
          }, error => {
            const dialog = this.dialogService.show('danger', this.dialogTitle,
              'Error Occurred In Progress', 'Ok', '');
            dialog.dialogClosed$.subscribe(result => {
              if (result === 'confirm') {
              } else {
              }
            });
          })
        ).subscribe();
    }
  }

  private handleEditMode(id: number): void {
    this.trafficFineFacade.trafficFine$.subscribe((item: any) => {
      item.forEach(e => {
        if (id === e.trafficFileNumber) {
          this.isEditing = true;
          this.editingItemId = e.id;
          this.inputForm.patchValue({
            trafficFileNumber: e.trafficFileNumber,
            status: e.isActive
          });
        }
      });
    });
  }
}

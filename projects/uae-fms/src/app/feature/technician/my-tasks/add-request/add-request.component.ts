import { Component, Injector, OnInit } from '@angular/core';
import { Utility } from '@shared/utility/utility';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from '@core/dialog/dialog-template.component';
import { tap } from 'rxjs/operators';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'anms-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss']
})
export class AddRequestComponent extends Utility implements OnInit {
  // region Variable
  form: FormGroup;
  formSubmitted = false;

  tasks = [
    { name: 'Task 1', id: 1 },
    { name: 'Task 2', id: 2 },
    { name: 'Task 3', id: 3 },
    { name: 'Task 4', id: 4 }
  ];

  priorities = [
    { name: 'First', id: 1 },
    { name: 'Second', id: 2 },
    { name: 'Third', id: 3 },
    { name: 'Fourth', id: 4 }
  ];

  fleetTypes = [
    { name: 'Asset', id: 1 },
    { name: 'Sub Asset', id: 2 }
  ];

  categories = [
    { name: 'Category 1', id: 1 },
    { name: 'Category 2', id: 2 },
    { name: 'Category 3', id: 3 },
    { name: 'Category 4', id: 4 }
  ];

  items = [
    { name: 'Item 1', id: 1 },
    { name: 'Item 2', id: 2 },
    { name: 'Item 3', id: 3 },
    { name: 'Item 4', id: 4 }
  ];

  fileId: any[] = [];
  // endregion

  constructor(
    private formBuilder: FormBuilder,
    private injector: Injector,
    private dialog: DialogService,
    private location: LocationStrategy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      task: '',
      requestType: 'needPart',
      requestInfo: '',
      requestDescription: '',
      priority: '',
      category: '',
      fleetType: '',
      item: '',
      quantity: '',
      needPartRequestDescription: '',
      file: ''
    });
  }

  imageUploadEvent(event): void {}

  submit(): void {}

  cancel(): void {
    const dialog = this.dialog.show(
      'warning',
      'Add Request',
      'Are you sure to cancel add new request ?'
    );
    const dialogClosedSubscription = dialog.dialogClosed$
      .pipe(
        tap((result) => {
          if (result === 'confirm') {
            this.back();
          }
          dialogClosedSubscription?.unsubscribe();
        })
      )
      .subscribe();
  }

  back(): void {
    this.location.back();
  }
}

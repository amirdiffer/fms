import { Component, Injector, OnInit } from '@angular/core';
import { Utility } from '@shared/utility/utility';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder, private injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.buildForm();
    console.log(this.form.controls['requestType'].value);
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      task: '',
      requestType: 'needPart',
      requestInfo: '',
      requestDescription: '',
      priority: '',
      category: '',
      item: '',
      quantity: '',
      needPartRequestDescription: '',
      file: ''
    });
  }

  imageUploadEvent(event): void {

  }

  submit(): void {
  }

  cancel(): void {

  }

}

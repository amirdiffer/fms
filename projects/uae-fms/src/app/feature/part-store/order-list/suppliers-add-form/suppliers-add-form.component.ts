import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'anms-suppliers-add-form',
  templateUrl: './suppliers-add-form.component.html',
  styleUrls: ['./suppliers-add-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuppliersAddFormComponent implements OnInit {
  @Output() cancel = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {}
}

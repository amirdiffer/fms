import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
  selector: 'anms-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddRequestComponent implements OnInit {
  activePriority: string = 'high';

  constructor() {}

  ngOnInit(): void {}

  changePriority(statusPriority): void {
    this.activePriority = statusPriority;
  }
}

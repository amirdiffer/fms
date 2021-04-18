import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MakeDecisionService } from './make-decision.service';

@Component({
  selector: 'inspection-make-decision',
  templateUrl: './make-decision.component.html',
  styleUrls: ['./make-decision.component.scss']
})
export class MakeDecisionComponent implements OnInit {
  isEditable: boolean = true;
  isLinear: boolean = true;
  isStart: boolean = true;
  showDesc: boolean = true;
  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild('nextButton') nextButton: ElementRef;

  submits = {
    submit_asset_detail: false,
    submit_maintenance: false
  };

  controlStep: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _renderer: Renderer2,
    private _makeDecisionService: MakeDecisionService
  ) {}

  ngOnInit(): void {
    this.controlStep = this._fb.group({
      asset_detail: this._fb.group({
        businessCategory: ['', Validators.compose([Validators.required])],
        receiver: ['', Validators.compose([Validators.required])],
        policyType: ['', Validators.compose([Validators.required])],
        serviceDate: ['', Validators.compose([Validators.required])],
        serviceOdometer: ['', Validators.compose([Validators.required])],
        setReminder: [false, Validators.compose([Validators.required])]
      }),
      maintenance: this._fb.group({
        service: this._fb.group({
          purchase: [true, Validators.compose([Validators.required])],
          integration: [false, Validators.compose([Validators.required])]
        }),
        priodicService: ['', Validators.compose([Validators.required])],
        warrantyPackage: ['', Validators.compose([Validators.required])],
        warrantyDat: ['', Validators.compose([Validators.required])],
        description: ['', Validators.compose([Validators.required])],
        file: ['']
      })
    });
    this._makeDecisionService.activeRadio = '';
    this._makeDecisionService.isStartStepper$.subscribe((x) => {
      this.isStart = x;
    });
  }

  next() {
    if (this.getActiveForm() != '') {
      if (this.controlStep.get(this.getActiveForm()).invalid) {
        return;
      }
    }
    this.stepper.next();
    this.showDesc = false;
  }
  previous() {
    if (this.stepper.selectedIndex > 0) {
      this.stepper.previous();
    } else {
      this._makeDecisionService.isStartStepper$.next(true);
      this.showDesc = true;
    }
  }

  updateform(form) {
    this.controlStep.get(this.getActiveForm()).patchValue(form);
  }

  getActiveForm(): string {
    let indexStepper = this.stepper.selectedIndex;
    switch (indexStepper) {
      case 1: {
        this.submits.submit_asset_detail = true;
        return 'asset_detail';
      }
      case 2: {
        this.submits.submit_maintenance = true;
        return 'maintenance';
      }
      default: {
        return '';
      }
    }
  }
}

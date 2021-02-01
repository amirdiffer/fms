import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MakeDecisionService } from './make-decision.service';

@Component({
  selector: 'inspection-make-decision',
  templateUrl: './make-decision.component.html',
  styleUrls: ['./make-decision.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MakeDecisionComponent implements OnInit {
  isEditable: boolean =true;
  isLinear: boolean  = true;
  isStart: boolean = true;
  @ViewChild ('stepper') stepper : MatStepper;
  @ViewChild ('nextButton') nextButton : ElementRef;

  controlStep: FormGroup;
  constructor(private _fb:FormBuilder,
              private _renderer: Renderer2,
              private _makeDecisionService: MakeDecisionService) { }

  ngOnInit(): void {
    this.controlStep = this._fb.group({})

  }

  next(){
    this.stepper.next();
  }
  previous(){
    if(this.stepper.selectedIndex > 0){
      this.stepper.previous();
    } else{
      this.isStart = true;
    }

  }

}

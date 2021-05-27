import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ButtonType } from '../table.component';

@Component({
  selector: 'table-general-button-renderer',
  template: `
    <div class="button-table-container" *ngIf="CheckCondition()">
      <button
        class="btn-primary-medium"
        *ngIf="col.buttonType == buttonType.approve"
        (click)="col.onClick(row)"
      >
        {{ 'buttons.approve' | translate }}
      </button>
      <button
        class="btn-primary-medium"
        *ngIf="col.buttonType == buttonType.receive"
        (click)="col.onClick(row)"
      >
        {{ 'buttons.receive' | translate }}
      </button>
      <div class='row' *ngIf="col.buttonType == buttonType.receiveAndEdit">
        <div (click)="clickButton('edit')">
          <svg-icon [src]="'assets/icons/edit.svg'" class="svg-icon" [applyClass]="true" [svgStyle]="{ 'fill': null , 'width.em': 2}">
          </svg-icon>
        </div>
        <div class='ml-5'>
          <img class='pointer'
               (click)='clickButton("receive")'
               [src]="'assets/icons/received.png'"
               alt=''
               width='42'
          />
        </div>
      </div>
      <button
        class="btn-primary-medium"
        *ngIf="col.buttonType == buttonType.confirm"
        (click)="clickButton('confirm')"
      >
        {{ 'buttons.confirm' | translate }}
      </button>
      <button
        class="btn-primary-medium reject"
        *ngIf="col.buttonType == buttonType.reject"
        (click)="clickButton('reject',col)"
      >
        {{ 'buttons.reject' | translate }}
      </button>
      <button
        class="btn-primary-medium"
        *ngIf="col.buttonType == buttonType.orderListReject"
      >
        {{ 'buttons.reject' | translate }}
      </button>
    </div>
    <span *ngIf="col.buttonType == buttonType.add && CheckCondition()" class="plus-icon">+</span>
    <img
      *ngIf="col.buttonType == buttonType.action && CheckCondition()"
      class="action-button"
      src="assets/icons/three-dots.svg"
    />
    <button
      *ngIf="col.buttonType == buttonType.jobCard && CheckCondition()"
      class="btn-primary-large job-card"
    >
      <i>+</i
      ><a (click)="_router.navigate(['/workshop/body-shop/add-job-card'])">{{
        'tables.column.job_card' | translate
      }}</a>
    </button>
<!--    <button-->
<!--      *ngIf="col.buttonType == buttonType.makeDecision"-->
<!--      class="btn-primary-large make-decision"-->
<!--      (click)="openMakeDecision()"-->
<!--    >-->
<!--      {{ 'buttons.make_decision' | translate }}-->
<!--    </button>-->
  `,
  styles: [
    `
      .button-table-container {
        position: relative;
      }
      div button {
        padding: 0.6em 1.3em;
        width: 7em;
        position: absolute;
        transform: translate(-50%, -50%);
        left: 50%;
        top: 50%;
        height: auto;
        max-height: 3em;
      }
      button.reject {
        background: #a09999;
        border-color: #a09999;
        width: 6em;
      }
      button.reject:hover {
        background: #a09999;
        border-color: #a09999;
      }
      @media only screen and (max-width: 1824px) {
        .button-table-container {
          font-size: 0.9em;
        }
      }

      span.plus-icon {
        font-weight: 800;
        font-size: 1.7em;
        height: fit-content;
      }
      img.action-button {
        height: 1.3em;
      }
      button.job-card {
        padding: 1em 1em;
        height: auto;
        width: 11em;
        font-size: 1em;
      }
      button.make-decision {
        padding: 1em 0.7em;
        height: 5em;
        width: 11em;
        font-size: 1em;
      }
    `
  ]
})
export class TableGeneralButtonRendererComponent implements OnInit {
  @Input() button;
  @Input() col;
  @Input() row;
  @Input() setting;

  constructor(
    public _router: Router
  ) { }

  ngOnInit() { }

  public get buttonType(): typeof ButtonType {
    return ButtonType;
  }

  clickButton(button,col?): void {
    console.log(col)
    if(col && col.onClick instanceof Function){
      col.onClick(this.button,col);
    }
    if(col && col.click instanceof Function){
      col.click(this.button,col);
    }
    this.setting.onClick(this.button, button);
  }

  CheckCondition() {
    if (this.col?.condition && this.col.condition instanceof Function) {
      return this.col.condition(this.button);
    } else
      return true;
  }
}

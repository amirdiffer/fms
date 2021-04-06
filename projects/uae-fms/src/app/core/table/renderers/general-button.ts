import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MakeDecisionService } from '@feature/workshop/inspections/technical-inspection/make-decision/make-decision.service';
import { environment } from '../../../../environments/environment';
import { ButtonType } from '../table.component';

@Component({
  selector: 'table-general-button-renderer',
  template: `
    <div class="button-table-container">
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
        (click)="clickButton('reject')"
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
    <span *ngIf="col.buttonType == buttonType.add" class="plus-icon">+</span>
    <img
      *ngIf="col.buttonType == buttonType.action"
      class="action-button"
      src="assets/icons/three-dots.svg"
    />
    <button
      *ngIf="col.buttonType == buttonType.jobCard"
      class="btn-primary-large job-card"
    >
      <i>+</i
      ><a (click)="_router.navigate(['/workshop/body-shop/add-job-card'])">{{
        'tables.column.job_card' | translate
      }}</a>
    </button>
    <button
      *ngIf="col.buttonType == buttonType.makeDecision"
      class="btn-primary-large make-decision"
      (click)="openMakeDecision()"
    >
      {{ 'buttons.make_decision' | translate }}
    </button>
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
    private _makeDecisionService: MakeDecisionService,
    public _router: Router
  ) {}

  ngOnInit() {}
  openMakeDecision() {
    this._makeDecisionService.loadMakeDecision(true);
  }

  public get buttonType(): typeof ButtonType {
    return ButtonType;
  }

  clickButton(button): void {
    this.setting.onClick(this.button, button);
  }
}

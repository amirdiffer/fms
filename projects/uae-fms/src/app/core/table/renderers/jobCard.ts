import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'job-card-renderer',
  template: ` <button><span class="plus-icon">+</span> Job Card</button> `,
  styles: [
    `
      button {
        background: #0da06e 0% 0% no-repeat padding-box;
        border-radius: 6px;
        color: #fff;
        font-size: 15px;
        height: 66px;
        border: none;
        padding: 0 20px;
        position:relative;
        margin-left:10px;
        width:100%;
        max-width: 167px;
        padding-left: 35px;
      }
      .plus-icon {
        font-weight: 800;
        font-size: 1.7rem;
        height: fit-content;
        position:absolute;
        left: 50%;
        top: 50%;
        transform: translate(-55px, -55%);
      }
    `
  ]
})
export class JobCardRendererComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

}

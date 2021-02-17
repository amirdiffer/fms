import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'job-card-renderer',
  template: ` 
          <button class="btn-primary-large"><i>+</i><a>Job Card</a></button>`,
  styles: [
    `
    button{
      padding: 1em 1.3em;
      height:auto;
      width:9em
    }
    `
  ]
})
export class JobCardRendererComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

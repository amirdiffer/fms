import { Component, OnInit, Renderer2, } from '@angular/core';


@Component({
  selector: 'table-operation-renderer',
  template: `
    <div class="button-container">
        <button class="btn-reject-table">Reject</button>
        <button class="btn-accept-table">Confirm</button>
    </div>
    `,
  styles: [
      `
        button{
            color:#fff;
            padding: 12px 26px;
            border: none;
            border-radius: 5px;
            min-height: 66px;
            margin: 0 5px;
            font-size:15px;
            font-weight:bold;
        }
        .btn-reject-table{
            background:#A09999; 
        }
        .btn-accept-table{
            background:#0DA06E; 
        }
      `
  ]
})
export class HTMLRendererComponent implements OnInit {


  constructor(private _renderer: Renderer2) {}

  ngOnInit() {
  }
}
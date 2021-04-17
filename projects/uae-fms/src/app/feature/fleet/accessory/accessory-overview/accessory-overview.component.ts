import { ActivatedRoute, Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { Component, ElementRef, OnInit } from '@angular/core';
import { AccessoryService } from '@feature/fleet/+state/accessory/accessory.service';

@Component({
  selector: 'anms-accessory-overview',
  templateUrl: './accessory-overview.component.html',
  styleUrls: ['./accessory-overview.component.scss']
})
export class AccessoryOverviewComponent implements OnInit {
  recordId: number;
  @ViewChild('selectedImage', { static: false }) element: ElementRef;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private accessoryService: AccessoryService
  ) {
    this._route.queryParamMap.subscribe((params) => {
      this.recordId = +params.get('id');
      this.loadAccessoryData(this.recordId);
    });
  }
  loadAccessoryData(recordId: number) { }

  ngOnInit(): void { }
}

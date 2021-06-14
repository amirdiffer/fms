import { ActivatedRoute, Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { Component, ElementRef, OnInit } from '@angular/core';
import { AccessoryService } from '@feature/fleet/+state/accessory/accessory.service';
import { IAccessory } from '@models/accessory';
import {
  AccessoryTypeFacade,
  AccessoryTypeService
} from '@feature/configuration/+state/fleet-configuration';
import { environment } from '@environments/environment';

@Component({
  selector: 'anms-accessory-overview',
  templateUrl: './accessory-overview.component.html',
  styleUrls: ['./accessory-overview.component.scss']
})
export class AccessoryOverviewComponent implements OnInit {
  itemId = this._route.snapshot.params['id'];
  @ViewChild('selectedImage', { static: false }) element: ElementRef;
  fileServerBase = environment.baseFileServer;
  accessoryDetails;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private accessoryService: AccessoryService,
    private accessoryTypeService: AccessoryTypeService
  ) {}

  ngOnInit(): void {
    this.accessoryService.getAccessory(this.itemId).subscribe((x) => {
      this.accessoryDetails = x.message;
      this.accessoryService.users().subscribe((employee) => {
        this.accessoryDetails.assignedToEmployeeId = employee.message.filter(
          (d) => d.id == this.accessoryDetails.assignedToEmployeeId
        )[0];
      });
      console.log(this.accessoryDetails);
    });
  }
}

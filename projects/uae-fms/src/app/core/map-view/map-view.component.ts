import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-view-core',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {
  @Input() iServeVehicles: IServeVehicle[];
  @Input() location: Location;
  @Input() miniMap: boolean = false;
  minClusterSize: 50;
  cluster = true;

  constructor() {}

  ngOnInit(): void {}

  getStatus(code: number) {
    switch (code) {
      case 1:
        return 'map.available';
      default:
        return 'map.unavailable';
    }
  }
}

export interface Location {
  latitude: number;
  longitude: number;
}

export class IServeVehicle {
  id: number;
  make: string;
  icon: string;
  model: string;
  address: string;
  iserveId: string;
  plateNumber: string;
  status: number;
  location: Location;
  batteryLevelPercentage: number;

  constructor(input: IServeVehicleDto, icon?: string) {
    this.id = input.id;
    this.make = input.make;
    this.model = input.model;
    this.status = input.status;
    this.address = input.address;
    this.iserveId = input.iserveId;
    this.plateNumber = input.plateNumber;
    this.location = {
      latitude: input.latitude,
      longitude: input.longitude
    };
    this.icon = icon || 'assets/imgs/map-icons/' + this.getStatus(input.status);
    this.batteryLevelPercentage = input.batteryLevelPercentage;
  }

  getStatus(code: number) {
    switch (code) {
      case 1:
        return 'blue-zone.svg';
      default:
        return 'grey-zone.svg';
    }
  }
}

export interface IServeVehicle {
  address: string;
  model: string;
  id: number;
  make: string;
  iserveId: string;
  batteryLevelPercentage: number;
  status: number;
  location: Location;
  icon: string;
  plateNumber: string;
}

export interface IServeVehicleDto {
  id: number;
  make: string;
  model: string;
  address: string;
  iserveId: string;
  status: number;
  latitude: number;
  longitude: number;
  plateNumber: string;
  batteryLevelPercentage: number;
}

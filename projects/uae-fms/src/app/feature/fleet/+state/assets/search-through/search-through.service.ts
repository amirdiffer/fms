import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AssetSearchThroughService {
    constructor(private _http: HttpClient) {}
}

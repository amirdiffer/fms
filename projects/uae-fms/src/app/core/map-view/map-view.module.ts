import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AgmMarkerClustererModule } from '@agm/markerclusterer';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { MapViewComponent } from './map-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AgmMarkerClustererModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDtGibp9RfgDWOp31jo1oKK37ROw1CGgrg'
    }),
    AgmSnazzyInfoWindowModule,
    TranslateModule
  ],
  exports: [MapViewComponent],
  declarations: [MapViewComponent],
  providers: []
})
export class MapModule {}

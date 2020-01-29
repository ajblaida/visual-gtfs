import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map-container/map/map.component';
import { MapContainerComponent } from './map-container/map-container.component';
import { ControlsContainerComponent } from './controls-container/controls-container.component';

@NgModule({
	declarations: [
		AppComponent,
		MapComponent,
		MapContainerComponent,
		ControlsContainerComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule
	],
		providers: [],
		bootstrap: [AppComponent]
	})
export class AppModule { }

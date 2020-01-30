import { RoutesListComponent } from "./controls-container/routes-list/routes-list.component";
import { OnestopInputComponent } from "./controls-container/onestop-input/onestop-input.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MapComponent } from "./map-container/map/map.component";
import { MapContainerComponent } from "./map-container/map-container.component";
import { ControlsContainerComponent } from "./controls-container/controls-container.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
	declarations: [
		AppComponent,
		MapComponent,
		MapContainerComponent,
		ControlsContainerComponent,
		OnestopInputComponent,
		RoutesListComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		ReactiveFormsModule
	],
		providers: [],
		bootstrap: [AppComponent]
	})
export class AppModule { }

import { InfoBoxComponent } from "./map-container/info-box/info-box.component";
import { SuggestedOperatorsComponent } from "./controls-container/suggested-operators/suggested-operators.component";
import { RouteStopPatternListComponent } from "./controls-container/route-stop-pattern-list/route-stop-pattern-list.component";
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
import { AboutComponent } from "./about/about.component";

@NgModule({
	declarations: [
		AppComponent,
		MapComponent,
		MapContainerComponent,
		ControlsContainerComponent,
		OnestopInputComponent,
		RoutesListComponent,
		RouteStopPatternListComponent,
		SuggestedOperatorsComponent,
		AboutComponent,
		InfoBoxComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		ReactiveFormsModule
	],
	providers: [],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }

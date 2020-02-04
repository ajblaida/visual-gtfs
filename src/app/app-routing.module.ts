import { MapContainerComponent } from "./map-container/map-container.component";
import { MapComponent } from "./map-container/map/map.component";
import { AboutComponent } from "./about/about.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


const routes: Routes = [
	{
		path: "about",
		component: AboutComponent
	},
	{
		path: "visual-gtfs",
		component: MapContainerComponent
	},
	{
		path: "",
		pathMatch: "full",
		redirectTo: "/visual-gtfs"
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

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
		path: "",
		pathMatch: "full",
		component: MapContainerComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

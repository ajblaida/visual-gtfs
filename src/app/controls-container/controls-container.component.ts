import { RouteService } from "./../shared/services/route.service";
import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-controls-container",
	templateUrl: "./controls-container.component.html",
	styleUrls: ["./controls-container.component.css"]
})
export class ControlsContainerComponent implements OnInit {

	constructor(private routeService: RouteService) { }

	ngOnInit() {
		this.routeService.get("")
			.subscribe((results) => console.log(results));
	}

}

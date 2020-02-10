import { RouteStopPattern } from "./../../shared/models/route-stop-pattern.class";
import { takeUntil } from "rxjs/operators";
import { BaseComponent } from "./../../base.component";
import { HoveredSubjectService } from "./../../shared/services/subjects/hovered-subject.service";
import { Component, OnInit } from "@angular/core";
import Route from "src/app/shared/models/route.class";

@Component({
	selector: "app-info-box",
	templateUrl: "./info-box.component.html",
	styleUrls: ["./info-box.component.css"]
})
export class InfoBoxComponent extends BaseComponent implements OnInit {

	private rsp: RouteStopPattern;
	private route: Route;

	constructor(
		private hoveredSubjectService: HoveredSubjectService
	) { super(); }

	ngOnInit() {
		this.hoveredSubjectService.hoveredObject$
			.pipe(
				takeUntil(this.unsubscribe$)
			)
			.subscribe((hovered) => {
				this.updateView(hovered);
			});
	}

	private updateView(hovered: Route | RouteStopPattern ) {
		this.rsp = null;
		this.route = null;

		if (hovered instanceof Route) {
			this.route = hovered;
		} else if (hovered instanceof RouteStopPattern) {
			this.rsp = hovered;
		} else {
			console.log('default');
		}
	}

}

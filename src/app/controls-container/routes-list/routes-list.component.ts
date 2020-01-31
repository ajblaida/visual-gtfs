import { RouteSubjectService } from './../../shared/services/subjects/route-subject.service';
import { Component, OnInit } from "@angular/core";
import RouteResponse from "../../shared/models/route-response.class";
import { tap, filter, switchMap, mergeMap } from "rxjs/operators";
import { Observable } from "rxjs";
import { RouteService } from "../../shared/services/route.service";
import { TransitOperatorSubjectService } from "src/app/shared/services/subjects/transit-operator-subject.service";
import Route from "src/app/shared/models/route.class";

@Component({
	selector: "app-routes-list",
	templateUrl: "./routes-list.component.html",
	styleUrls: ["./routes-list.component.css"]
})
export class RoutesListComponent implements OnInit {
	public vm$: Observable<RouteResponse>;
	public selectedRoute$: Observable<Route>;

	constructor(
		private routeService: RouteService,
		private routeSubjectService: RouteSubjectService,
		private transitOperatorSubjectService: TransitOperatorSubjectService
	) { }

	ngOnInit() {
		this.selectedRoute$ = this.routeSubjectService.selectedRoute$;
		this.vm$ = this.transitOperatorSubjectService.transitOperatorOnestopId$
			.pipe(
				filter(id => id != null),
				switchMap((id) => {
					return this.routeService.get(id);
				})
			);
	}

	onRouteClicked(route: Route) {
		this.routeSubjectService.setSelectedRoute(route);
	}

	clearSelectedRoute() {
		this.routeSubjectService.clear();
	}
}

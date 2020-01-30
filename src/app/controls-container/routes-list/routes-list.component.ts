import { Component, OnInit } from "@angular/core";
import RouteResponse from "../../shared/models/route-response.class";
import { tap, filter, switchMap } from "rxjs/operators";
import { Observable } from 'rxjs';
import { RouteService } from "../../shared/services/route.service";
import { TransitOperatorSubjectService } from "src/app/shared/services/subjects/transit-operator-subject.service";

@Component({
	selector: "app-routes-list",
	templateUrl: "./routes-list.component.html",
	styleUrls: ["./routes-list.component.css"]
})
export class RoutesListComponent implements OnInit {
	public vm$: Observable<RouteResponse>;

	constructor(
		private routeService: RouteService,
		private transitOperatorSubjectService: TransitOperatorSubjectService
	) { }

	ngOnInit() {
		this.vm$ = this.transitOperatorSubjectService.transitOperatorOnestopId$
			.pipe(
				filter(id => id != null),
				switchMap((id) => {
					return this.routeService.get(id)
					.pipe(
						tap((resp: RouteResponse) => console.log(resp))
					);
				})
			);
	}

}

import { switchMap, filter } from 'rxjs/operators';
import { RouteSubjectService } from './route-subject.service';
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import Route from "../../models/route.class";
import { RouteStopPattern } from "../../models/route-stop-pattern.class";
import { RouteStopPatternService } from "../route-stop-pattern.service";

@Injectable({
	providedIn: "root"
})
export class RouteStopPatternSubjectService {
	private routeStopPatternsForSelectedRouteSource = new BehaviorSubject<RouteStopPattern[]>(null);
	public routeStopPatternsForSelectedRoute$ = this.routeStopPatternsForSelectedRouteSource.asObservable();
	private selectedRouteStopPatternBehaviorSubject = new BehaviorSubject<RouteStopPattern>(null);
	public selectedRouteStopPattern$ = this.selectedRouteStopPatternBehaviorSubject.asObservable();

	constructor(private routeSubjectService: RouteSubjectService,
		private routeStopPatternService: RouteStopPatternService) {
		this.routeSubjectService.selectedRoute$
			.pipe(
				filter(route => route != null),
				switchMap(route => this.routeStopPatternService.get(route.onestopId))
			)
			.subscribe(rsps => {
				this.routeStopPatternsForSelectedRouteSource.next(rsps.routeStopPatterns);
			});
	}

	public setSelectedRouteStopPattern(routeStopPattern: RouteStopPattern) {
		this.selectedRouteStopPatternBehaviorSubject.next(routeStopPattern);
	}

	public clear() {
		this.selectedRouteStopPatternBehaviorSubject.next(null);
	}
}

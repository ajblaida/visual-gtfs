import { switchMap, filter, tap } from 'rxjs/operators';
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
	private selectedRouteStopPatternsBehaviorSubject = new BehaviorSubject<RouteStopPattern[]>(null);
	public selectedRouteStopPatterns$ = this.selectedRouteStopPatternsBehaviorSubject.asObservable();

	constructor(private routeSubjectService: RouteSubjectService,
		private routeStopPatternService: RouteStopPatternService) {
		this.routeSubjectService.selectedRoute$
			.pipe(
				tap(route => {
					if (route == null) {
						this.routeStopPatternsForSelectedRouteSource.next(null);
						this.selectedRouteStopPatternsBehaviorSubject.next(null);
					}
				}),
				filter(route => route != null),
				switchMap(route => this.routeStopPatternService.get(route.onestopId))
			)
			.subscribe(rsps => {
				this.routeStopPatternsForSelectedRouteSource.next(rsps.routeStopPatterns);
				this.selectedRouteStopPatternsBehaviorSubject.next(rsps.routeStopPatterns);
			});
	}

	public setSelectedRouteStopPattern(routeStopPatterns: RouteStopPattern[]) {
		this.selectedRouteStopPatternsBehaviorSubject.next(routeStopPatterns);
	}

	public clear() {
		this.selectedRouteStopPatternsBehaviorSubject.next(null);
	}
}

import { VehicleTypesSubjectService } from "./vehicle-types-subject.service";
import { RouteService } from "./../route.service";
import { TransitOperatorSubjectService } from "./transit-operator-subject.service";
import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest } from "rxjs";
import Route from "../../models/route.class";
import { tap, filter, switchMap } from "rxjs/operators";

@Injectable({
	providedIn: "root"
})
export class RouteSubjectService {

	private selectedRouteBehaviorSubject = new BehaviorSubject<Route>(null);
	public selectedRoute$ = this.selectedRouteBehaviorSubject.asObservable();

	private routesForSelectedOperatorSubject = new BehaviorSubject<Route[]>(null);
	public routesForSelectedOperator$ = this.routesForSelectedOperatorSubject.asObservable();

	constructor(
		private transitOperatorSubjectservice: TransitOperatorSubjectService,
		private routeService: RouteService,
		private vehicleTypesSubjectService: VehicleTypesSubjectService
	) {
		combineLatest(
			transitOperatorSubjectservice.transitOperatorOnestopId$,
			vehicleTypesSubjectService.selectedVehicleTypes$)
			.pipe(
				filter((params) => params.every(param => param != null)),
				switchMap(([onestopId, selectedVehicleTypes]) => {
					this.clear();
					return routeService.get(onestopId, selectedVehicleTypes);
				})
			)
			.subscribe((routesResponse) => {
				this.routesForSelectedOperatorSubject.next(routesResponse.routes);
			});
	}

	public setSelectedRoute(route: Route) {
		this.selectedRouteBehaviorSubject.next(route);
	}

	public clear() {
		this.selectedRouteBehaviorSubject.next(null);
	}
}
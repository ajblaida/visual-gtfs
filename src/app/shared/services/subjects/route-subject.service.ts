import { TransitOperatorSubjectService } from './transit-operator-subject.service';
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import Route from "../../models/route.class";

@Injectable({
	providedIn: "root"
})
export class RouteSubjectService {

	private selectedRouteBehaviorSubject = new BehaviorSubject<Route>(null);
	public selectedRoute$ = this.selectedRouteBehaviorSubject.asObservable();

	constructor(private transitOperatorSubjectservice: TransitOperatorSubjectService) {
		transitOperatorSubjectservice.transitOperatorOnestopId$
			.subscribe(() => this.clear());
	}

	public setSelectedRoute(route: Route) {
		this.selectedRouteBehaviorSubject.next(route);
	}

	public clear() {
		this.selectedRouteBehaviorSubject.next(null);
	}
}

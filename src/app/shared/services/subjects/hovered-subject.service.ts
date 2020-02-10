import { RouteStopPattern } from "./../../models/route-stop-pattern.class";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import Route from "../../models/route.class";

@Injectable({
	providedIn: "root"
})
export class HoveredSubjectService {
	private hoveredObjectSource = new BehaviorSubject<Route | RouteStopPattern>(null);
	public hoveredObject$ = this.hoveredObjectSource.asObservable();

	constructor() { }

	public setHovered(types: Route | RouteStopPattern) {
		this.hoveredObjectSource.next(types);
	}

}

import { Injectable } from "@angular/core";
import RouteResponse from "../models/route-response.class";

@Injectable({
	providedIn: "root"
})
export class LocalStorageService {
	localStorage = localStorage;
	operatedByOneStopIdKey = "operatedByOneStopIdKey";
	currentOperatedByOneStopId = null;

	constructor() {
		this.loadRouteOperatedBy();
	}

	public routesByOnestopId(onestopId: string) {
		if (onestopId === this.currentOperatedByOneStopId) {
			return this.localStorage.getItem(this.operatedByOneStopIdKey);
		}
	}

	private loadRouteOperatedBy() {
		const stored = JSON.parse(this.localStorage.getItem(this.operatedByOneStopIdKey)) as RouteResponse;
		if (stored !== null) {
			this.currentOperatedByOneStopId = stored.routes[0].onestopId;
		}
		console.log('from local storage', this.currentOperatedByOneStopId);
	}

	public getSavedRoutes() {
		const stringRoutes = this.localStorage.getItem(this.operatedByOneStopIdKey);
		return JSON.parse(stringRoutes);
	}

	public setRoutesForOnestopId(onestopId: string, routes: RouteResponse) {
		this.localStorage.setItem(this.operatedByOneStopIdKey, JSON.stringify(routes));
		this.currentOperatedByOneStopId = onestopId;
	}
}

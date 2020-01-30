import { LocalStorageService } from './local-storage.service';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";
import RouteDto from "../dto/route-dto.class";
import Route from "../models/route.class";
import RouteResponse from "../models/route-response.class";
import RouteResponseDto from "../dto/route-response-dto.class";

@Injectable({
	providedIn: "root"
})
export class RouteService {

	constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
	}

	get(oneStopId: string): Observable<RouteResponse> {
		const savedRoutes = this.localStorageService.getSavedRoutes()
		if (savedRoutes != null) {
			return of(savedRoutes);
		}
		return this.http.get<RouteResponseDto>(oneStopId)
			.pipe(
				map(dto => new RouteResponse(dto)),
				tap(routes => this.localStorageService.setRoutesForOnestopId(oneStopId, routes))
			);
	}

}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import RouteDto from "../dto/route-dto.class";
import Route from "../models/route.class";
import RouteResponse from "../models/route-response.class";
import RouteResponseDto from "../dto/route-response-dto.class";

@Injectable({
	providedIn: "root"
})
export class RouteService {

	constructor(private http: HttpClient) {
	}

	get(oneStopId: string): Observable<RouteResponse> {
		return this.http.get<RouteResponseDto>
			("https://transit.land/api/v1/routes?operated_by=o-dp3-chicagotransitauthority")
			.pipe(
				map(dto => new RouteResponse(dto))
			);
	}

}

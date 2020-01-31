import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";
import RouteResponse from "../models/responses/route-response.class";
import RouteResponseDto from "../dto/responses/route-response-dto.class";
import { TransitLandClient } from "../models/transit-land-client.class";
import RouteStopPatternResponse from "../models/responses/route-stop-pattern-response.class";
import { RouteStopPatternResponseDto } from "../dto/responses/route-stop-pattern-response-dto.class";

@Injectable({
	providedIn: "root"
})
export class RouteStopPatternService {
	constructor(private http: TransitLandClient) {
	}

	private url = this.http.baseUrl + "route_stop_patterns";

	get(oneStopId: string): Observable<RouteStopPatternResponse> {
		return this.http.get<RouteStopPatternResponseDto>(this.url, {
				params: {
					traversed_by: oneStopId,
					per_page: "10"
				}
			})
			.pipe(
				map(dto => new RouteStopPatternResponse(dto)),
			);
	}

}

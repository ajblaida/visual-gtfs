import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";
import RouteResponse from "../models/responses/route-response.class";
import RouteResponseDto from "../dto/responses/route-response-dto.class";
import { TransitLandClient } from "../models/transit-land-client.class";

@Injectable({
	providedIn: "root"
})
export class RouteService {
	constructor(private http: TransitLandClient) {
	}

	private url = this.http.baseUrl + "routes";

	get(oneStopId: string, selectedVehicleTypes: number[]): Observable<RouteResponse> {
		return this.http.get<RouteResponseDto>(this.url, {
				params: {
					operated_by: oneStopId,
					per_page: "50",
					vehicle_type: selectedVehicleTypes.join(","),
				}
			})
			.pipe(
				map(dto => new RouteResponse(dto)),
			);
	}

}

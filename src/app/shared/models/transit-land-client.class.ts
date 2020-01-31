import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root"
})
export class TransitLandClient extends HttpClient {

	public baseUrl = "https://transit.land/api/v1/";

}

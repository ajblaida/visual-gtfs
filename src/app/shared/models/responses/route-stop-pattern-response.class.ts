import PagedResponse from "./paged-response.class";
import { RouteStopPattern } from "../route-stop-pattern.class";
import { RouteStopPatternResponseDto } from "../../dto/responses/route-stop-pattern-response-dto.class";

export default class RouteStopPatternResponse extends PagedResponse {

	constructor(dto: RouteStopPatternResponseDto) {
		super();
		this.routeStopPatterns = dto.route_stop_patterns.map(rspDto => new RouteStopPattern(rspDto));
		this.metadata = dto.meta;
	}

	routeStopPatterns: RouteStopPattern[];
}

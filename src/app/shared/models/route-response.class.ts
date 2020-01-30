import PagedResponse from "./paged-response.class";
import Route from "./route.class";
import RouteResponseDto from "../dto/route-response-dto.class";

export default class RouteResponse extends PagedResponse {

	constructor(dto: RouteResponseDto) {
		super();
		this.routes = dto.routes.map(routeDto => new Route(routeDto));
		this.metadata = dto.meta;
	}

	routes: Route[];
}

import RouteDto from "../dto/route-dto.class";

export default class Route {
	constructor(dto: RouteDto) {
		this.geometry = dto.geometry;
		this.onestopId = dto.onestop_id;
		this.createdAt = dto.created_at;
		this.updatedAt = dto.updated_at;
		this.tags = dto.tags;
		this.createdOrUpdatedInChangesetId = dto.created_or_updated_in_changeset_id;
		this.name = dto.name;
		this.vehicleType = dto.vehicle_type;
		this.color = dto.color;
		this.stopsServedByRoute = dto.stops_served_by_route;
		this.operatedByOnestopId = dto.operated_by_onestop_id;
		this.operatedByName = dto.operated_by_name;
		this.wheelchairAccessible = dto.wheelchair_accessible;
		this.bikesAllowed = dto.bikes_allowed;
		this.routeStopPatternsByOnestopId = dto.route_stop_patterns_by_onestop_id;
	}
	geometry: any;
	onestopId: string;
	createdAt: Date;
	updatedAt: Date;
	tags: Map<string, any>;
	createdOrUpdatedInChangesetId: number;
	name: string;
	vehicleType: string;
	color: string;
	stopsServedByRoute: any[];
	operatedByOnestopId: string;
	operatedByName: string;
	wheelchairAccessible: string;
	bikesAllowed: string;
	routeStopPatternsByOnestopId: string[];
}

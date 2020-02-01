import { RouteStopPatternDto } from "../dto/route-stop-pattern-dto.class";

export class RouteStopPattern {
	constructor(dto: RouteStopPatternDto) {
		this.geometry = dto.geometry;
		this.onestopId = dto.onestop_id;
		this.createdAt = dto.created_at;
		this.updatedAt = dto.updated_at;
		this.tags = dto.tags;
		this.createdOrUpdatedInChangesetId = dto.created_or_updated_in_changeset_id;
		this.routeOnestopId = dto.route_onestop_id;
		this.stopPattern = dto.stop_pattern;
		this.stopDistances = dto.stop_distances;
		this.geometrySource = dto.geometry_source;
		this.color = dto.color;
		this.trips = dto.trips;
	}

	geometry: any;
	onestopId: string;
	createdAt: Date;
	updatedAt: Date;
	tags: Map<string, string>;
	createdOrUpdatedInChangesetId: number;
	routeOnestopId: string;
	stopPattern: string[];
	stopDistances: number[];
	geometrySource: string;
	color: string;
	trips: string[];
}

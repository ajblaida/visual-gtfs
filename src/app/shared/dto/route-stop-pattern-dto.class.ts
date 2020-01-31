// tslint:disable: variable-name
export class RouteStopPatternDto {
	geometry: any;
	onestop_id: string;
	created_at: Date;
	updated_at: Date;
	tags: Map<string, string>;
	created_or_updated_in_changeset_id: number;
	route_onestop_id: string;
	stop_pattern: string[];
	stop_distances: number[];
	geometry_source: string;
	color: string;
	trips: string[];
}

// tslint:disable: variable-name
export default class RouteDto {
	geometry: any[];
	onestop_id: string;
	created_at: Date;
	updated_at: Date;
	tags: Map<string, any>;
	created_or_updated_in_changeset_id: number;
	name: string;
	vehicle_type: string;
	color: string;
	stops_served_by_route: any[];
	operated_by_onestop_id: string;
	operated_by_name: string;
	wheelchair_accessible: string;
	bikes_allowed: string;
	route_stop_patterns_by_onestop_id: string[];
}

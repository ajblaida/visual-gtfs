// tslint:disable: variable-name
import Metadata from "../../models/responses/metadata.class";
import { RouteStopPatternDto } from "./../route-stop-pattern-dto.class";

export class RouteStopPatternResponseDto {
	route_stop_patterns: RouteStopPatternDto[];
	meta: Metadata;
}

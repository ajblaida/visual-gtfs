// tslint:disable: variable-name

import RouteDto from "../route-dto.class";
import Metadata from "../../models/responses/metadata.class";

export default class RouteResponseDto {
	routes: RouteDto[];
	meta: Metadata;
}

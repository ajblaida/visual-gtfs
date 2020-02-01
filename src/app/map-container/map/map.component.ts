import { MapLayerContainer } from './map-layer-container.class';
import { MapLayer } from './map-layer.class';
import { RouteStopPatternSubjectService } from './../../shared/services/subjects/route-stop-pattern-subject.service';
import { RouteStopPattern } from './../../shared/models/route-stop-pattern.class';
import { Component, OnInit } from "@angular/core";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Feature from "ol/Feature";
import SourceVector from "ol/source/Vector";
import LayerVector from "ol/layer/Vector";
import { LineString, Point } from "ol/geom";
import { Style, Fill, Stroke } from "ol/style";
import { fromLonLat } from "ol/proj";
import { filter } from "rxjs/operators";

@Component({
	selector: "app-map",
	templateUrl: "./map.component.html",
	styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
	private map: Map;
	private allRouteStopPatternsForSelectedRoute: RouteStopPattern[];
	private layers: MapLayerContainer = new MapLayerContainer();

	constructor(private routeStopPatternSubjectService: RouteStopPatternSubjectService) { }

	ngOnInit() {
		this.map = new Map({
			target: "map",
			layers: [
				new TileLayer({
					source: new OSM()
				})
			],
			view: new View({
				center: [0, 0],
				zoom: 0
			})
		});

		this.routeStopPatternSubjectService.routeStopPatternsForSelectedRoute$
			.subscribe(rsps => this.receiveRouteStopPatterns(rsps));

		this.routeStopPatternSubjectService.selectedRouteStopPatterns$
			.pipe(
				filter(rsps => rsps != null)
			)
			.subscribe(selectedRsps => this.updateVisibility(selectedRsps));
	}

	private updateVisibility(selectedRouteStopPatterns: RouteStopPattern[]) {
		this.allRouteStopPatternsForSelectedRoute.forEach(rsp => {
			const isSelected = selectedRouteStopPatterns.findIndex(
				(selectedRsp => selectedRsp.onestopId === rsp.onestopId)) >= 0;
			this.layers.get(rsp.onestopId).lineLayerVector.setVisible(isSelected);
		});
	}

	private receiveRouteStopPatterns(allRouteStopPatterns: RouteStopPattern[]) {
		this.allRouteStopPatternsForSelectedRoute = allRouteStopPatterns;
		if (allRouteStopPatterns == null) {
			for (const layer of this.layers.values()) {
				this.map.removeLayer(layer.lineLayerVector);
			}
			this.layers.clear();
		} else {
			allRouteStopPatterns.forEach(rsp => {
				this.layers.set(rsp.onestopId, this.addStopOverlay(rsp));
			});
		}
	}

	private addStopOverlay(routeStopPattern: RouteStopPattern): MapLayer {
		const lineSourceVector = new SourceVector({});

		const lineLayerVector = new LayerVector({
			source: lineSourceVector,
			style: new Style({
				fill: new Fill({ color: "#f00", weight: 5 }),
				stroke: new Stroke({ color: "#f00", width: 5 })
			}),
		});

		this.map.addLayer(lineLayerVector);
		const points = routeStopPattern.geometry.coordinates;

		for (let i = 0; i < points.length; i++) {
			points[i] = fromLonLat(points[i]);
		}

		const featureLine = new Feature({
			geometry: new LineString(points)
		});

		lineSourceVector.addFeature(featureLine);
		return new MapLayer(lineSourceVector, lineLayerVector);
	}
}

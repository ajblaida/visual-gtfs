import { RouteSubjectService } from './../../shared/services/subjects/route-subject.service';
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
	private colorStep = 0;
	private strokeSize = 10;

	constructor(
		private routeStopPatternSubjectService: RouteStopPatternSubjectService,
		private routeSubjectService: RouteSubjectService) { }

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

		this.routeSubjectService.selectedRoute$
			.subscribe(route => this.reset());

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
			this.reset();
		} else {
			allRouteStopPatterns.forEach(rsp => {
				this.layers.set(rsp.onestopId, this.addStopOverlay(rsp));
			});
		}
	}

	private reset() {
		this.colorStep = 0;
		this.strokeSize = 10;
		for (const layer of this.layers.values()) {
			this.map.removeLayer(layer.lineLayerVector);
		}
		this.layers.clear();
	}

	private addStopOverlay(routeStopPattern: RouteStopPattern): MapLayer {
		const lineSourceVector = new SourceVector({});
		const nextColor = this.rainbow(this.colorStep++);
		const stroke = this.strokeSize;
		this.strokeSize -= 2;
		const lineLayerVector = new LayerVector({
			source: lineSourceVector,
			style: new Style({
				fill: new Fill({ color: nextColor, weight: stroke }),
				stroke: new Stroke({ color: nextColor, width: stroke })
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


	private rainbow(step): string {
		// This function generates vibrant, "evenly spaced" colours (i.e. no clustering). 
		// Adam Cole, 2011-Sept-14
		// HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
		let r, g, b;
		const h = step / this.allRouteStopPatternsForSelectedRoute.length;
		const i = ~~(h * 6);
		const f = h * 6 - i;
		const q = 1 - f;
		switch(i % 6){
			case 0: r = 1; g = f; b = 0; break;
			case 1: r = q; g = 1; b = 0; break;
			case 2: r = 0; g = 1; b = f; break;
			case 3: r = 0; g = q; b = 1; break;
			case 4: r = f; g = 0; b = 1; break;
			case 5: r = 1; g = 0; b = q; break;
		}
		const c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2)
			+ ("00" + (~ ~(g * 255)).toString(16)).slice(-2)
			+ ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
		return (c);
	}
}

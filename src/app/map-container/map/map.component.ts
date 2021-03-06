// tslint:disable: no-bitwise
import { TransitOperatorSubjectService } from "./../../shared/services/subjects/transit-operator-subject.service";
import { RouteSubjectService } from "./../../shared/services/subjects/route-subject.service";
import { MapLayerContainer } from "./map-layer-container.class";
import { MapLayer } from "./map-layer.class";
import { RouteStopPatternSubjectService } from "./../../shared/services/subjects/route-stop-pattern-subject.service";
import { RouteStopPattern } from "./../../shared/models/route-stop-pattern.class";
import { Component, OnInit } from "@angular/core";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import ImageStatic from "ol/source/ImageStatic";
import Feature from "ol/Feature";
import SourceVector from "ol/source/Vector";
import LayerVector from "ol/layer/Vector";
import ImageLayer from "ol/layer/Image";
import { LineString, Point } from "ol/geom";
import { Style, Fill, Stroke, Icon } from "ol/style";
import { fromLonLat } from "ol/proj";
import { filter, takeUntil } from "rxjs/operators";
import { BaseComponent } from "src/app/base.component";

@Component({
	selector: "app-map",
	templateUrl: "./map.component.html",
	styleUrls: ["./map.component.css"]
})
export class MapComponent extends BaseComponent implements OnInit {
	private map: Map;
	private allRouteStopPatternsForSelectedRoute: RouteStopPattern[];
	private layers: MapLayerContainer = new MapLayerContainer();
	private colorStep = 0;
	private strokeSize = 10;

	constructor(
		private transitOperatorSubjectService: TransitOperatorSubjectService,
		private routeStopPatternSubjectService: RouteStopPatternSubjectService,
		private routeSubjectService: RouteSubjectService) { super(); }

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

		this.transitOperatorSubjectService.transitOperatorOnestopId$
			.pipe(
				takeUntil(this.unsubscribe$)
			)
			.subscribe(() => this.reset());

		this.routeSubjectService.selectedRoute$
			.pipe(
				takeUntil(this.unsubscribe$)
			)
			.subscribe(() => this.reset());

		this.routeStopPatternSubjectService.routeStopPatternsForSelectedRoute$
			.pipe(
				takeUntil(this.unsubscribe$)
			)
			.subscribe(rsps => this.receiveRouteStopPatterns(rsps));

		this.routeStopPatternSubjectService.selectedRouteStopPatterns$
			.pipe(
				takeUntil(this.unsubscribe$),
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

		var styleFunction = function(feature) {
			var geometry = feature.getGeometry();
			var styles = [
			// linestring
				new Style({
					fill: new Fill({ color: nextColor, weight: stroke }),
					stroke: new Stroke({ color: nextColor, width: stroke })
				})
			];

        geometry.forEachSegment(function(start, end) {
			var dx = end[0] - start[0];
			var dy = end[1] - start[1];
			var rotation = Math.atan2(dy, dx);
			// arrows
			styles.push(new Style({
				geometry: new Point(end),
				image: new Icon({
				src: 'https://openlayers.org/en/v3.20.1/examples/data/arrow.png',
				anchor: [0.75, 0.5],
				rotateWithView: true,
				rotation: -rotation
				})
			}))});

			return styles;
		}

		const lineLayerVector = new LayerVector({
			source: lineSourceVector,
			style:styleFunction
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
	};


	private rainbow(step: number): string {
		// This function generates vibrant, "evenly spaced" colours (i.e. no clustering).
		// Adapted from Adam Cole, 2011-Sept-14
		// HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
		let r: number;
		let g: number;
		let b: number;
		const h = step / this.allRouteStopPatternsForSelectedRoute.length;

		const i = ~~(h * 6);
		const f = h * 6 - i;
		const q = 1 - f;
		switch (i % 6) {
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

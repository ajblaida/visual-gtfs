import { RouteStopPatternSubjectService } from './../../shared/services/subjects/route-stop-pattern-subject.service';
import { RouteStopPattern } from './../../shared/models/route-stop-pattern.class';
import { Component, OnInit } from "@angular/core";
import {Map, View} from "ol";
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
			.pipe(
				filter(rsps => rsps != null)
			)
			.subscribe(rsps => this.addStopOverlay(rsps));
	}

	addStopOverlay(routeStopPatterns: RouteStopPattern[]) {
		console.log('rsps', routeStopPatterns);
		let points = routeStopPatterns
			.map(rsp => rsp.geometry.coordinates);
			// .reduce((next: number[], collection: number[]) => {
			// 	return collection = collection.concat(next);
			// }, []) as number[][];
		console.log('got points', points);
		points = points[0];
		const vectorPoints = new SourceVector({});

		for (let i = 0; i < points.length; i++) {
			points[i] = fromLonLat(points[i]);
			vectorPoints.addFeature(new Feature({
				geometry: new Point(points[i])
			}));
		}

		const featureLine = new Feature({
			geometry: new LineString(points)
		});

		const vectorLine = new SourceVector({});
		vectorLine.addFeature(featureLine);

		const vectorLineLayer = new LayerVector({
			source: vectorLine,
			style: new Style({
				fill: new Fill({ color: "#f00", weight: 5 }),
				stroke: new Stroke({ color: "#f00", width: 5 })
			})
		});


		const vectorPointlayer = new LayerVector({
			source: vectorPoints
		});


		this.map.addLayer(vectorPointlayer);

		this.map.addLayer(vectorLineLayer);
	}
}

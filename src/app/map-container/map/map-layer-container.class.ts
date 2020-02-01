import { MapLayer } from "./map-layer.class";

export class MapLayerContainer {
	private mapLayers: Map<string, MapLayer> = new Map<string, MapLayer>();

	public get(onestopId: string): MapLayer {
		return this.mapLayers.get(onestopId);
	}

	public set(onestopId: string, mapLayer: MapLayer): void {
		this.mapLayers.set(onestopId, mapLayer);
	}

	public has(onestopId: string): boolean {
		return this.mapLayers.has(onestopId);
	}

	public delete(onestopId: string) {
		this.mapLayers.delete(onestopId);
	}

	public clear() {
		this.mapLayers.clear();
	}

	public values(): IterableIterator<MapLayer> {
		return this.mapLayers.values();
	}
}

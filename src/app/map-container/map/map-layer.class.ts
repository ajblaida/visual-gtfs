import SourceVector from "ol/source/Vector";
import LayerVector from "ol/layer/Vector";

export class MapLayer {
	constructor(
		public lineSourceVector: SourceVector,
		public lineLayerVector: LayerVector
	) { }
}

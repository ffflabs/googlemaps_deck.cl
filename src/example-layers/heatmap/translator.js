import { CompositeLayer } from "@deck.gl/core";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import {
  getGeojsonFeatures,
  separateGeojsonFeatures,
} from "@deck.gl/layers/dist/es6/geojson-layer/geojson";
import { GeoJsonLayer } from "@deck.gl/layers";
export class HeatmapGeojsonLayer extends GeoJsonLayer {
  renderLayers() {
    const { subLayerData, radiusScale,radius=30 ,intensity=1, threshold=0.03} = this.state;
    return [
      new HeatmapLayer(
        this.getSubLayerProps({
          id: "heatmaplayer",
          data: subLayerData,
          pickable: false,
          getPosition: (d) => [d[0], d[1]],
          getWeight: (d) => d[2],
          radiusPixels:radius,
          intensity,
          threshold,
          lineWidthUnits:'meters',
          widthUnits:'meters',
          radiusPixelsUnits:'meters',
          pointRadiusUnits:'meters',
          sizeUnits:'meters',
          radiusUnits:'meters',
          updateTriggers: {
            radiusPixels: radius,intensity,threshold
          },
        })
      ),
    ];
  }
  updateState({ props, changeFlags }) {
    let { data, ...otherProps } = props || {};

    console.log({ changeFlags, otherProps });
    if (!changeFlags.dataChanged) {
      return;
    }

    const features = getGeojsonFeatures(data);
    const wrapFeature = this.getSubLayerRow.bind(this);
    if (Array.isArray(changeFlags.dataChanged)) {
      console.log({ dataChangedArray: changeFlags });
    } else {
      const subLayerData = [];
      features.forEach((feature, index) => {
        let { geometry, properties } = feature,
          { coordinates } = geometry,
          { count } = properties,
          tuple = coordinates.concat([count]);

        // `getSubLayerRow` decorates each data row for the sub layer with a reference to the original object and index
        subLayerData.push(this.getSubLayerRow(tuple, feature, index));
      });

      this.setState({ subLayerData });
    }
  }
}
HeatmapGeojsonLayer.layerName = "HeatmapGeojsonLayer";

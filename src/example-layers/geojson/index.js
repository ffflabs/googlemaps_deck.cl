/*
 * Copyright 2019 Google LLC

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 *  https://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {GeoJsonLayer} from '@deck.gl/layers';
import {scaleThreshold} from 'd3-scale';

export const COLOR_SCALE = scaleThreshold()
  .domain([ 
  10000,
  20000,
  30000,
  40000,
  50000,
  60000,
  70000,
  80000,
  90000,
  100000,
  120000,
  130000,
  140000,
  150000])
  

  .range([
    [65, 182, 196],
    [127, 205, 187],
    [199, 233, 180],
    [237, 248, 177],
    // zero
    [255, 255, 204],
    [255, 237, 160],
    [254, 217, 118],
    [254, 178, 76],
    [253, 141, 60],
    [252, 78, 42],
    [227, 26, 28],
    [189, 0, 38],
    [128, 0, 38]
  ]);
/*
 * Demo of ArcLayer that renders Chicago taxi trips 
 * between neighborhood centroid origin and destination points
 *
 * Datasource: Chicago Data Portal
 * https://data.cityofchicago.org/Transportation/Taxi-Trips/wrvz-psew
 */
export class GeoJsonLayerExample {
  constructor() {}
	static async *getLayers() {   
    const data_uri = '/geojson/comunas.json',
          qs = '?$LIMIT=25000&$WHERE=pickup_centroid_latitude IS NOT NULL AND dropoff_centroid_latitude IS NOT NULL';
    
    const layers = [
      new GeoJsonLayer({
        id: 'comunas',
        data: data_uri + qs,

        getSourceColor: [0, 128, 200],
        getTargetColor: [255, 101, 101],
        getWidth: 0.5,
        getElevation: 30,

        filled:true,
        stroked:true,
        lineWidthUnits:'pixels',
        pointRadiusUnits:'pixels',
        autoHighlight: true,
        getFillColor: f => COLOR_SCALE(f.properties.poblacion),
        pickable: true,
        onClick:(info,event)=>{
          let {object}=info||{},
          {properties}=object||{};
          console.log({properties});
        }
    	})
    ];

    return layers;
  }
  static getMapOptions() {
    return {
      center: { lat: -33.8, lng: -71 },
      zoom: 9
    }
  }
  static getMetadata() {
    return {
      name: 'geojson',
      thumbnail: 'geojson-layer-polygons.jpg'
    }
  }
}
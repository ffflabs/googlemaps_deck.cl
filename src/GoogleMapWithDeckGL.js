/// <reference types="googlemaps" />
// @ts-check
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
 
// Set your API key in src/googleMapsAPIKey or GoogleMapsAPIKey env var
 import {GoogleMapsOverlay} from '@deck.gl/google-maps';

// Initializes Google Maps JS API, draws base map and adds Deck.gl overlay
export class GoogleMapWithDeckGL {
  constructor(google_maps_api_key) {        
    this.google_maps_api_key = google_maps_api_key;
    this.api;
    this.map;
    this.overlay;
  }

  // Load the Google Maps Platform JS API async
  loadScript() {
    const GOOGLE_MAPS_API_KEY = this.google_maps_api_key || process.env.GoogleMapsAPIKey;
    const GOOGLE_MAPS_API_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&v=beta&map_ids=8e86dcd23303b13,a50b77796a8cd686,17ab4b912239dd93`;
    const head = document.querySelector('head');
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = GOOGLE_MAPS_API_URL;    
    head.appendChild(script);
    return new Promise(resolve => {
      script.onload = resolve;
    });
  }

  async initMapWithOverlay(options) {
    // Init the Google Maps JS API and base map
    await this.loadScript();
    this.api = google.maps;
    this.overlay = new GoogleMapsOverlay();    
    this.map = new this.api.Map(document.getElementById('map'), {
      center: options.center,
      zoom: options.zoom,
      mapId:'8e86dcd23303b13',
      useStaticMap: true,
    });    

    // Put the Deck.gl overlay on the map
    this.overlay.setMap(this.map);    
  }

  // Reposition the map for selected demo
  setMap(map_options) {  
    this.map.setCenter(map_options.center);
    this.map.setZoom(map_options.zoom);    
  } 

  setLayer(deckgl_layers) {    
    this.overlay.setProps({layers: deckgl_layers});    
  }
}
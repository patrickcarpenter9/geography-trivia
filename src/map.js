// Everything to do with the Leaflet map lives here, so the rest of the game
// never has to touch Leaflet directly.
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// A box around the contiguous 48 states, as [south-west corner, north-east corner].
// Coordinates are [latitude, longitude], the order Leaflet uses.
const CONTIGUOUS_US = L.latLngBounds([24.4, -125.0], [49.5, -66.9]);

// Basemap with NO place labels. A labelled map would print the answer
// right where the player is supposed to guess it.
// Esri's "Light Gray Base" is the gray canvas with its label layer split off,
// and it loads without an API key. The attribution credit is required.
// Note Esri's URL puts {y} before {x}, unlike most tile servers.
const TILE_URL =
  'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}';
const ATTRIBUTION = 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ';
const MAX_ZOOM = 6;

/**
 * Create the map inside the element with the given id and return it.
 */
export function createMap(elementId) {
  const map = L.map(elementId, {
    // Keep the player near the US: panning stops a little past the edges...
    maxBounds: CONTIGUOUS_US.pad(0.25),
    maxBoundsViscosity: 1.0, // 1.0 = a hard wall instead of a rubber-band bounce
    // ...and they can't zoom out to the whole world.
    minZoom: 3,
    // These tiles start printing state names at zoom 7, so stop at 6.
    // That's still close enough to place a pin within a few miles.
    maxZoom: MAX_ZOOM,
  });

  L.tileLayer(TILE_URL, {
    attribution: ATTRIBUTION,
    maxZoom: MAX_ZOOM,
  }).addTo(map);

  // Start with the whole contiguous US in view, whatever the screen size.
  map.fitBounds(CONTIGUOUS_US);

  return map;
}

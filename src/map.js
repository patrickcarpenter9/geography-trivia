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

// Pin styles. We draw pins as circles instead of Leaflet's default marker
// image, which needs extra setup to load correctly when bundled by Vite.
const GUESS_STYLE = { radius: 8, color: '#fff', weight: 2, fillColor: '#2563eb', fillOpacity: 1 };
const ANSWER_STYLE = { radius: 8, color: '#fff', weight: 2, fillColor: '#16a34a', fillOpacity: 1 };
const LINE_STYLE = { color: '#374151', weight: 2, dashArray: '6 6' };

// The module keeps one map and one "layer group" holding this round's pins.
// Clearing the group removes every pin at once.
let map;
let roundLayer;
let guessPin = null;

/**
 * Create the map inside the element with the given id.
 */
export function createMap(elementId) {
  map = L.map(elementId, {
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

  roundLayer = L.layerGroup().addTo(map);
  showWholeCountry();
}

/**
 * Call `handler(lat, lng)` whenever the player clicks the map.
 */
export function onMapClick(handler) {
  map.on('click', (event) => handler(event.latlng.lat, event.latlng.lng));
}

/**
 * Put the player's guess pin at this spot, moving it if it's already there.
 */
export function setGuessPin(lat, lng) {
  if (guessPin) {
    guessPin.setLatLng([lat, lng]);
  } else {
    guessPin = L.circleMarker([lat, lng], GUESS_STYLE).addTo(roundLayer);
  }
}

/**
 * Show the real location, draw a line from the guess to it,
 * and zoom so both are in view.
 */
export function revealAnswer(guess, answer, label) {
  const answerPin = L.circleMarker([answer.lat, answer.lng], ANSWER_STYLE)
    .bindTooltip(label, { permanent: true, direction: 'top', offset: [0, -8] })
    .addTo(roundLayer);
  L.polyline([[guess.lat, guess.lng], [answer.lat, answer.lng]], LINE_STYLE).addTo(roundLayer);
  answerPin.bringToFront();

  const bothPoints = L.latLngBounds([[guess.lat, guess.lng], [answer.lat, answer.lng]]);
  map.flyToBounds(bothPoints, { padding: [80, 80], maxZoom: MAX_ZOOM, duration: 0.8 });
}

/**
 * Remove all pins and lines and zoom back out to the whole country.
 */
export function clearRound() {
  roundLayer.clearLayers();
  guessPin = null;
  showWholeCountry();
}

function showWholeCountry() {
  map.fitBounds(CONTIGUOUS_US);
}

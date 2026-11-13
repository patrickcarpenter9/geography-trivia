// Entry point. Vite starts here (see the <script> tag in index.html).
import './style.css';
import { createMap } from './map.js';

document.querySelector('#app').innerHTML = `
  <header class="topbar">
    <h1>Geography Trivia</h1>
  </header>
  <div id="map"></div>
`;

// The map needs its container to exist first, so create it after the HTML above.
createMap('map');

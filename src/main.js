// Entry point. Vite starts here (see the <script> tag in index.html).
// main.js only sets things up in the right order; the logic lives in the modules.
import './style.css';
import { renderLayout } from './ui.js';
import { createMap } from './map.js';
import { startGame } from './game.js';

renderLayout(); // 1. build the page, including the empty #map container
createMap('map'); // 2. the map needs that container to exist
startGame(); // 3. hook up clicks and ask the first question

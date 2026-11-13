// Everything that changes text or buttons on the page lives here.
// game.js decides WHAT to show; this file knows HOW to show it.

/**
 * Build the page layout inside #app. Call once at startup.
 */
export function renderLayout() {
  document.querySelector('#app').innerHTML = `
    <header class="topbar">
      <h1>Geography Trivia</h1>
      <div class="round">
        <p class="prompt" id="prompt"></p>
        <p class="message" id="message"></p>
      </div>
      <button class="action" id="action" type="button"></button>
    </header>
    <div id="map"></div>
  `;
}

/** Big line at the top, e.g. "Where is Austin, TX?" */
export function setPrompt(text) {
  document.querySelector('#prompt').textContent = text;
}

/** Smaller hint or result under the prompt. */
export function setMessage(text) {
  document.querySelector('#message').textContent = text;
}

/**
 * Update the main button's label and whether it can be clicked.
 */
export function setButton(label, enabled) {
  const button = document.querySelector('#action');
  button.textContent = label;
  button.disabled = !enabled;
}

/**
 * Run `handler` when the main button is clicked.
 */
export function onButtonClick(handler) {
  document.querySelector('#action').addEventListener('click', handler);
}

/**
 * Show a crosshair over the map while the player can place a pin.
 */
export function setMapClickable(clickable) {
  document.querySelector('#map').classList.toggle('placing', clickable);
}

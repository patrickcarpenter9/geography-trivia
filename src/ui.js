// Everything that changes text or buttons on the page lives here.
// game.js decides WHAT to show; this file knows HOW to show it.

/**
 * Build the page layout inside #app. Call once at startup.
 */
export function renderLayout() {
  document.querySelector('#app').innerHTML = `
    <header class="topbar">
      <div class="brand">
        <h1>Geography Trivia</h1>
        <p class="status" id="status"></p>
      </div>
      <div class="round">
        <p class="prompt" id="prompt"></p>
        <p class="message" id="message"></p>
      </div>
      <button class="action" id="action" type="button"></button>
    </header>
    <main class="stage">
      <div id="map"></div>
      <section class="summary" id="summary" hidden>
        <h2>Final score</h2>
        <p class="summary-total" id="summary-total"></p>
        <ol class="summary-rounds" id="summary-rounds"></ol>
      </section>
    </main>
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

/** Small line under the title, e.g. "Round 2 of 5 · 7,340 points" */
export function setStatus(text) {
  document.querySelector('#status').textContent = text;
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

/**
 * Show the end-of-game panel over the map.
 * `rounds` is a list of { label, miles, points }.
 */
export function showSummary(totalText, rounds) {
  document.querySelector('#summary-total').textContent = totalText;

  const list = document.querySelector('#summary-rounds');
  list.replaceChildren(); // remove rows from the previous game
  for (const round of rounds) {
    // Build each row with textContent rather than an HTML string: it's a good
    // habit, because text can never be mistaken for HTML tags this way.
    const row = document.createElement('li');
    const name = document.createElement('span');
    const detail = document.createElement('span');
    name.textContent = round.label;
    detail.textContent = `${round.miles} · ${round.points} pts`;
    detail.className = 'summary-detail';
    row.append(name, detail);
    list.append(row);
  }

  document.querySelector('#summary').hidden = false;
}

export function hideSummary() {
  document.querySelector('#summary').hidden = true;
}

// The rules of a round. This file holds the game's state and decides what
// happens next; it calls map.js and ui.js to actually show things.
import { CITIES } from './data/cities.js';
import { onMapClick, setGuessPin, revealAnswer, clearRound } from './map.js';
import { setPrompt, setMessage, setButton, onButtonClick, setMapClickable } from './ui.js';

// A round is in one of two phases:
//   'guessing' – the player is placing (and can still move) their pin
//   'revealed' – the answer is showing; the button moves on to the next city
let phase = 'guessing';
let city = null; // the city being asked about
let guess = null; // { lat, lng } of the player's pin, or null if not placed yet

/**
 * Hook up the click handlers and start the first round. Call once.
 */
export function startGame() {
  onMapClick(handleMapClick);
  onButtonClick(handleButtonClick);
  startRound();
}

function startRound() {
  city = pickRandomCity(city);
  guess = null;
  phase = 'guessing';

  clearRound();
  setPrompt(`Where is ${cityLabel(city)}?`);
  setMessage('Click the map to drop a pin. Click again to move it.');
  setButton('Submit guess', false);
  setMapClickable(true);
}

function handleMapClick(lat, lng) {
  // Once the answer is showing, clicks on the map do nothing.
  if (phase !== 'guessing') return;

  guess = { lat, lng };
  setGuessPin(lat, lng);
  setButton('Submit guess', true);
}

function handleButtonClick() {
  if (phase === 'guessing' && guess) {
    phase = 'revealed';
    revealAnswer(guess, city, cityLabel(city));
    setMessage(`Green is ${cityLabel(city)}. Blue is your guess.`);
    setButton('Next city', true);
    setMapClickable(false);
  } else if (phase === 'revealed') {
    startRound();
  }
}

/** "Austin, TX": always include the state, since some names repeat. */
function cityLabel(c) {
  return `${c.name}, ${c.state}`;
}

/** Pick a random city, never the same one twice in a row. */
function pickRandomCity(previous) {
  let next;
  do {
    next = CITIES[Math.floor(Math.random() * CITIES.length)];
  } while (next === previous);
  return next;
}

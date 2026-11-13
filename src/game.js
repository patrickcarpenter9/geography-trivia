// The rules of the game. This file holds the game's state and decides what
// happens next; it calls map.js and ui.js to actually show things.
import { CITIES } from './data/cities.js';
import { distanceMiles, pointsForDistance, MAX_POINTS } from './scoring.js';
import { onMapClick, setGuessPin, revealAnswer, clearRound } from './map.js';
import {
  setPrompt,
  setMessage,
  setStatus,
  setButton,
  onButtonClick,
  setMapClickable,
  showSummary,
  hideSummary,
} from './ui.js';

const ROUNDS_PER_GAME = 5;

// The game moves through these phases:
//   'guessing' – the player is placing (and can still move) their pin
//   'revealed' – the answer is showing; the button goes to the next round
//   'finished' – the final score panel is showing; the button starts a new game
let phase = 'guessing';
let cities = []; // this game's cities, chosen up front so none repeat
let roundIndex = 0; // 0 for the first round, 1 for the second, ...
let guess = null; // { lat, lng } of the player's pin, or null if not placed yet
let results = []; // one { city, miles, points } per finished round

/**
 * Hook up the click handlers and start the first game. Call once.
 */
export function startGame() {
  onMapClick(handleMapClick);
  onButtonClick(handleButtonClick);
  newGame();
}

function newGame() {
  cities = shuffle(CITIES).slice(0, ROUNDS_PER_GAME);
  roundIndex = 0;
  results = [];
  hideSummary();
  startRound();
}

function startRound() {
  guess = null;
  phase = 'guessing';

  clearRound();
  updateStatus();
  setPrompt(`Where is ${cityLabel(currentCity())}?`);
  setMessage('Click the map to drop a pin. Click again to move it.');
  setButton('Submit guess', false);
  setMapClickable(true);
}

function handleMapClick(lat, lng) {
  // Only while guessing; otherwise clicks on the map do nothing.
  if (phase !== 'guessing') return;

  guess = { lat, lng };
  setGuessPin(lat, lng);
  setButton('Submit guess', true);
}

function handleButtonClick() {
  if (phase === 'guessing' && guess) {
    submitGuess();
  } else if (phase === 'revealed' && isLastRound()) {
    finishGame();
  } else if (phase === 'revealed') {
    roundIndex++;
    startRound();
  } else if (phase === 'finished') {
    newGame();
  }
}

function submitGuess() {
  phase = 'revealed';
  const city = currentCity();
  const miles = distanceMiles(guess, city);
  const points = pointsForDistance(miles);
  results.push({ city, miles, points });

  revealAnswer(guess, city, cityLabel(city));
  updateStatus();
  setMessage(`${formatMiles(miles)} away: ${formatPoints(points)} of ${formatPoints(MAX_POINTS)} points.`);
  setButton(isLastRound() ? 'See final score' : 'Next city', true);
  setMapClickable(false);
}

function finishGame() {
  phase = 'finished';
  const best = ROUNDS_PER_GAME * MAX_POINTS;

  clearRound(); // zoom back out so the results panel sits over a clean map
  setPrompt('Game over!');
  setMessage(`You scored ${formatPoints(totalScore())} of ${formatPoints(best)} possible points.`);
  setButton('Play again', true);
  showSummary(
    `${formatPoints(totalScore())} / ${formatPoints(best)}`,
    results.map((r) => ({
      label: cityLabel(r.city),
      miles: formatMiles(r.miles),
      points: formatPoints(r.points),
    })),
  );
}

function updateStatus() {
  setStatus(`Round ${roundIndex + 1} of ${ROUNDS_PER_GAME} · ${formatPoints(totalScore())} points`);
}

// --- Small helpers -----------------------------------------------------------

function currentCity() {
  return cities[roundIndex];
}

function isLastRound() {
  return roundIndex === ROUNDS_PER_GAME - 1;
}

function totalScore() {
  return results.reduce((sum, r) => sum + r.points, 0);
}

/** "Austin, TX": always include the state, since some names repeat. */
function cityLabel(c) {
  return `${c.name}, ${c.state}`;
}

/** "1 mile", "37 miles", "1,204 miles" */
function formatMiles(miles) {
  const rounded = Math.round(miles);
  return `${rounded.toLocaleString()} ${rounded === 1 ? 'mile' : 'miles'}`;
}

/** 12345 → "12,345" */
function formatPoints(points) {
  return points.toLocaleString();
}

/**
 * Return a shuffled copy of a list (the original is left alone).
 * This is the Fisher–Yates shuffle: walk backwards, swapping each item with a
 * random one at or before it. Every order is equally likely.
 */
function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

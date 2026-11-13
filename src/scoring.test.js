// Tests for scoring.js. Run with: npm test
// Uses Node's built-in test runner, so there's nothing extra to install.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { distanceMiles, pointsForDistance, MAX_POINTS } from './scoring.js';

const NEW_YORK = { lat: 40.7128, lng: -74.006 };
const LOS_ANGELES = { lat: 34.0522, lng: -118.2437 };
const CHICAGO = { lat: 41.8781, lng: -87.6298 };

test('distance from a place to itself is 0', () => {
  assert.equal(distanceMiles(NEW_YORK, NEW_YORK), 0);
});

test('New York to Los Angeles is about 2,445 miles', () => {
  const miles = distanceMiles(NEW_YORK, LOS_ANGELES);
  assert.ok(Math.abs(miles - 2445) < 10, `got ${miles}`);
});

test('New York to Chicago is about 712 miles', () => {
  const miles = distanceMiles(NEW_YORK, CHICAGO);
  assert.ok(Math.abs(miles - 712) < 10, `got ${miles}`);
});

test('distance is the same in both directions', () => {
  assert.equal(distanceMiles(NEW_YORK, CHICAGO), distanceMiles(CHICAGO, NEW_YORK));
});

test('a near-perfect guess gets full points', () => {
  assert.equal(pointsForDistance(0), MAX_POINTS);
  assert.equal(pointsForDistance(4), MAX_POINTS);
});

test('points go down as distance goes up', () => {
  const distances = [10, 50, 100, 250, 500, 1000, 2000];
  const points = distances.map(pointsForDistance);
  for (let i = 1; i < points.length; i++) {
    assert.ok(points[i] < points[i - 1], `${distances[i]} mi should score less than ${distances[i - 1]} mi`);
  }
});

test('points are whole numbers and never negative', () => {
  for (const miles of [6, 123.4, 999.9, 3000, 10000]) {
    const points = pointsForDistance(miles);
    assert.ok(Number.isInteger(points));
    assert.ok(points >= 0);
  }
});

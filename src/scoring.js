// Pure math: no map, no page. Give it numbers, get numbers back.
// That makes it easy to test (see scoring.test.js).

const EARTH_RADIUS_MILES = 3958.8;

/** The most points one round can give. */
export const MAX_POINTS = 5000;

// Guesses this close count as perfect. At the map's closest zoom a click
// can only be placed within a few miles, so demanding exactness is unfair.
const PERFECT_WITHIN_MILES = 5;

// Controls how fast points drop off with distance. With 500:
//   50 mi → ~4,500   100 mi → ~4,100   250 mi → ~3,000
//   500 mi → ~1,800   1,000 mi → ~700   2,000 mi → ~90
const FALLOFF_MILES = 500;

/**
 * Straight-line distance in miles between two { lat, lng } points,
 * measured along the Earth's surface (the "haversine" formula).
 *
 * Why not just Pythagoras on lat/lng? Because a degree of longitude gets
 * shorter as you go north: about 69 miles at the equator but only ~45 at
 * the Canadian border. Haversine treats the Earth as a sphere, which is
 * accurate to within about 0.5% and plenty for a game.
 */
export function distanceMiles(a, b) {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;

  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);

  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * EARTH_RADIUS_MILES * Math.asin(Math.sqrt(h));
}

/**
 * Turn a distance into points: MAX_POINTS for a near-perfect guess,
 * smoothly dropping toward 0 the farther away you are. Never negative.
 */
export function pointsForDistance(miles) {
  if (miles <= PERFECT_WITHIN_MILES) return MAX_POINTS;
  return Math.round(MAX_POINTS * Math.exp(-miles / FALLOFF_MILES));
}

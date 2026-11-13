// The cities the game can ask about: contiguous US only (no Alaska or Hawaii yet).
// At least one city from each of the 48 states, plus Washington, DC.
//
// Each entry: { name, state, lat, lng }
//   state:    two-letter postal code
//   lat, lng: roughly the city center, in decimal degrees.
//             Latitude is north (+); longitude is west (−) in the US.
//
// To add a city, look up its coordinates (e.g. on Wikipedia's infobox) and
// add a line in the matching region below.

export const CITIES = [
  // Northeast
  { name: 'New York', state: 'NY', lat: 40.7128, lng: -74.006 },
  { name: 'Buffalo', state: 'NY', lat: 42.8864, lng: -78.8784 },
  { name: 'Albany', state: 'NY', lat: 42.6526, lng: -73.7562 },
  { name: 'Philadelphia', state: 'PA', lat: 39.9526, lng: -75.1652 },
  { name: 'Pittsburgh', state: 'PA', lat: 40.4406, lng: -79.9959 },
  { name: 'Boston', state: 'MA', lat: 42.3601, lng: -71.0589 },
  { name: 'Providence', state: 'RI', lat: 41.824, lng: -71.4128 },
  { name: 'Hartford', state: 'CT', lat: 41.7658, lng: -72.6734 },
  { name: 'Portland', state: 'ME', lat: 43.6591, lng: -70.2568 },
  { name: 'Burlington', state: 'VT', lat: 44.4759, lng: -73.2121 },
  { name: 'Manchester', state: 'NH', lat: 42.9956, lng: -71.4548 },
  { name: 'Newark', state: 'NJ', lat: 40.7357, lng: -74.1724 },

  // Mid-Atlantic
  { name: 'Washington', state: 'DC', lat: 38.9072, lng: -77.0369 },
  { name: 'Baltimore', state: 'MD', lat: 39.2904, lng: -76.6122 },
  { name: 'Wilmington', state: 'DE', lat: 39.7391, lng: -75.5398 },
  { name: 'Richmond', state: 'VA', lat: 37.5407, lng: -77.436 },
  { name: 'Charleston', state: 'WV', lat: 38.3498, lng: -81.6326 },

  // Southeast
  { name: 'Atlanta', state: 'GA', lat: 33.749, lng: -84.388 },
  { name: 'Savannah', state: 'GA', lat: 32.0809, lng: -81.0912 },
  { name: 'Miami', state: 'FL', lat: 25.7617, lng: -80.1918 },
  { name: 'Orlando', state: 'FL', lat: 28.5383, lng: -81.3792 },
  { name: 'Tampa', state: 'FL', lat: 27.9506, lng: -82.4572 },
  { name: 'Jacksonville', state: 'FL', lat: 30.3322, lng: -81.6557 },
  { name: 'Charlotte', state: 'NC', lat: 35.2271, lng: -80.8431 },
  { name: 'Raleigh', state: 'NC', lat: 35.7796, lng: -78.6382 },
  { name: 'Charleston', state: 'SC', lat: 32.7765, lng: -79.9311 },
  { name: 'Columbia', state: 'SC', lat: 34.0007, lng: -81.0348 },
  { name: 'Nashville', state: 'TN', lat: 36.1627, lng: -86.7816 },
  { name: 'Memphis', state: 'TN', lat: 35.1495, lng: -90.049 },
  { name: 'Knoxville', state: 'TN', lat: 35.9606, lng: -83.9207 },
  { name: 'Louisville', state: 'KY', lat: 38.2527, lng: -85.7585 },
  { name: 'Lexington', state: 'KY', lat: 38.0406, lng: -84.5037 },
  { name: 'Birmingham', state: 'AL', lat: 33.5186, lng: -86.8104 },
  { name: 'Montgomery', state: 'AL', lat: 32.3792, lng: -86.3077 },
  { name: 'Jackson', state: 'MS', lat: 32.2988, lng: -90.1848 },
  { name: 'New Orleans', state: 'LA', lat: 29.9511, lng: -90.0715 },
  { name: 'Baton Rouge', state: 'LA', lat: 30.4515, lng: -91.1871 },
  { name: 'Little Rock', state: 'AR', lat: 34.7465, lng: -92.2896 },

  // Midwest
  { name: 'Chicago', state: 'IL', lat: 41.8781, lng: -87.6298 },
  { name: 'Detroit', state: 'MI', lat: 42.3314, lng: -83.0458 },
  { name: 'Grand Rapids', state: 'MI', lat: 42.9634, lng: -85.6681 },
  { name: 'Columbus', state: 'OH', lat: 39.9612, lng: -82.9988 },
  { name: 'Cleveland', state: 'OH', lat: 41.4993, lng: -81.6944 },
  { name: 'Cincinnati', state: 'OH', lat: 39.1031, lng: -84.512 },
  { name: 'Indianapolis', state: 'IN', lat: 39.7684, lng: -86.1581 },
  { name: 'Milwaukee', state: 'WI', lat: 43.0389, lng: -87.9065 },
  { name: 'Madison', state: 'WI', lat: 43.0731, lng: -89.4012 },
  { name: 'Minneapolis', state: 'MN', lat: 44.9778, lng: -93.265 },
  { name: 'Duluth', state: 'MN', lat: 46.7867, lng: -92.1005 },
  { name: 'Des Moines', state: 'IA', lat: 41.5868, lng: -93.625 },
  { name: 'St. Louis', state: 'MO', lat: 38.627, lng: -90.1994 },
  { name: 'Kansas City', state: 'MO', lat: 39.0997, lng: -94.5786 },
  { name: 'Wichita', state: 'KS', lat: 37.6872, lng: -97.3301 },
  { name: 'Omaha', state: 'NE', lat: 41.2565, lng: -95.9345 },
  { name: 'Lincoln', state: 'NE', lat: 40.8136, lng: -96.7026 },
  { name: 'Fargo', state: 'ND', lat: 46.8772, lng: -96.7898 },
  { name: 'Bismarck', state: 'ND', lat: 46.8083, lng: -100.7837 },
  { name: 'Sioux Falls', state: 'SD', lat: 43.5446, lng: -96.7311 },
  { name: 'Rapid City', state: 'SD', lat: 44.0805, lng: -103.231 },

  // South Central
  { name: 'Houston', state: 'TX', lat: 29.7604, lng: -95.3698 },
  { name: 'Dallas', state: 'TX', lat: 32.7767, lng: -96.797 },
  { name: 'Fort Worth', state: 'TX', lat: 32.7555, lng: -97.3308 },
  { name: 'San Antonio', state: 'TX', lat: 29.4241, lng: -98.4936 },
  { name: 'Austin', state: 'TX', lat: 30.2672, lng: -97.7431 },
  { name: 'El Paso', state: 'TX', lat: 31.7619, lng: -106.485 },
  { name: 'Amarillo', state: 'TX', lat: 35.222, lng: -101.8313 },
  { name: 'Oklahoma City', state: 'OK', lat: 35.4676, lng: -97.5164 },
  { name: 'Tulsa', state: 'OK', lat: 36.154, lng: -95.9928 },

  // Mountain West
  { name: 'Denver', state: 'CO', lat: 39.7392, lng: -104.9903 },
  { name: 'Colorado Springs', state: 'CO', lat: 38.8339, lng: -104.8214 },
  { name: 'Salt Lake City', state: 'UT', lat: 40.7608, lng: -111.891 },
  { name: 'Phoenix', state: 'AZ', lat: 33.4484, lng: -112.074 },
  { name: 'Tucson', state: 'AZ', lat: 32.2226, lng: -110.9747 },
  { name: 'Flagstaff', state: 'AZ', lat: 35.1983, lng: -111.6513 },
  { name: 'Albuquerque', state: 'NM', lat: 35.0844, lng: -106.6504 },
  { name: 'Santa Fe', state: 'NM', lat: 35.687, lng: -105.9378 },
  { name: 'Las Vegas', state: 'NV', lat: 36.1699, lng: -115.1398 },
  { name: 'Reno', state: 'NV', lat: 39.5296, lng: -119.8138 },
  { name: 'Boise', state: 'ID', lat: 43.615, lng: -116.2023 },
  { name: 'Billings', state: 'MT', lat: 45.7833, lng: -108.5007 },
  { name: 'Missoula', state: 'MT', lat: 46.8721, lng: -113.994 },
  { name: 'Cheyenne', state: 'WY', lat: 41.14, lng: -104.8202 },

  // Pacific
  { name: 'Los Angeles', state: 'CA', lat: 34.0522, lng: -118.2437 },
  { name: 'San Francisco', state: 'CA', lat: 37.7749, lng: -122.4194 },
  { name: 'San Diego', state: 'CA', lat: 32.7157, lng: -117.1611 },
  { name: 'San Jose', state: 'CA', lat: 37.3382, lng: -121.8863 },
  { name: 'Sacramento', state: 'CA', lat: 38.5816, lng: -121.4944 },
  { name: 'Fresno', state: 'CA', lat: 36.7378, lng: -119.7871 },
  { name: 'Seattle', state: 'WA', lat: 47.6062, lng: -122.3321 },
  { name: 'Spokane', state: 'WA', lat: 47.6588, lng: -117.426 },
  { name: 'Portland', state: 'OR', lat: 45.5152, lng: -122.6784 },
  { name: 'Eugene', state: 'OR', lat: 44.0521, lng: -123.0868 },
];

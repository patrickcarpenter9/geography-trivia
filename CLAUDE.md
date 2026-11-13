# Geography Trivia

A learning project: a US-only city guessing game. The player sees a US city name,
drops a pin on a map, and is scored by how far the pin is from the real location.

The owner is learning web development. Explain choices briefly when making changes,
prefer plain readable code over clever code, and avoid adding dependencies unless
there's a clear reason.

## Stack

- **Vite**: dev server and build tool. Plain JavaScript (ES modules), no framework, no TypeScript.
- **Leaflet**: interactive map (`npm` package `leaflet`; import its CSS too).
- **GitHub Pages**: hosting, deployed by a GitHub Actions workflow (not set up yet).

## Commands

- `npm install`: install dependencies
- `npm run dev`: local dev server with live reload (http://localhost:5173/geography-trivia/)
- `npm run build`: production build into `dist/`
- `npm run preview`: serve the built `dist/` locally to check it before deploying

## Layout

```
index.html          page shell; loads src/main.js
vite.config.js      `base: '/geography-trivia/'` is required for GitHub Pages
src/main.js         entry point; wires modules together
src/style.css       global styles
```

Planned modules (create as each step is built; keep each one focused):

```
src/map.js          create the Leaflet map, place/clear markers, draw guess-to-answer line
src/game.js         game state: current round, score, next city, end of game
src/scoring.js      haversine distance (miles) and distance-to-points formula; pure functions
src/ui.js           DOM updates: prompt, round result, score, buttons
src/data/cities.js  array of { name, state, lat, lng }; US cities only
```

## Conventions

- Map tiles must have **no place labels**, or the answer is printed on the map.
  We use Esri's `World_Light_Gray_Base` (no API key; attribution required). It shows
  state names from zoom 7, so `maxZoom` stays at 6. CARTO tiles now need an API key.
- Coordinates are `[lat, lng]` (Leaflet's order). Distances in miles.
- Keep `scoring.js` free of DOM and Leaflet code so it's easy to test.
- Map view is limited to the United States (contiguous 48 to start; Alaska and Hawaii are a later decision).

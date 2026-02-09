# astro-lib

JavaScript library for ephemeris calculations, natal charts, transits, aspects, and Jyotish (Ashta Kuta). Uses the `ephemeris` package only — no Python required.

## Installation

**From npm** (when published):
```bash
npm install astro-lib
```

**From GitHub**:
```bash
npm install github:pslergy/astro-lib
```

**From a local clone**:
```bash
git clone https://github.com/pslergy/astro-lib.git
cd astro-lib
npm install
```

## API

### Natal chart (Western)

```js
const astro = require('astro-lib');

const birth = new Date('1990-05-15T14:30:00Z');
const chart = astro.getNatalChart(birth, 55.75, 37.62);
// chart.planetPositions, chart.asc, chart.jd
```

Options: `{ ayanamsaMode: 'tropical' | 'lahiri' }` — default is tropical.

### Transits and Moon

```js
const transits = astro.getTransits(new Date(), { lat: 55.75, lon: 37.62 });
const moonRhythm = astro.getMoonRhythm(); // { sign, phase }
const moonPhase = astro.getMoonPhase(new Date()); // sign, phase, phaseRatio
```

### Aspects

```js
const aspects = astro.getAspectsBetween(natalPositions, transitPositions);
const best = astro.findStrongestHarmoniousAspect(chart1, chart2);
const transitAspects = astro.getTransitAspects(transitsData, natalChart);
```

### Jyotish (sidereal chart, Lahiri)

```js
const jyotishChart = astro.getJyotishChart(birthDate, lat, lon);
// jyotishChart.planetPositions, lagnaRasi, chandraRasi, chandraNakshatra
```

### Compatibility (Ashta Kuta)

```js
const result = await astro.getJyotishCompatibility(
  { date: new Date('1990-05-15'), lat: 55.75, lon: 37.62 },
  { date: new Date('1992-08-20'), lat: 55.75, lon: 37.62 }
);
// result.compatibility_score, verdict_key, analysis, charts
```

### Low-level (planet positions)

```js
const data = astro.getPositions(date, lat, lon, { ayanamsaMode: 'lahiri' });
// data.positions, data.jd, data.asc
```

## Structure

- `lib/ephemeris-adapter.js` — wrapper around `ephemeris`, optional sidereal (Lahiri).
- `lib/ayanamsa.js` — Lahiri ayanamsa.
- `lib/chart.js` — natal chart.
- `lib/transits.js` — transits, Moon phase.
- `lib/aspects.js` — aspects between charts/transits.
- `lib/jyotish-data.js` — nakshatras, rasis, Kuta tables.
- `lib/jyotish.js` — Jyotish chart and Ashta Kuta.

## Use in another project

From the repo root:

```js
const astro = require('./astro_lib');
```

Or copy the `astro_lib` folder, run `npm install` inside it, and require by path.

## License

MIT.

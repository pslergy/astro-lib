const astro = require('../index');

const birth = new Date('1990-05-15T12:00:00Z');
const lat = 55.75;
const lon = 37.62;

console.log('--- Natal chart ---');
const chart = astro.getNatalChart(birth, lat, lon);
console.log(chart ? 'OK: ' + Object.keys(chart.planetPositions || {}).length + ' planets' : 'FAIL');

console.log('--- Transits ---');
const transits = astro.getTransits(new Date(), { lat, lon });
console.log(transits?.transits ? 'OK' : 'FAIL');

console.log('--- Moon rhythm ---');
const moon = astro.getMoonRhythm();
console.log(moon ? `OK: ${moon.sign}, ${moon.phase}` : 'FAIL');

console.log('--- Jyotish chart ---');
const jChart = astro.getJyotishChart(birth, lat, lon);
console.log(jChart ? `OK: Lagna ${jChart.lagnaRasi}, Chandra ${jChart.chandraRasi}` : 'FAIL');

console.log('--- Ashta Kuta (same person twice) ---');
if (jChart) {
  const ashta = astro.calculateAshtaKuta(jChart, jChart);
  console.log('OK: score =', ashta.compatibility_score);
}

console.log('--- Done ---');

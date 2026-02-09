/**
 * astro-lib — эфемериды, натальная карта, транзиты, аспекты, Джйотиш (Ашта-кута).
 * Всё на JS, без Python. Опционально можно подключить свой Python-воркер через конфиг.
 */

const chart = require('./lib/chart');
const transits = require('./lib/transits');
const aspects = require('./lib/aspects');
const jyotish = require('./lib/jyotish');
const ephemerisAdapter = require('./lib/ephemeris-adapter');
const ayanamsa = require('./lib/ayanamsa');

// ——— Натальная карта (западная) ———
function getNatalChart(birthDate, lat, lon, options = {}) {
  return chart.getNatalChart(birthDate, lat, lon, options);
}

// ——— Транзиты и Луна ———
function getTransits(dateObj, options) {
  return transits.getTransits(dateObj || new Date(), options);
}

function getMoonPhase(dateObj, options) {
  return transits.getMoonPhase(dateObj || new Date(), options);
}

function getMoonRhythm(dateObj, options) {
  return transits.getMoonRhythm(dateObj || new Date(), options);
}

// ——— Аспекты ———
function getAspectsBetween(positions1, positions2) {
  return aspects.getAspectsBetween(positions1, positions2);
}

function findStrongestHarmoniousAspect(chart1, chart2) {
  return aspects.findStrongestHarmoniousAspect(chart1, chart2);
}

function getTransitAspects(transitsData, natalChart) {
  return aspects.getTransitAspects(transitsData, natalChart);
}

// ——— Джйотиш ———
function getJyotishChart(dateObj, lat, lon) {
  return jyotish.getJyotishChart(dateObj, lat, lon);
}

function calculateAshtaKuta(chartA, chartB) {
  return jyotish.calculateAshtaKuta(chartA, chartB);
}

async function getJyotishCompatibility(myBirth, theirBirth) {
  return jyotish.getJyotishCompatibility(myBirth, theirBirth);
}

function generateJyotishTranslatedOutput(ashtaKutaResult, descriptionsFromDb) {
  return jyotish.generateJyotishTranslatedOutput(ashtaKutaResult, descriptionsFromDb);
}

// ——— Низкоуровневый слой (позиции планет) ———
function getPositions(dateObj, lat, lon, options) {
  return ephemerisAdapter.getPositions(dateObj, lat, lon, options);
}

module.exports = {
  getNatalChart,
  getTransits,
  getMoonPhase,
  getMoonRhythm,
  getAspectsBetween,
  findStrongestHarmoniousAspect,
  getTransitAspects,
  getJyotishChart,
  calculateAshtaKuta,
  getJyotishCompatibility,
  generateJyotishTranslatedOutput,
  getPositions,
  ayanamsa,
  ASPECTS: aspects.ASPECTS,
};

const ephemeris = require('ephemeris');
const { tropicalToSidereal, lahiriAyanamsa } = require('./ayanamsa');

function approximateAscendant(jd, lonDeg, latDeg, sunLonTropical, ayanamsaMode) {
  if (sunLonTropical == null || typeof sunLonTropical !== 'number') return null;
  const T = (jd - 2451545.0) / 36525.0;
  const lat = (latDeg * Math.PI) / 180;
  const lon = (lonDeg * Math.PI) / 180;
  const UT = (jd % 1) * 24;
  if (UT < 0) UT += 24;
  const GMST = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T;
  const LST = (GMST * Math.PI / 180 + lon) % (2 * Math.PI);
  const e = (23.439 - 0.013 * T) * Math.PI / 180;
  const ramc = LST * 180 / Math.PI;
  let y = Math.sin(LST);
  let x = Math.cos(LST) * Math.cos(e) + Math.tan(lat) * Math.sin(e);
  let asc = (Math.atan2(y, x) * 180 / Math.PI + 90) % 360;
  if (asc < 0) asc += 360;
  if (ayanamsaMode === 'lahiri') asc = (asc - lahiriAyanamsa(jd) + 360) % 360;
  return asc;
}

const BODIES = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn'];
const BODY_KEYS = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'];

/**
 * Получить позиции планет на дату.
 * @param {Date} dateObj
 * @param {number} lat - широта
 * @param {number} lon - долгота
 * @param {{ ayanamsaMode?: 'tropical'|'lahiri' }} options
 * @returns {{ jd: number, positions: Object, asc?: number, ayanamsa?: number } | null}
 */
function getPositions(dateObj, lat, lon, options = {}) {
  const ayanamsaMode = options.ayanamsaMode || 'tropical';
  if (!dateObj || !(dateObj instanceof Date) || isNaN(dateObj.getTime())) return null;
  const numLat = parseFloat(lat);
  const numLon = parseFloat(lon);
  if (isNaN(numLat) || isNaN(numLon)) return null;

  try {
    const result = ephemeris.getAllPlanets(dateObj, numLon, numLat, 0);
    if (!result || !result.observed) return null;

    const obs = result.observed;
    const jd = result.date?.gregorianTerrestrialRaw?.julian ?? result.date?.julian;
    if (jd == null) return null;

    const positions = {};
    for (let i = 0; i < BODIES.length; i++) {
      const key = BODIES[i];
      const name = BODY_KEYS[i];
      const body = obs[key];
      if (!body) continue;
      let lon = body.apparentLongitudeDd != null ? body.apparentLongitudeDd : body.longitude;
      if (typeof lon !== 'number') continue;
      if (ayanamsaMode === 'lahiri') {
        lon = tropicalToSidereal(lon, jd);
      }
      positions[name] = { lon, lat: body.latitude, retrograde: !!body.retrograde };
    }

    const out = { jd, positions };
    const asc = approximateAscendant(jd, numLon, numLat, obs.sun?.apparentLongitudeDd, ayanamsaMode);
    if (asc != null) out.asc = asc;
    return out;
  } catch (err) {
    return null;
  }
}

module.exports = { getPositions, BODY_KEYS };

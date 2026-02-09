const { getPositions } = require('./ephemeris-adapter');

const SIGN_NAMES = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

function signFromLongitude(lon) {
  const i = Math.floor(lon / 30) % 12;
  return SIGN_NAMES[i];
}

/**
 * Транзиты на указанную дату (позиции планет).
 */
function getTransits(dateObj, options = {}) {
  const lat = options.lat ?? 0;
  const lon = options.lon ?? 0;
  const data = getPositions(dateObj, lat, lon, options);
  if (!data) return null;
  const transits = {};
  for (const [name, pos] of Object.entries(data.positions)) {
    transits[name] = { ...pos, sign: signFromLongitude(pos.lon) };
  }
  return { date: dateObj.toISOString(), jd: data.jd, transits };
}

/**
 * Фаза Луны: приближённо по разнице Солнце–Луна.
 */
function getMoonPhase(dateObj, options = {}) {
  const lat = options.lat ?? 0;
  const lon = options.lon ?? 0;
  const data = getPositions(dateObj, lat, lon, options);
  if (!data || !data.positions.Sun || !data.positions.Moon) return null;
  let diff = data.positions.Moon.lon - data.positions.Sun.lon;
  while (diff < 0) diff += 360;
  const ratio = diff / 360;
  const phases = ['New', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];
  const idx = Math.min(7, Math.floor(ratio * 8));
  return {
    sign: signFromLongitude(data.positions.Moon.lon),
    phase: phases[idx],
    phaseRatio: ratio,
    sunLon: data.positions.Sun.lon,
    moonLon: data.positions.Moon.lon,
  };
}

/**
 * "Ритм Луны" на день: знак и фаза (для совместимости с твоим API).
 */
function getMoonRhythm(dateObj = new Date(), options = {}) {
  const mp = getMoonPhase(dateObj, options);
  if (!mp) return null;
  return { sign: mp.sign, phase: mp.phase };
}

module.exports = { getTransits, getMoonPhase, getMoonRhythm, signFromLongitude };

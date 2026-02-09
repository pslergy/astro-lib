const { getPositions } = require('./ephemeris-adapter');

/**
 * Натальная карта (западная): позиции планет и ASC на момент рождения.
 * @param {Date} birthDate
 * @param {number} lat
 * @param {number} lon
 * @param {{ ayanamsaMode?: 'tropical'|'lahiri' }} options
 */
function getNatalChart(birthDate, lat, lon, options = {}) {
  const data = getPositions(birthDate, lat, lon, options);
  if (!data) return null;
  const { jd, positions, asc } = data;
  return {
    jd,
    date: birthDate.toISOString(),
    lat,
    lon,
    asc: asc ?? null,
    planetPositions: positions,
    positions: positions,
  };
}

module.exports = { getNatalChart };

/**
 * Лахири аянамша (приближение): перевод тропической долготы в сидерическую.
 * Формула: на 2000 год ~24° и прирост ~50.3" в год.
 */

function lahiriAyanamsa(julianDate) {
  const T = (julianDate - 2451545.0) / 36525.0;
  const deg = 23.85 + 50.3 * T / 3600;
  return deg;
}

/**
 * @param {number} tropicalLon - тропическая долгота (0..360)
 * @param {number} julianDate
 * @returns {number} сидерическая долгота (0..360)
 */
function tropicalToSidereal(tropicalLon, julianDate) {
  const aya = lahiriAyanamsa(julianDate);
  let sid = tropicalLon - aya;
  while (sid < 0) sid += 360;
  return sid % 360;
}

module.exports = { lahiriAyanamsa, tropicalToSidereal };

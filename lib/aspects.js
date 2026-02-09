const ASPECTS = [
  { name: 'Conjunct', angle: 0, orb: 8, score: 10 },
  { name: 'Opposition', angle: 180, orb: 8, score: 5 },
  { name: 'Trine', angle: 120, orb: 8, score: 8 },
  { name: 'Square', angle: 90, orb: 8, score: 4 },
  { name: 'Sextile', angle: 60, orb: 6, score: 6 },
];

function getLon(pos) {
  if (pos == null) return null;
  return typeof pos === 'number' ? pos : (pos.lon ?? pos.longitude);
}

function angularDistance(lon1, lon2) {
  let d = Math.abs(lon1 - lon2);
  if (d > 180) d = 360 - d;
  return d;
}

/**
 * Найти аспект между двумя долготами (одна пара).
 */
function findAspectBetween(lon1, lon2, customOrb) {
  const d = angularDistance(lon1, lon2);
  for (const a of ASPECTS) {
    const orb = customOrb ?? a.orb;
    if (Math.abs(d - a.angle) <= orb || Math.abs(d - (360 - a.angle)) <= orb) {
      return { ...a, exactAngle: d };
    }
  }
  return null;
}

/**
 * Все аспекты между двумя наборами позиций (например натальная и транзиты).
 */
function getAspectsBetween(positions1, positions2) {
  const results = [];
  const planets = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'];
  for (const p1 of planets) {
    for (const p2 of planets) {
      if (p1 === p2) continue;
      const lon1 = getLon(positions1[p1]);
      const lon2 = getLon(positions2[p2]);
      if (lon1 == null || lon2 == null) continue;
      const aspect = findAspectBetween(lon1, lon2);
      if (aspect) results.push({ p1, p2, ...aspect });
    }
  }
  return results;
}

/**
 * Самый сильный гармоничный аспект между двумя картами (как у тебя в коде).
 */
function findStrongestHarmoniousAspect(chart1, chart2) {
  if (!chart1 || !chart2) return null;
  const pos1 = chart1.planetPositions || chart1.positions || chart1;
  const pos2 = chart2.planetPositions || chart2.positions || chart2;
  const harmonious = ASPECTS.filter(a => ['Trine', 'Sextile', 'Conjunct'].includes(a.name));
  const planets = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter'];
  let best = null;
  let maxScore = 0;
  for (const p1 of planets) {
    for (const p2 of planets) {
      const lon1 = getLon(pos1[p1]);
      const lon2 = getLon(pos2[p2]);
      if (lon1 == null || lon2 == null) continue;
      const d = angularDistance(lon1, lon2);
      for (const a of harmonious) {
        if (Math.abs(d - a.angle) <= (a.orb || 5)) {
          if (a.score > maxScore) {
            maxScore = a.score;
            best = { p1, p2, aspect: a.name };
          }
        }
      }
    }
  }
  return best;
}

/**
 * Транзитные аспекты к натальной карте.
 */
function getTransitAspects(transitsData, natalChart) {
  const transits = transitsData?.transits || transitsData?.positions || transitsData;
  const natal = natalChart?.planetPositions || natalChart?.positions || natalChart;
  if (!transits || !natal) return [];
  return getAspectsBetween(transits, natal);
}

module.exports = {
  ASPECTS,
  findAspectBetween,
  getAspectsBetween,
  findStrongestHarmoniousAspect,
  getTransitAspects,
};

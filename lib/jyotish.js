const { getPositions } = require('./ephemeris-adapter');
const { nakshatras, rasis, yoniKutaTable, grahaMaitriTable, vashyaTable, ganaKutaTable } = require('./jyotish-data');

function rahuLongitude(jd) {
  const T = (jd - 2451545.0) / 36525.0;
  const lon = 125.0445479 - 1934.1362891 * T + 0.0020754 * T * T;
  return ((lon % 360) + 360) % 360;
}

/**
 * Джйотиш-карта (сидерическая, Лахири): планеты, раши, накшатры, лагна.
 */
function getJyotishChart(dateObj, lat, lon) {
  if (!dateObj || !(dateObj instanceof Date) || isNaN(dateObj.getTime())) return null;
  const numLat = parseFloat(lat);
  const numLon = parseFloat(lon);
  if (isNaN(numLat) || isNaN(numLon)) return null;

  const data = getPositions(dateObj, numLat, numLon, { ayanamsaMode: 'lahiri' });
  if (!data) return null;

  const { jd, positions, asc } = data;
  const rahu = rahuLongitude(jd);
  const ketu = (rahu + 180) % 360;

  const planetPositions = {};
  const bodies = [
    ['Sun', positions.Sun?.lon],
    ['Moon', positions.Moon?.lon],
    ['Mars', positions.Mars?.lon],
    ['Mercury', positions.Mercury?.lon],
    ['Jupiter', positions.Jupiter?.lon],
    ['Venus', positions.Venus?.lon],
    ['Saturn', positions.Saturn?.lon],
    ['Rahu', rahu],
    ['Ketu', ketu],
  ];

  const nakshatraSize = 360 / 27;

  for (const [name, longitude] of bodies) {
    if (longitude == null) continue;
    let rasiNum = Math.floor(longitude / 30);
    if (rasiNum > 11) rasiNum = 11;
    const rasiInfo = rasis[rasiNum];

    let nakshatraNum = Math.floor(longitude / nakshatraSize) + 1;
    if (nakshatraNum > 27) nakshatraNum = 27;
    const nakshatraInfo = nakshatras[nakshatraNum - 1];

    const longitudeInNakshatra = longitude - (nakshatraNum - 1) * nakshatraSize;
    const pada = Math.min(4, Math.floor(longitudeInNakshatra / (nakshatraSize / 4)) + 1);

    planetPositions[name] = {
      longitude: longitude,
      lon: longitude,
      rasi: rasiInfo.name,
      rasiNum: rasiInfo.num,
      varna: rasiInfo.varna,
      ruler: rasiInfo.ruler,
      nakshatra: nakshatraInfo.name,
      nakshatraNum: nakshatraInfo.num,
      yoni: nakshatraInfo.yoni,
      gana: nakshatraInfo.gana,
      nadi: nakshatraInfo.nadi,
      pada,
      degrees: longitude % 30,
    };
  }

  const siderealAsc = asc != null ? asc : (data.asc || 0);
  let lagnaRasiNum = Math.floor(siderealAsc / 30);
  if (lagnaRasiNum > 11) lagnaRasiNum = 11;

  return {
    jd,
    lagnaRasi: rasis[lagnaRasiNum].name,
    chandraRasi: planetPositions.Moon?.rasi,
    chandraNakshatra: planetPositions.Moon?.nakshatra,
    chandraNakshatraNum: planetPositions.Moon?.nakshatraNum,
    planetPositions,
  };
}

function varnaKuta(moonA, moonB) {
  const order = { Brahmin: 4, Kshatriya: 3, Vaishya: 2, Shudra: 1 };
  const va = order[moonA.varna] || 0;
  const vb = order[moonB.varna] || 0;
  return va >= vb ? 1 : 0;
}

function vashyaKuta(moonA, moonB) {
  if (vashyaTable[moonA.rasi] && vashyaTable[moonA.rasi].includes(moonB.rasi)) return 2;
  if (vashyaTable[moonB.rasi] && vashyaTable[moonB.rasi].includes(moonA.rasi)) return 1;
  return 0;
}

function taraKuta(moonA, moonB) {
  const diff = Math.abs(moonB.nakshatraNum - moonA.nakshatraNum) % 9;
  return [0, 2, 4, 6, 8].includes(diff) ? 3 : 0;
}

function yoniKuta(moonA, moonB) {
  return (yoniKutaTable[moonA.yoni] && yoniKutaTable[moonA.yoni][moonB.yoni]) || 0;
}

function grahaMaitriKuta(moonA, moonB) {
  const rulerA = moonA.ruler;
  const rulerB = moonB.ruler;
  if (!rulerA || !rulerB) return 0;
  const rel = grahaMaitriTable[rulerA];
  if (!rel) return 0;
  if (rel.friends && rel.friends.includes(rulerB)) return 5;
  if (rel.neutral && rel.neutral.includes(rulerB)) return 4;
  if (rel.enemies && rel.enemies.includes(rulerB)) return 1;
  return 3;
}

function ganaKuta(moonA, moonB) {
  return (ganaKutaTable[moonA.gana] && ganaKutaTable[moonA.gana][moonB.gana]) || 0;
}

function bhakootKuta(moonA, moonB) {
  const posA = moonA.rasiNum;
  const posB = moonB.rasiNum;
  if (typeof posA !== 'number' || typeof posB !== 'number') return 0;
  if (((posA - posB + 12) % 12) === 6 || ((posB - posA + 12) % 12) === 6) return 0;
  if (((posA - posB + 12) % 12) === 5 || ((posB - posA + 12) % 12) === 5) return 0;
  return 7;
}

function nadiKuta(moonA, moonB) {
  if (!moonA.nadi || !moonB.nadi) return 0;
  return moonA.nadi === moonB.nadi ? 0 : 8;
}

const kutaCalculators = [
  { key: 'varna_kuta', func: varnaKuta, max: 1 },
  { key: 'vashya_kuta', func: vashyaKuta, max: 2 },
  { key: 'tara_kuta', func: taraKuta, max: 3 },
  { key: 'yoni_kuta', func: yoniKuta, max: 4 },
  { key: 'graha_maitri_kuta', func: grahaMaitriKuta, max: 5 },
  { key: 'gana_kuta', func: ganaKuta, max: 6 },
  { key: 'bhakoot_kuta', func: bhakootKuta, max: 7 },
  { key: 'nadi_kuta', func: nadiKuta, max: 8 },
];

function calculateAshtaKuta(chartA, chartB) {
  const moonA = chartA.planetPositions?.Moon;
  const moonB = chartB.planetPositions?.Moon;
  if (!moonA || !moonB) return { compatibility_score: 0, analysis: [] };

  let totalScore = 0;
  const analysis = [];
  for (const calc of kutaCalculators) {
    const score = calc.func(moonA, moonB) || 0;
    totalScore += score;
    analysis.push({ key: calc.key, obtained_points: score, max_points: calc.max });
  }
  return {
    compatibility_score: Math.round(totalScore * 10) / 10,
    analysis,
  };
}

async function getJyotishCompatibility(myBirth, theirBirth) {
  const myDate = myBirth.date instanceof Date ? myBirth.date : new Date(myBirth.date);
  const theirDate = theirBirth.date instanceof Date ? theirBirth.date : new Date(theirBirth.date);
  const myChart = getJyotishChart(myDate, myBirth.lat, myBirth.lon);
  const theirChart = getJyotishChart(theirDate, theirBirth.lat, theirBirth.lon);
  if (!myChart || !theirChart) {
    return { compatibility_score: 0, verdict_key: 'VERDICT_INVALID_DATE', analysis: [], charts: {} };
  }
  const { compatibility_score, analysis } = calculateAshtaKuta(myChart, theirChart);
  let verdict_key = 'VERDICT_CHALLENGING';
  if (compatibility_score > 30) verdict_key = 'VERDICT_EXCELLENT';
  else if (compatibility_score > 24) verdict_key = 'VERDICT_GOOD';
  else if (compatibility_score > 18) verdict_key = 'VERDICT_AVERAGE';
  return {
    compatibility_score,
    verdict_key,
    analysis,
    charts: { me: myChart, them: theirChart },
  };
}

function generateJyotishTranslatedOutput(ashtaKutaResult, descriptionsFromDb = {}) {
  const detailed_analysis = (ashtaKutaResult.analysis || []).map((kuta) => {
    const kutaNameRaw = kuta.key.replace('_kuta', '');
    return {
      key: kuta.key,
      name_key: `kuta_name_${kutaNameRaw}`,
      description_key: `kuta_desc_${kutaNameRaw}_${kuta.obtained_points}`,
      obtained_points: kuta.obtained_points,
      max_points: kuta.max_points,
    };
  });
  return {
    compatibility_score: ashtaKutaResult.compatibility_score,
    verdict_key: ashtaKutaResult.verdict_key || null,
    analysis: detailed_analysis,
  };
}

module.exports = {
  getJyotishChart,
  calculateAshtaKuta,
  getJyotishCompatibility,
  generateJyotishTranslatedOutput,
};

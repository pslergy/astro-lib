const nakshatras = [
  { num: 1, name: 'Ashwini', yoni: 'Horse', gana: 'Deva', nadi: 'Aadi', ruler: 'Ketu' },
  { num: 2, name: 'Bharani', yoni: 'Elephant', gana: 'Manushya', nadi: 'Madhya', ruler: 'Venus' },
  { num: 3, name: 'Krittika', yoni: 'Sheep', gana: 'Rakshasa', nadi: 'Antya', ruler: 'Sun' },
  { num: 4, name: 'Rohini', yoni: 'Serpent', gana: 'Manushya', nadi: 'Aadi', ruler: 'Moon' },
  { num: 5, name: 'Mrigashira', yoni: 'Serpent', gana: 'Deva', nadi: 'Madhya', ruler: 'Mars' },
  { num: 6, name: 'Ardra', yoni: 'Dog', gana: 'Manushya', nadi: 'Antya', ruler: 'Rahu' },
  { num: 7, name: 'Punarvasu', yoni: 'Cat', gana: 'Deva', nadi: 'Aadi', ruler: 'Jupiter' },
  { num: 8, name: 'Pushya', yoni: 'Sheep', gana: 'Deva', nadi: 'Madhya', ruler: 'Saturn' },
  { num: 9, name: 'Ashlesha', yoni: 'Cat', gana: 'Rakshasa', nadi: 'Antya', ruler: 'Mercury' },
  { num: 10, name: 'Magha', yoni: 'Rat', gana: 'Rakshasa', nadi: 'Aadi', ruler: 'Ketu' },
  { num: 11, name: 'Purva Phalguni', yoni: 'Rat', gana: 'Manushya', nadi: 'Madhya', ruler: 'Venus' },
  { num: 12, name: 'Uttara Phalguni', yoni: 'Cow', gana: 'Manushya', nadi: 'Antya', ruler: 'Sun' },
  { num: 13, name: 'Hasta', yoni: 'Buffalo', gana: 'Deva', nadi: 'Aadi', ruler: 'Moon' },
  { num: 14, name: 'Chitra', yoni: 'Tiger', gana: 'Rakshasa', nadi: 'Madhya', ruler: 'Mars' },
  { num: 15, name: 'Swati', yoni: 'Buffalo', gana: 'Deva', nadi: 'Antya', ruler: 'Rahu' },
  { num: 16, name: 'Vishakha', yoni: 'Tiger', gana: 'Rakshasa', nadi: 'Aadi', ruler: 'Jupiter' },
  { num: 17, name: 'Anuradha', yoni: 'Deer', gana: 'Deva', nadi: 'Madhya', ruler: 'Saturn' },
  { num: 18, name: 'Jyeshtha', yoni: 'Deer', gana: 'Rakshasa', nadi: 'Antya', ruler: 'Mercury' },
  { num: 19, name: 'Mula', yoni: 'Dog', gana: 'Rakshasa', nadi: 'Aadi', ruler: 'Ketu' },
  { num: 20, name: 'Purva Ashadha', yoni: 'Monkey', gana: 'Manushya', nadi: 'Madhya', ruler: 'Venus' },
  { num: 21, name: 'Uttara Ashadha', yoni: 'Mongoose', gana: 'Manushya', nadi: 'Antya', ruler: 'Sun' },
  { num: 22, name: 'Shravana', yoni: 'Monkey', gana: 'Deva', nadi: 'Aadi', ruler: 'Moon' },
  { num: 23, name: 'Dhanishta', yoni: 'Lion', gana: 'Rakshasa', nadi: 'Madhya', ruler: 'Mars' },
  { num: 24, name: 'Shatabhisha', yoni: 'Horse', gana: 'Rakshasa', nadi: 'Antya', ruler: 'Rahu' },
  { num: 25, name: 'Purva Bhadrapada', yoni: 'Lion', gana: 'Manushya', nadi: 'Aadi', ruler: 'Jupiter' },
  { num: 26, name: 'Uttara Bhadrapada', yoni: 'Cow', gana: 'Manushya', nadi: 'Madhya', ruler: 'Saturn' },
  { num: 27, name: 'Revati', yoni: 'Elephant', gana: 'Deva', nadi: 'Antya', ruler: 'Mercury' },
];

const rasis = [
  { num: 0, name: 'Aries', varna: 'Kshatriya', ruler: 'Mars' },
  { num: 1, name: 'Taurus', varna: 'Vaishya', ruler: 'Venus' },
  { num: 2, name: 'Gemini', varna: 'Shudra', ruler: 'Mercury' },
  { num: 3, name: 'Cancer', varna: 'Brahmin', ruler: 'Moon' },
  { num: 4, name: 'Leo', varna: 'Kshatriya', ruler: 'Sun' },
  { num: 5, name: 'Virgo', varna: 'Shudra', ruler: 'Mercury' },
  { num: 6, name: 'Libra', varna: 'Vaishya', ruler: 'Venus' },
  { num: 7, name: 'Scorpio', varna: 'Shudra', ruler: 'Mars' },
  { num: 8, name: 'Sagittarius', varna: 'Kshatriya', ruler: 'Jupiter' },
  { num: 9, name: 'Capricorn', varna: 'Shudra', ruler: 'Saturn' },
  { num: 10, name: 'Aquarius', varna: 'Shudra', ruler: 'Saturn' },
  { num: 11, name: 'Pisces', varna: 'Brahmin', ruler: 'Jupiter' },
];

const vashyaTable = {
  Aries: ['Leo', 'Scorpio'],
  Taurus: ['Virgo', 'Capricorn', 'Pisces'],
  Gemini: ['Libra', 'Aquarius', 'Virgo'],
  Cancer: ['Scorpio', 'Pisces', 'Taurus'],
  Leo: ['Aries', 'Sagittarius', 'Scorpio'],
  Virgo: ['Taurus', 'Capricorn', 'Gemini'],
  Libra: ['Gemini', 'Aquarius', 'Leo'],
  Scorpio: ['Cancer', 'Pisces', 'Aries', 'Leo'],
  Sagittarius: ['Aries', 'Leo', 'Libra'],
  Capricorn: ['Taurus', 'Virgo', 'Libra'],
  Aquarius: ['Gemini', 'Libra', 'Sagittarius'],
  Pisces: ['Cancer', 'Scorpio', 'Taurus'],
};

const grahaMaitriTable = {
  Sun: { friends: ['Moon', 'Mars', 'Jupiter'], neutral: ['Mercury'], enemies: ['Venus', 'Saturn'] },
  Moon: { friends: ['Sun', 'Mercury'], neutral: ['Mars', 'Jupiter', 'Venus', 'Saturn'], enemies: [] },
  Mars: { friends: ['Sun', 'Moon', 'Jupiter'], neutral: ['Venus', 'Saturn'], enemies: ['Mercury'] },
  Mercury: { friends: ['Sun', 'Venus'], neutral: ['Mars', 'Jupiter', 'Saturn'], enemies: ['Moon'] },
  Jupiter: { friends: ['Sun', 'Moon', 'Mars'], neutral: ['Saturn'], enemies: ['Mercury', 'Venus'] },
  Venus: { friends: ['Mercury', 'Saturn'], neutral: ['Mars', 'Jupiter'], enemies: ['Sun', 'Moon'] },
  Saturn: { friends: ['Mercury', 'Venus'], neutral: ['Jupiter'], enemies: ['Sun', 'Moon', 'Mars'] },
};

const yoniKutaTable = {
  Horse: { Horse: 4, Elephant: 0, Sheep: 1, Serpent: 0, Dog: 0, Cat: 0, Rat: 0, Cow: 0, Buffalo: 0, Tiger: 0, Deer: 0, Monkey: 0, Mongoose: 0, Lion: 0 },
  Elephant: { Horse: 0, Elephant: 4, Sheep: 0, Serpent: 1, Dog: 0, Cat: 0, Rat: 0, Cow: 0, Buffalo: 0, Tiger: 0, Deer: 0, Monkey: 0, Mongoose: 0, Lion: 0 },
  Sheep: { Horse: 1, Elephant: 0, Sheep: 4, Serpent: 0, Dog: 0, Cat: 0, Rat: 0, Cow: 0, Buffalo: 0, Tiger: 0, Deer: 0, Monkey: 0, Mongoose: 0, Lion: 0 },
  Serpent: { Horse: 0, Elephant: 1, Sheep: 0, Serpent: 4, Dog: 0, Cat: 0, Rat: 0, Cow: 0, Buffalo: 0, Tiger: 0, Deer: 0, Monkey: 0, Mongoose: 0, Lion: 0 },
  Dog: { Horse: 0, Elephant: 0, Sheep: 0, Serpent: 0, Dog: 4, Cat: 0, Rat: 1, Cow: 0, Buffalo: 0, Tiger: 0, Deer: 0, Monkey: 0, Mongoose: 0, Lion: 0 },
  Cat: { Horse: 0, Elephant: 0, Sheep: 0, Serpent: 0, Dog: 0, Cat: 4, Rat: 0, Cow: 0, Buffalo: 0, Tiger: 0, Deer: 0, Monkey: 0, Mongoose: 0, Lion: 0 },
  Rat: { Horse: 0, Elephant: 0, Sheep: 0, Serpent: 0, Dog: 1, Cat: 0, Rat: 4, Cow: 0, Buffalo: 0, Tiger: 0, Deer: 0, Monkey: 0, Mongoose: 0, Lion: 0 },
  Cow: { Horse: 0, Elephant: 0, Sheep: 0, Serpent: 0, Dog: 0, Cat: 0, Rat: 0, Cow: 4, Buffalo: 0, Tiger: 0, Deer: 0, Monkey: 0, Mongoose: 0, Lion: 0 },
  Buffalo: { Horse: 0, Elephant: 0, Sheep: 0, Serpent: 0, Dog: 0, Cat: 0, Rat: 0, Cow: 0, Buffalo: 4, Tiger: 0, Deer: 0, Monkey: 0, Mongoose: 0, Lion: 0 },
  Tiger: { Horse: 0, Elephant: 0, Sheep: 0, Serpent: 0, Dog: 0, Cat: 0, Rat: 0, Cow: 0, Buffalo: 0, Tiger: 4, Deer: 0, Monkey: 0, Mongoose: 0, Lion: 0 },
  Deer: { Horse: 0, Elephant: 0, Sheep: 0, Serpent: 0, Dog: 0, Cat: 0, Rat: 0, Cow: 0, Buffalo: 0, Tiger: 0, Deer: 4, Monkey: 0, Mongoose: 0, Lion: 0 },
  Monkey: { Horse: 0, Elephant: 0, Sheep: 0, Serpent: 0, Dog: 0, Cat: 0, Rat: 0, Cow: 0, Buffalo: 0, Tiger: 0, Deer: 0, Monkey: 4, Mongoose: 0, Lion: 0 },
  Mongoose: { Horse: 0, Elephant: 0, Sheep: 0, Serpent: 0, Dog: 0, Cat: 0, Rat: 0, Cow: 0, Buffalo: 0, Tiger: 0, Deer: 0, Monkey: 0, Mongoose: 4, Lion: 0 },
  Lion: { Horse: 0, Elephant: 0, Sheep: 0, Serpent: 0, Dog: 0, Cat: 0, Rat: 0, Cow: 0, Buffalo: 0, Tiger: 0, Deer: 0, Monkey: 0, Mongoose: 0, Lion: 4 },
};

const ganaKutaTable = { Deva: { Deva: 6, Manushya: 6, Rakshasa: 0 }, Manushya: { Deva: 6, Manushya: 6, Rakshasa: 6 }, Rakshasa: { Deva: 0, Manushya: 6, Rakshasa: 6 } };

module.exports = { nakshatras, rasis, vashyaTable, grahaMaitriTable, yoniKutaTable, ganaKutaTable };

const fs = require('fs');
const { resourceLimits } = require('worker_threads');
const rawData = fs.readFileSync(__dirname + '/genres.json');
const genres = JSON.parse(rawData);

const supportedSlugs = [
  'action',
  'indie',
  'adventure',
  'rpg',
  'strategy',
  'shooter',
  'casual',
  'simulation',
  'puzzle',
  'arcade',
  'platformer',
  'racing',
  'massively multiplayer',
  'sports',
  'fighting',
  'board games',
  'educational',
  'card',
];

const genresList = genres.results
  .filter((genre) => supportedSlugs.includes(genre.slug))
  .map((result) => {
    return {
      id: result.id,
      name: result.name,
      slug: result.slug,
    };
  })
  .map((genre) => {
    return {
      id: genre.id,
      title: genre.name,
      emoji: '',
    };
  });

console.log(genresList);

const supported = [
  { id: 4, title: 'Action', action: 'action', emoji: '' },
  { id: 51, title: 'Indie', action: 'indie', emoji: '' },
  { id: 3, title: 'Adventure', action: 'adventure', emoji: '' },
  { id: 10, title: 'Strategy', action: 'strategy', emoji: '' },
  { id: 2, title: 'Shooter', action: 'shooter', emoji: '' },
  { id: 40, title: 'Casual', action: 'casual', emoji: '' },
  { id: 14, title: 'Simulation', action: 'simulation', emoji: '' },
  { id: 7, title: 'Puzzle', action: 'puzzle', emoji: '' },
  { id: 11, title: 'Arcade', action: 'arcade', emoji: '' },
  { id: 83, title: 'Platformer', action: 'platformer', emoji: '' },
  { id: 1, title: 'Racing', action: 'racing', emoji: '' },
  { id: 15, title: 'Sports', action: 'sports', emoji: '' },
  { id: 6, title: 'Fighting', action: 'fighting', emoji: '' },
  { id: 34, title: 'Educational', action: 'educational', emoji: '' },
  { id: 17, title: 'Card', action: 'card', emoji: '' },
];

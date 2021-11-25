const fs = require('fs');
const rawData = fs.readFileSync(__dirname + '/stores.json');
const stores = JSON.parse(rawData);

const storesList = stores.results.map((result) => {
  return { id: result.id, title: result.name };
});

console.log(storesList);

[
  { id: 1, title: 'Steam' },
  { id: 3, title: 'PlayStation Store' },
  { id: 2, title: 'Xbox Store' },
  { id: 4, title: 'App Store' },
  { id: 5, title: 'GOG' },
  { id: 6, title: 'Nintendo Store' },
  { id: 7, title: 'Xbox 360 Store' },
  { id: 8, title: 'Google Play' },
  { id: 9, title: 'itch.io' },
  { id: 11, title: 'Epic Games' },
];

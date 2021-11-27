'use strict';
const axios = require('axios');

const KEY = ''; // use actual key before final submission

// construct new paylaod string by prepending previous payload to current button payload string with separator
const prependPayload = (list, payload) =>
  list.map(({ id, title, emoji }) => ({
    id: id,
    title: title + emoji,
    payload: payload + '~' + title,
  }));

// find item in list by payload
const findPayloadInList = (payload, list) =>
  list.find((item) => item.title === payload);

// filter out stores link that are not needed and format required store links in one string
const parseStoresLinks = (payloadPlatform, storesList) => {
  // get stores objects for current platform
  const requriedStores = platforms.find(
    (platform) => platform.title === payloadPlatform
  ).stores;

  const requiredStoresIDList = requriedStores.map(({ id }) => id);

  // filter out unused stores objects
  const storeStringList = storesList
    .filter(({ store_id }) => requiredStoresIDList.includes(store_id))
    .map(
      ({ store_id, url }) =>
        `${requriedStores.find((store) => store.id === store_id).title}: ${url}`
    );

  return storeStringList.join('\n');
};

// TODO add some emojis
const genres = [
  { id: 4, title: 'Action', emoji: '' },
  { id: 51, title: 'Indie', emoji: '' },
  { id: 3, title: 'Adventure', emoji: '' },
  { id: 10, title: 'Strategy', emoji: '' },
  { id: 2, title: 'Shooter', emoji: '' },
  { id: 40, title: 'Casual', emoji: '' },
  { id: 14, title: 'Simulation', emoji: '' },
  { id: 7, title: 'Puzzle', emoji: '' },
  { id: 11, title: 'Arcade', emoji: '' },
  { id: 83, title: 'Platformer', emoji: '' },
  { id: 1, title: 'Racing', emoji: '' },
  { id: 15, title: 'Sports', emoji: '' },
  { id: 6, title: 'Fighting', emoji: '' },
  { id: 34, title: 'Educational', emoji: '' },
  { id: 17, title: 'Card', emoji: '' },
].map(({ id, title, emoji }) => ({
  id: id,
  title: title + emoji,
  payload: title,
}));

// TODO add some emojis
const platforms = [
  {
    id: 4,
    title: 'PC',
    emoji: '',
    stores: [
      { id: 1, title: 'Steam' },
      { id: 5, title: 'GOG' },
      { id: 9, title: 'itch.io' },
      { id: 11, title: 'Epic Games' },
    ],
  },
  {
    id: 187,
    title: 'PlayStation 5',
    emoji: '',
    stores: [{ id: 3, title: 'PlayStation Store' }],
  },
  {
    id: 186,
    title: 'Xbox Series S/X',
    emoji: '',
    stores: [
      { id: 2, title: 'Xbox Store' },
      { id: 7, title: 'Xbox 360 Store' },
    ],
  },
  {
    id: 7,
    title: 'Nintendo Switch',
    emoji: '',
    stores: [{ id: 6, title: 'Nintendo Store' }],
  },
  { id: 3, title: 'iOS', emoji: '', stores: [{ id: 4, title: 'App Store' }] },
  {
    id: 21,
    title: 'Android',
    emoji: '',
    stores: [{ id: 8, title: 'Google Play' }],
  },
]; // transform with genre payload when genre has been seleced, so no processing required here

const api = {
  getGames: (genreID, platformID) => {
    return axios
      .get('https://api.rawg.io/api/games', {
        params: {
          key: KEY,
          genres: genreID,
          platforms: platformID,
        },
      })
      .then((response) => response.data);
  },

  getStoresForGame: (gameID) => {
    return axios
      .get(`https://api.rawg.io/api/games/${gameID}/stores`, {
        params: {
          key: KEY,
        },
      })
      .then((response) => response.data);
  },

  getTrailersForGame: (gameID) => {
    return axios
      .get(`https://api.rawg.io/api/games/${gameID}/movies`, {
        params: {
          key: KEY,
        },
      })
      .then((response) => response.data);
  },
};

let gamesResponse;

const start = (say, sendButton) => {
  // TODO add emojis
  say(
    'Hello! This chatbot will recommend video games based on your preferences'
  ).then(() => {
    sendButton(
      // TODO add emojis
      'First, please select a genre you like',
      genres.concat('Cancel')
    );
  });
};

const state = (payload, say, sendButton) => {
  const [payloadGenre, payloadPlatform] = payload.split('~');

  // say(`DEBUG: current payload:  ${payloadGenre} + ${payloadPlatform}`);

  // payload looks like `{genre}`
  if (!payloadPlatform && findPayloadInList(payloadGenre, genres)) {
    say('Noted').then(() => {
      sendButton(
        // TODO add emojis
        'Next, please select the platform you would like to play on',
        prependPayload(platforms, payloadGenre).concat('Cancel')
      );
    });
  }
  // payload looks like `{genre}~{platform}`
  else if (
    payloadGenre &&
    payloadPlatform &&
    findPayloadInList(payloadPlatform, platforms)
  ) {
    // TODO add emojis
    say('Finding games for u!').then(() => {
      const genreID = findPayloadInList(payloadGenre, genres).id;
      const platformID = findPayloadInList(payloadPlatform, platforms).id;
      // say(
      //   `DEBUG: current payload: ${payloadGenre} with id: ${genreID} + ${payloadPlatform} with id: ${platformID}`
      // );

      api.getGames(genreID, platformID).then((data) => {
        gamesResponse = data;
        if (gamesResponse.results.length > 0) {
          const currentGame = gamesResponse.results[0];

          api.getStoresForGame(currentGame.id).then((data) => {
            const storesString = parseStoresLinks(
              payloadPlatform,
              data.results
            );

            api.getTrailersForGame(currentGame.id).then((data) => {
              const trailers = data.results;
              say(`How about ${currentGame.name}?`).then(() => {
                say({
                  attachment: 'image',
                  url: currentGame.background_image,
                }).then(() => {
                  if (trailers.length !== 0) {
                    say(
                      `Trailer: ${trailers[trailers.length - 1].data.max}`
                    ).then(() => {
                      say(
                        `Checkout ${currentGame.name} in the store links below:\n ${storesString}`
                      );
                    });
                  } else {
                    say(
                      `Checkout ${currentGame.name} in the store links below:\n ${storesString}`
                    );
                  }
                });
              });
            });
          });
        } else {
          say(
            "DEBUG: Something's wrong, response contains an empty game list!"
          );
        }
      });
    });
  } else {
    say('DEBUG: No payload recevied, should not happen, check code for bugs');
  }
};

module.exports = {
  filename: 'es',
  title: 'Video Game Recommender',
  introduction: ['Recommend video games based on user input'],
  start: start,
  state: state,
};

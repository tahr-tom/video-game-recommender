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
  { id: 4, title: 'PC', emoji: '' },
  { id: 187, title: 'PlayStation 5', emoji: '' },
  { id: 18, title: 'PlayStation 4', emoji: '' },
  { id: 1, title: 'Xbox One', emoji: '' },
  { id: 186, title: 'Xbox Series S/X', emoji: '' },
  { id: 7, title: 'Nintendo Switch', emoji: '' },
  { id: 3, title: 'iOS', emoji: '' },
  { id: 21, title: 'Android', emoji: '' },
  { id: 5, title: 'macOS', emoji: '' },
  { id: 6, title: 'Linux', emoji: '' },
]; // transform with genre payload when genre has been seleced, so no processing required here

let gamesList;

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

  say('DEBUG: current payload: ' + payloadGenre + ' + ' + payloadPlatform);

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
      say(
        'DEBUG: current payload: ' +
          payloadGenre +
          ' with id: ' +
          genreID +
          ' + ' +
          payloadPlatform +
          ' with id: ' +
          platformID
      );
      axios
        .get('https://api.rawg.io/api/games', {
          params: {
            key: KEY,
            genres: genreID,
            platforms: platformID,
          },
        })
        .then((response) => {
          gamesList = response.data.results;
          if (gamesList.length > 0) {
            say('How about ' + gamesList[0].name + '?');
          } else {
            say("Something's wrong, response contains an empty game list!");
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

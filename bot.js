"use strict"
const axios = require("axios")
const key = ""

const buttonsMapper = ({ id, title, payload, emoji }) => {
  return {
    id: id,
    title: title + emoji,
    payload: payload,
  }
}

const findPayloadInList = (payload, list) => {
  return list.find((item) => item.payload === payload)
}

// TODO add some emojis
const genres = [
  { id: 4, title: "Action", payload: "action", emoji: "🏃" },
  { id: 51, title: "Indie", payload: "indie", emoji: "" },
  { id: 3, title: "Adventure", payload: "adventure", emoji: "" },
  { id: 10, title: "Strategy", payload: "strategy", emoji: "" },
  { id: 2, title: "Shooter", payload: "shooter", emoji: "" },
  { id: 40, title: "Casual", payload: "casual", emoji: "" },
  { id: 14, title: "Simulation", payload: "simulation", emoji: "" },
  { id: 7, title: "Puzzle", payload: "puzzle", emoji: "" },
  { id: 11, title: "Arcade", payload: "arcade", emoji: "" },
  { id: 83, title: "Platformer", payload: "platformer", emoji: "" },
  { id: 1, title: "Racing", payload: "racing", emoji: "" },
  { id: 15, title: "Sports", payload: "sports", emoji: "" },
  { id: 6, title: "Fighting", payload: "fighting", emoji: "" },
  { id: 34, title: "Educational", payload: "educational", emoji: "" },
  { id: 17, title: "Card", payload: "card", emoji: "" },
]
  .map(buttonsMapper)
  .concat("Cancel")

// TODO add some emojis
const platforms = [
  { id: 4, title: "PC", payload: "pc", emoji: "" },
  { id: 187, title: "PlayStation 5", payload: "playstation5", emoji: "" },
  { id: 186, title: "Xbox Series S/X", payload: "xbox-series-x", emoji: "" },
  { id: 7, title: "Nintendo Switch", payload: "nintendo-switch", emoji: "" },
  { id: 3, title: "iOS", payload: "ios", emoji: "" },
  { id: 21, title: "Android", payload: "android", emoji: "" },
]
  .map(buttonsMapper)
  .concat("Cancel")

const preferences = {}

const start = (say, sendButton) => {
  // TODO add emojis
  say(
    "Hello! This program will recommend video games based on your preferences"
  ).then(() => {
    sendButton(
      // TODO add emojis
      "First, please select a genre you like",
      genres
    )
  })
}

const state = (payload, say, sendButton) => {
  if (findPayloadInList(payload, genres)) {
    preferences.genre = findPayloadInList(payload, genres)
    say("Noted").then(() => {
      sendButton(
        // TODO add emojis
        "Next, please select the platform you would like to play on",
        platforms
      )
    })
  } else if (findPayloadInList(payload, platforms)) {
    preferences.platform = findPayloadInList(payload, platforms)
    // TODO add emojis
    say(
      "Finding games for u!\n" +
        `DEBUG: genre id = ${preferences.genre.id}\n` +
        `DEBUG: platform id = ${preferences.platform.id}`
    )
  } else {
    say("Should not happen, check code for bugs")
  }
}

module.exports = {
  filename: "es",
  title: "Video Game Recommender",
  introduction: ["Recommend video games based on user input"],
  start: start,
  state: state,
}

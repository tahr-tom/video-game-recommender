"use strict"
const axios = require("axios")
const key = ""

// TODO add some emojis
const genresList = [
  { id: 4, title: "Action", payload: "action", emoji: "" },
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

// TODO add some emojis
const platformsList = [
  { id: 4, title: "PC", payload: "pc", emoji: "" },
  { id: 187, title: "PlayStation 5", payload: "playstation5", emoji: "" },
  { id: 18, title: "PlayStation 4", payload: "playstation4", emoji: "" },
  { id: 1, title: "Xbox One", payload: "xbox-one", emoji: "" },
  { id: 7, title: "Nintendo Switch", payload: "nintendo-switch", emoji: "" },
  { id: 3, title: "iOS", payload: "ios", emoji: "" },
  { id: 21, title: "Android", payload: "android", emoji: "" },
  { id: 5, title: "macOS", payload: "macos", emoji: "" },
  { id: 6, title: "Linux", payload: "linux", emoji: "" },
]

const preferences = {}

const start = (say, sendButton) => {
  // TODO add emojis
  say(
    "Hello! This program will recommend video games based on your preferences"
  ).then(
    sendButton(
      // TODO add emojis
      "First, please select a genre you like",
      genresList.concat("Cancel")
    )
  )
}

const state = (payload, say, sendButton) => {
  if (genresList.some((genre) => genre.payload === payload)) {
    preferences.genre = payload
    say("Noted").then(
      sendButton(
        // TODO add emojis
        "Next, please select the platform you would like to play on",
        platformsList.concat("Cancel")
      )
    )
  } else if (platformsList.some((platform) => platform.payload === payload)) {
    preferences.platform = payload
    // TODO add emojis
    say("Finding games for u!")
  }
}

module.exports = {
  filename: "es",
  title: "Video Game Recommender",
  introduction: ["Recommend video games based on user input"],
  start: start,
  state: state,
}

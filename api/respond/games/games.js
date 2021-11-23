const fs = require("fs")
const rawData = fs.readFileSync(__dirname + "/games.json")
const games = JSON.parse(rawData)

const game = games.results[0]

const {
  name,
  released,
  rating,
  metacritic,
  platforms, // pc, console
  genres,
  stores,
  short_screenshots,
} = game

const filterGame = {
  name,
  released,
  rating,
  metacritic,
  platforms,
  genres,
  stores,
  short_screenshots,
}

console.log(filterGame)

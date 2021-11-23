const fs = require("fs")
const rawData = fs.readFileSync(__dirname + "/platforms.json")
const platforms = JSON.parse(rawData)

const platformsList = platforms.results.map((result) => {
  return { id: result.id, title: result.name, payload: result.slug }
})

console.log(platformsList)

const supportedSlugs = [
  "pc",
  "playstation5",
  "playstation4",
  "xbox-one",
  "xbox-seriesx-x",
  "nintendo-switch",
  "ios",
  "android",
  "macos",
  "linux",
]

const supported = platformsList
  .filter((platform) => supportedSlugs.includes(platform.payload))
  .map((platform) => ({ ...platform, emoji: "" }))

console.log(supported)

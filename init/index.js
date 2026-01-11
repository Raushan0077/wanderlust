const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
    initDB();
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

let categoryAll = [
	"Beachfront",
	"Cabins",
	"Omg",
	"Lake",
	"Design",
	"Amazing Pools",
	"Farms",
	"Amazing Views",
	"Rooms",
	"Lakefront",
	"Tiny Homes",
	"Countryside",
	"Treehouse",
	"Trending",
	"Tropical",
	"National Parks",
	"Casties",
	"Camping",
	"Top Of The World",
	"Luxe",
	"Iconic Cities",
	"Earth Homes",
];

const initDB = async () => {
  await Listing.deleteMany({});
  
  // Add geometry coordinates based on location
  const locationCoordinates = {
    "Malibu": [-118.7798, 34.0259],
    "New York City": [-74.0060, 40.7128],
    "Aspen": [-106.8175, 39.1911],
    "Florence": [11.2558, 43.7696],
    "Portland": [-122.6784, 45.5152],
    "Cancun": [-86.8515, 21.1619],
    "Lake Tahoe": [-120.0324, 39.0968],
    "Los Angeles": [-118.2437, 34.0522],
    "Verbier": [7.2286, 46.0990],
    "Serengeti National Park": [34.8388, -2.1540],
    "Amsterdam": [4.9041, 52.3676],
    "Fiji": [178.0650, -17.7134],
    "Cotswolds": [-1.7073, 51.8970],
    "Boston": [-71.0589, 42.3601],
    "Bali": [115.1889, -8.3405],
    "Banff": [-115.5708, 51.1784],
    "Miami": [-80.1918, 25.7617],
    "Phuket": [98.3923, 7.8804],
    "Scottish Highlands": [-4.2026, 57.4778],
    "Dubai": [55.2708, 25.2048],
    "Montana": [-109.5337, 47.0527],
    "Mykonos": [25.3792, 37.4467],
    "Costa Rica": [-83.7534, 9.7489],
    "Charleston": [-79.9311, 32.7765],
    "Tokyo": [139.6917, 35.6895],
    "New Hampshire": [-71.5724, 43.1939],
    "Maldives": [73.2207, 3.2028]
  };
  
  initData.data = initData.data.map((obj) => ({
    ...obj,
    geometry: {
      type: "Point",
      coordinates: locationCoordinates[obj.location] || [-118.2437, 34.0522] // Default to LA if location not found
    }
  }));
  
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
  process.exit(0);
};
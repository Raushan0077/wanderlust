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
    "Maldives": [73.2207, 3.2028],
    // Indian cities
    "Jaipur": [75.7873, 26.9124],
    "jaipur": [75.7873, 26.9124],
    "Jaipur Rajasthan": [75.7873, 26.9124],
    "jaipur Rajathan": [75.7873, 26.9124], // User's exact input
    "jaipur Rajasthan": [75.7873, 26.9124],
    "jaipur rajasthan": [75.7873, 26.9124], // All lowercase correct spelling
    "Delhi": [77.2090, 28.6139],
    "Mumbai": [72.8777, 19.0760],
    "Bangalore": [77.5946, 12.9716],
    "Chennai": [80.2707, 13.0827],
    "Kolkata": [88.3639, 22.5726],
    "Hyderabad": [78.4867, 17.3850],
    "Pune": [73.8567, 18.5204],
    "pune": [73.8567, 18.5204],
    "Ahmedabad": [72.5714, 23.0225],
    "Goa": [74.1240, 15.2993],
    "Agra": [78.0081, 27.1767],
    "Udaipur": [73.7147, 24.5854],
    "Rajasthan": [74.2179, 27.0238]
  };
  
  // Assign categories to ensure all filter icons have listings
  const categoryAssignments = [
    ["Trending", "Beachfront"], // Cozy Beachfront Cottage
    ["Rooms", "Design"], // Modern Loft in Downtown
    ["Mountains", "Cabins"], // Mountain Retreat
    ["Iconic Cities", "Luxe"], // Historic Villa in Tuscany
    ["Amazing Pools", "Tropical"], // Next listing
    ["Casties", "Countryside"], // Castles
    ["Farms", "Amazing Views"], // Farms
    ["Arctic", "Top Of The World"], // Arctic
    ["Domes", "Earth Homes"], // Domes
    ["Boats", "Lake"], // Boats
    ["Camping", "National Parks"], // Campaign
    ["Trending", "Rooms"], // Additional listings
    ["Iconic Cities", "Design"],
    ["Mountains", "Treehouse"],
    ["Amazing Pools", "Beachfront"],
    ["Casties", "Luxe"],
    ["Farms", "Countryside"],
    ["Arctic", "Cabins"],
    ["Domes", "Tiny Homes"],
    ["Boats", "Lakefront"],
    ["Camping", "Omg"],
    ["Trending", "Tropical"],
    ["Rooms", "Amazing Views"],
    ["Iconic Cities", "National Parks"],
    ["Mountains", "Top Of The World"],
    ["Amazing Pools", "Luxe"],
    ["Casties", "Earth Homes"],
    ["Farms", "Treehouse"],
    ["Arctic", "Tiny Homes"],
    ["Domes", "Omg"],
    ["Boats", "Beachfront"],
    ["Camping", "Design"]
  ];

  initData.data = initData.data.map((obj, index) => ({
    ...obj,
    category: categoryAssignments[index] || [
      categoryAll[Math.floor(Math.random() * categoryAll.length)],
      categoryAll[Math.floor(Math.random() * categoryAll.length)]
    ],
    geometry: {
      type: "Point",
      coordinates: locationCoordinates[obj.location] || [-118.2437, 34.0522] // Default to LA if location not found
    }
  }));
  
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
  process.exit(0);
};
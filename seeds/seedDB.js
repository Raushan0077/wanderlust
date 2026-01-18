if (process.env.NODE_ENV !== "production") require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("../models/listing");
const { data } = require("../init/data");

const dbUrl = process.env.ATLASDB_URL;

async function seed() {
  if (!dbUrl) {
    console.error("ATLASDB_URL is not set in environment or .env");
    process.exit(1);
  }
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to DB");
    await Listing.deleteMany({});
    const res = await Listing.insertMany(data);
    console.log(`Seeded listings: ${res.length}`);
    await mongoose.disconnect();
    console.log("Disconnected and finished seeding.");
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seed();

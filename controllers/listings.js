const Listing = require("../models/listing");


module.exports.index = async (req, res) => {
    const allListings = await Listing.find().sort({ _id : -1});
    res.render("listings/index.ejs", { allListings });
  };

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
  };

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({path: "review",
       populate: {
        path: "author", 
       } , 
    })
    .populate("owner");
    if(!listing) {
      req.flash("error" , "Listing you requested for does not exist!");
      return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  };

module.exports.createListing = async (req, res , next) => {
      let url = req.file.path;
      let filename = req.file.filename;
      const newListing = new Listing(req.body.listing);
      newListing.owner = req.user._id;
      newListing.image = {url, filename};
      
      // Add geometry coordinates based on location
      const locationCoordinates = {
        "malibu": [-118.7798, 34.0259],
        "new york city": [-74.0060, 40.7128],
        "aspen": [-106.8175, 39.1911],
        "florence": [11.2558, 43.7696],
        "portland": [-122.6784, 45.5152],
        "cancun": [-86.8515, 21.1619],
        "lake tahoe": [-120.0324, 39.0968],
        "los angeles": [-118.2437, 34.0522],
        "verbier": [7.2286, 46.0990],
        "serengeti national park": [34.8388, -2.1540],
        "amsterdam": [4.9041, 52.3676],
        "fiji": [178.0650, -17.7134],
        "cotswolds": [-1.7073, 51.8970],
        "boston": [-71.0589, 42.3601],
        "bali": [115.1889, -8.3405],
        "banff": [-115.5708, 51.1784],
        "miami": [-80.1918, 25.7617],
        "phuket": [98.3923, 7.8804],
        "scottish highlands": [-4.2026, 57.4778],
        "dubai": [55.2708, 25.2048],
        "montana": [-109.5337, 47.0527],
        "mykonos": [25.3792, 37.4467],
        "costa rica": [-83.7534, 9.7489],
        "charleston": [-79.9311, 32.7765],
        "tokyo": [139.6917, 35.6895],
        "new hampshire": [-71.5724, 43.1939],
        "maldives": [73.2207, 3.2028],
        // Indian cities (lowercase for consistency)
        "jaipur": [75.7873, 26.9124],
        "jaipur rajasthan": [75.7873, 26.9124],
        "jaipur rajathan": [75.7873, 26.9124],
        "delhi": [77.2090, 28.6139],
        "mumbai": [72.8777, 19.0760],
        "bangalore": [77.5946, 12.9716],
        "chennai": [80.2707, 13.0827],
        "kolkata": [88.3639, 22.5726],
        "hyderabad": [78.4867, 17.3850],
        "pune": [73.8567, 18.5204],
        "ahmedabad": [72.5714, 23.0225],
        "goa": [74.1240, 15.2993],
        "agra": [78.0081, 27.1767],
        "udaipur": [73.7147, 24.5854],
        "rajasthan": [74.2179, 27.0238]
      };
      
      // Add geometry if location coordinates are available
      const normalizedLocation = newListing.location ? newListing.location.trim().toLowerCase() : '';
      
      if (locationCoordinates[normalizedLocation]) {
        newListing.geometry = {
          type: "Point",
          coordinates: locationCoordinates[normalizedLocation]
        };
      }
      
      await newListing.save();
      req.flash("success" , "New Listing Created!");
      res.redirect("/listings");
  };

 module.exports.editformListing = async (req, res) => {
         let { id } = req.params;
         const listing = await Listing.findById(id);
         if(!listing) {
           req.flash("error" , "Listing you requested for does not exist!");
           res.redirect("/listings");
         }

         let originalImageUrl =  listing.image.url;
         originalImageUrl.replace("/upload", "/upload/h_200,w_150");
         res.render("listings/edit.ejs", { listing , originalImageUrl });
       }


module.exports.updateListing = async (req, res) => {
     let { id } = req.params;
     let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

     if ( typeof req.file != "undefined"){
      let url = req.file.path;
      let filename = req.file.filename;
      listing.image = { url , filename };
      await listing.save();
     }
     req.flash("success" , "Listing Updated!");
     res.redirect(`/listings/${id}`);
  }; 
  
module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success" , "Listing Deleted!");
    res.redirect("/listings");
  };  

  module.exports.filter = async (req, res, next) => {
    let { id } = req.params;
    let allListings = await Listing.find({ category: { $all: [id] } });
    console.log(allListings);
    if (allListings.length != 0) {
      res.locals.success = `Listings Find by ${id}`;
    } else {
      res.locals.error = `No listings found for category: ${id}`;
      allListings = []; // Ensure we pass an empty array
    }
    res.render("listings/index.ejs", { allListings });
  };
  
  module.exports.filterbtn = (req, res, next) => {
    res.render("listings/filterbtn.ejs");
  };
  
  module.exports.search = async (req, res) => {
    console.log(req.query.q);
    let input = req.query.q.trim().replace(/\s+/g, " "); // remove start and end space and middle space remove and middle add one space------
    console.log(input);
    if (input == "" || input == " ") {
      //search value empty
      req.flash("error", "Search value empty !!!");
      res.redirect("/listings");
    }
  
    // convert every word 1st latter capital and other small---------------
    let data = input.split("");
    let element = "";
    let flag = false;
    for (let index = 0; index < data.length; index++) {
      if (index == 0 || flag) {
        element = element + data[index].toUpperCase();
      } else {
        element = element + data[index].toLowerCase();
      }
      flag = data[index] == " ";
    }
    console.log(element);
  
    let allListings = await Listing.find({
      title: { $regex: element, $options: "i" },
    });
    if (allListings.length != 0) {
      res.locals.success = "Listings searched by Title";
      res.render("listings/index.ejs", { allListings });
      return;
    }
    if (allListings.length == 0) {
      allListings = await Listing.find({
        category: { $regex: element, $options: "i" },
      }).sort({ _id: -1 });
      if (allListings.length != 0) {
        res.locals.success = "Listings searched by Category";
        res.render("listings/index.ejs", { allListings });
        return;
      }
    }
    if (allListings.length == 0) {
      allListings = await Listing.find({
        country: { $regex: element, $options: "i" },
      }).sort({ _id: -1 });
      if (allListings.length != 0) {
        res.locals.success = "Listings searched by Country";
        res.render("listings/index.ejs", { allListings });
        return;
      }
    }
    if (allListings.length == 0) {
      let allListings = await Listing.find({
        location: { $regex: element, $options: "i" },
      }).sort({ _id: -1 });
      if (allListings.length != 0) {
        res.locals.success = "Listings searched by Location";
        res.render("listings/index.ejs", { allListings });
        return;
      }
    }
    const intValue = parseInt(element, 10); // 10 for decimal return - int ya NaN
    const intDec = Number.isInteger(intValue); // check intValue is Number & Not Number return - true ya false
  
    if (allListings.length == 0 && intDec) {
      allListings = await Listing.find({ price: { $lte: element } }).sort({
        price: 1,
      });
      if (allListings.length != 0) {
        res.locals.success = `Listings searched for less than Rs ${element}`;
        res.render("listings/index.ejs", { allListings });
        return;
      }
    }
    if (allListings.length == 0) {
      req.flash("error", "Listings is not here !!!");
      res.redirect("/listings");
    }
  };
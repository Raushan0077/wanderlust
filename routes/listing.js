// const express = require("express");
// const router = express.Router();
// const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const {listingSchema, reviewSchema } = require("../schema.js");
// const Listing = require("../models/listing.js");


// const validateListing = (req, res, next) =>{

//     let {error} = listingSchema.validate(req.body);
//         // console.log(result);
//         if(error) {
//             let errMsg = error.details.map((el) => 
//                 el.message).join(","); 
//             throw new ExpressError(400, errMsg);
//         }else {
//             next();
//         }
//         };
        

// //Index Route
// router.get("/", wrapAsync(async(req, res) => {
//  const allListings=  await Listing.find({});
//  res.render("listings/index", { allListings });
// }));

// //New Route
// router.get("/new", (req, res) => {
//     res.render("listings/new.ejs"); 

// });

// //show Route
// router.get("/:id", wrapAsync(async(req, res) => {
//     let{id} = req.params;
//  const listing=   await Listing.findById(id).populate("reviews");
//  res.render("listings/show.ejs",{listing});
// }));


// //Create Route
// router.post(
//     "/", validateListing,
//      wrapAsync(async (req, res, next) => { 
        
     
// const newListing = new Listing( req.body.listing); 


// await newListing.save();
// req.flash("success", "New Listing  Created");

// res.redirect("/listings");

// })
// );

// //Edit Route
// router.get("/:id/edit", wrapAsync(async(req, res) => {
//       let{id} = req.params;
//  const listing=   await Listing.findById(id);
//  res.render("listings/edit.ejs", {listing});
// }));

// //Update Route 
// router.put("/:id",
//     validateListing, wrapAsync(async (req, res) => {
//      let {id} = req.params;
//   await Listing.findByIdAndUpdate(id, {...req.body.listing});
//   req.flash("success", " Listing  Updated");
// res.redirect(`/listings/${id}`);
// }));


// //Delete Route
// router.delete("/:id", wrapAsync(async (req,res) => {
//     let {id, } = req.params;
//    let deletedListing=await Listing.findByIdAndDelete(id);
//     console.log(deletedListing);
//     req.flash("success", " Listing  Deleted");
// res.redirect("/listings");
// })

// );
// module.exports = router;
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudconfig.js");
const upload = multer({storage});




router.route("/")
.get( wrapAsync(listingController.index))

.post(
     isLoggedIn,
     
      upload.single("listing[image]"),
        validateListing, 
     wrapAsync(listingController.createListing)
    );




// ==========================
// INDEX - Show all listings
// ==========================
// router.get("/", wrapAsync(listingController.index));

// NEW - Show form to create new listing
router.get("/new",isLoggedIn, listingController.renderNewForm);







router.route("/:id")
.get( wrapAsync(listingController.showListing)
)
.put(
  isLoggedIn,
  isOwner,
    upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.updateListing)
)
.delete(
    isLoggedIn,
    isOwner,
     wrapAsync(listingController.destroyListing)
    );
router.get("/:id/edit", 
      isLoggedIn, isOwner,
    wrapAsync(listingController.renderEditForm)
    );
   module.exports = router;

// ==========================


    
//     (req, res) => {
//     // console.log(req.user);
//     //     if(!req.isAuthenticated()) {
//     //     req.flash("error", "You must be logged in to create listing!");
//     //    return res.redirect("/login");
//     // }
//      res.render("listings/new.ejs");
// });

// ==========================
// CREATE - Add new listing to DB
// ==========================
// router.post("/",
//      isLoggedIn,
//       validateListing, 
//      wrapAsync(listingController.createListing)
//     );


// ==========================
//// SHOW - Show a specific listing
// router.get("/:id", wrapAsync(listingController.showListing)
// );

// ==========================
// EDIT - Show edit form for a listing
// ==========================

   





//     //update route
// router.put(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   validateListing,
//   wrapAsync(listingController.updateListing)
// );


// //update route
// router.put(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   validateListing,
//   wrapAsync(async (req, res) => {
//     let { id } = req.params;
//     await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//     req.flash("success", "Listing Updated");
//     res.redirect(`/listings/${id}`);
//   })
// );









// router.put (
//     "/:id", isLoggedIn,
//     isOwner, validateListing, wrapAsync(async (req, res) => {
//         let {id} = req.params;
// //          let listing = await Listing.findById(id);
// // if(!listing.owner.equals(res.locals.currUser._id)){
// // req.flash("error", "You dont have permission to edit");
// //  return res.redirect(`/listings/${id}`);
// // }
// const updatedData = req.body.listing;
//     if (!updatedData.image || updatedData.image.trim() === "") {
//         updatedData.image = listing.image;   // keep old image
//     }

//     await Listing.findByIdAndUpdate(id, updatedData);
//     req.flash("success", "Listing Updated");
//     res.redirect(`/listings/${id}`);
// }));


// ==========================
// UPDATE - Update a listing
// ==========================
// router.put("/:id",
//     isLoggedIn,
//     validateListing, wrapAsync(async (req, res) => {
//     const { id } = req.params;
//     const { listing } = req.body;

//     // Find the existing listing
//     const foundListing = await Listing.findById(id);
//     if (!foundListing) {
//         req.flash("error", "Listing you requested not found!");
//         return res.redirect("/listings");
//     }

//     // Update fields
//     foundListing.title = listing.title;
//     foundListing.description = listing.description;
//     foundListing.price = listing.price;
//     foundListing.country = listing.country;
//     foundListing.location = listing.location;

//     // Update image only if provided
//     if (listing.image && listing.image.trim() !== "") {
//         foundListing.image = listing.image;
//     }

//     await foundListing.save();
//     req.flash("success", "Listing Updated Successfully!");
//     res.redirect(`/listings/${id}`);
// }));

// ==========================
// DELETE - Delete a listing
// ==========================
// router.delete("/:id",
//     isLoggedIn,
//     isOwner,
//      wrapAsync(listingController.destroyListing)
//     );




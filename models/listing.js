// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const listingSchema = new Schema({
//     title:{
//         type:String,
//         required:true,
//     },
//     description:String,
//     image: {
//         type:String,
//         default:"https://www.istockphoto.com/photo/tropical-sunset-turquoise-gm1407509583-458695862?utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fcoconut-tree-and-sunset-in-sea&utm_medium=affiliate&utm_source=unsplash&utm_term=coconut+tree+and+sunset+in+sea%3A%3A%3A",
//         set: (v) => 
//             v === "" ? 
//         "https://www.istockphoto.com/photo/tropical-sunset-turquoise-gm1407509583-458695862?utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fcoconut-tree-and-sunset-in-sea&utm_medium=affiliate&utm_source=unsplash&utm_term=coconut+tree+and+sunset+in+sea%3A%3A%3A" 
//         : v,
// },
//     price:Number,
//     location:String,
//     country:String,2
// });

// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review  = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  // image: {
  //   filename: String,
  //   url: {
  //     type: String,
  //     default: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=60",
  //     set: (v) =>
  //       v === ""
  //         ? "https://images.unsplash.com/photo-1562170824-b547dae88b97?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9"
  //         : v,

  image: {
    url:String,
    filename: String,
    
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
    type: Schema.Types.ObjectId,
    ref: "Review",
    },
  ],
  owner: {
    type:Schema.Types.ObjectId,
    ref: "User",
  },
  geometry:
  {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
  },
});


listingSchema.post("findOneAndDelete", async (listing)=>{
  if(listing) {
      await Review.deleteMany({_id : {$in: listing.reviews} });
  }
});







const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

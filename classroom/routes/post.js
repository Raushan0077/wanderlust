// const express = require("express");
// const router = express.Router();
// //Index
// router.get("/", (req,res) => {
//     res.send("Get for posts");
// })
// //Show 
// router.post("/:id",(req, res) => {
//     res.send("Get for posts id");
// })
// //Post 
// router.post("/",(req, res) => {
//     res.send("Post for posts");
// })
// //Dlete 
// router.delete("/:id",(req, res) => {
//     res.send("Delete for posts id");
// })
// module.exports = router;
const express = require("express");
const router = express.Router();

// Index - posts
router.get("/", (req, res) => {
    res.send("Get for posts");
});

// Show - post by id
router.get("/:id", (req, res) => {
    res.send("Get for post id");
});

// Post - create post
router.post("/", (req, res) => {
    res.send("Post for posts");
});

// Delete - post by id
router.delete("/:id", (req, res) => {
    res.send("Delete for posts id");
});

module.exports = router;

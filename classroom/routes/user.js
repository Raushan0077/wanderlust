// const express = require("express");
// const router = express.Router();

// app.router("/", (req,res) => {
// res.send("Hi, I am root!");    
// });
// app.use("/users", users);
// //Index- users
// router.get("/", (req,res) => {
//     res.send("Get for users");
// })
// //Show -users
// router.post("/:id",(req, res) => {
//     res.send("Get for user id");
// })
// //Post -users
// router.post("/",(req, res) => {
//     res.send("Post for users");
// })
// //Delete -users
// router.delete("/:id",(req, res) => {
//     res.send("Delete for users");
// })
// module.exports = router;
const express = require("express");
const router = express.Router();

// Index - users
router.get("/", (req, res) => {
    res.send("Get for users");
});

// Show - user by id
router.get("/:id", (req, res) => {
    res.send("Get for user id");
});

// Post - create user
router.post("/", (req, res) => {
    res.send("Post for users");
});

// Delete - user by id
router.delete("/:id", (req, res) => {
    res.send("Delete for users");
});

module.exports = router;

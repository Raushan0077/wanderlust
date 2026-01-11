// const User = require("../models/user");

// module.exports.renderSignupForm = (req,res) => {
//     res.render("users/signup.ejs");
// };



// module.exports.signup = async(req, res, next) => {
//  try {  let {username, email, password} =req.body;
// const newUser = new User({email,username});
//   const registeredUser =await User.register(newUser, password);
// console.log(registeredUser);
// req.login(registeredUser, (err) => {
//   if(err) {
//     return next(err);

//   }
// req.flash("success", "welcome to wanderlust!");
// res.redirect("/listings");
// })

// } catch (e) {
//     req.flash("error", e.message);
//     res.redirect("/signup");
// }
// };

// module.exports.renderLoginForm =(req,res) => {
//   res.render("users/login.ejs");
// };

// module.exports.login =   async(req,res) => {
// req.flash("success", "welcome back to wanderlust!You are logged in!");
// let redirectUrl = res.locals.redirectUrl || "listings";   
// res.redirect(redirectUrl);


// };
// module.exports.logout =(req,res, next) => {
//   req.logout((err) => {
//     if(err) {
//      return 
//       next(err);

//     }
//     req.flash("success", "You are logged out!");
//     res.redirect("/listings");
//   });
// };

const User = require("../models/user");

module.exports.renderSignupForm = (req , res) => {
    res.render("users/signup.ejs");
};

module.exports.singup = async(req , res) => {
   try{
      let {username , email , password} = req.body;
      const newUser = new User({email , username});
      const registerdUser = await User.register(newUser , password);
      console.log(registerdUser);
      req.login(registerdUser , (err) => {
         if(err){
            return next(err);
         }
         req.flash("success" , "Welcome to airbnb");
         res.redirect("/listings");
      })
   }

   catch (err){
     req.flash("error" , err.message);
     res.redirect("/signup");
   }
  
};

module.exports.renderLoginForm = (req , res) => {
    res.render("users/login.ejs");
 };

 module.exports.login =  async (req , res) => {
    req.flash("success" , "Welcome back to airbnb!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req , res , next) => {
    req.logout((err) => {
       if(err) {
         return next(err);
       }
       req.flash("success" , "you are logged out!");
       res.redirect("/listings");
    });
  };
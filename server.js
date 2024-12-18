const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
// passport
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
// 
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
// Enable express-ejs-layouts
app.use(expressLayouts); 
app.set('layout', 'layouts/boilerplate');

const Project = require('./models/project');
const userRouter = require("./routes/user.js");

// initialize passport
// Add the session middleware 
app.use(session({ secret: 'ANUJ', // Replace with your actual secret key 
  resave: false, // Don't save session if unmodified 
  saveUninitialized: false // Don't create session until something stored 
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use('/', require('./routes/index'));
app.use("/", userRouter);

app.use((req, res, next) => {
  console.log('Current User:', req.user);  // Log the user object to see if it's set
  res.locals.CurrUser = req.user;  // Make sure we are passing req.user to EJS templates
  next();
});


main()
  .then(() => {
    console.log("connection Successful");
  })
  .catch((err) => console.log(err));

async function main() {
  mongoose.connect("mongodb://localhost:27017/projectmanagement");
}



app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

// models/project.js directory to define your Project schema.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema ({
  email: {
    type: String,
    required: true
  }
});


userSchema.plugin(passportLocalMongoose);
// We don't need to build user name and password hashing and salting because it is done by passport.
module.exports = mongoose.model('User', userSchema);
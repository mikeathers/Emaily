const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
// creates a function constructor based on the User schema.
// new instances can be made from this and then saved to the DB.
const User = mongoose.model("users");

passport.use(
  // id = google
  // Once this strategy has been used by passport.authenticate("google"), the returned result is an
  // access token from which allows us to authenticate the user.
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      // creates a new instance of user, using the userSchema,
      // saves the returned profile.id as the googleId for the user record
      new User({ googleId: profile.id }).save();
    }
  )
);

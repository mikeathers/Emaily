const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

// creates a function constructor based on the User schema.
// new instances can be made from this and then saved to the DB.
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  // id = google
  // Once this strategy has been used by passport.authenticate("google"), the returned result is an
  // access token from which allows us to authenticate the user.
  // clientID and Secret are provided by google. The callbackURL is where we send the user once authenticated.
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    // accessToken, refreshToken, and profile is data provided by the callback from google.
    // done is provided which lets us break out this callback and the google oauth strategy.
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // doesnt create a new user, instead returns done and breaks out the oauth flow.
          // done accepts an error which we set to null and the existingUser.
          done(null, existingUser);
        } else {
          // creates a new instance of user, using the userSchema,
          // saves the returned profile.id as the googleId for the user record
          new User({ googleId: profile.id })
            .save()
            // let passport know that once the user has been saved, we are done.
            // user gets passed back so we can do something with the user info if needed.
            .then(user => done(null, user));
        }
      });
    }
  )
);

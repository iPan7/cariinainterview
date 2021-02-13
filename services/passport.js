const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");
// const User = mongoose.model('users) is a type of require statement. This is how you pull schemas out of mongoose. User is the model class.

// passport's node package is already pre-wired to interface with the code below

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("access token", accessToken);
      console.log("refresh token", refreshToken);
      console.log("profile", profile);

      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          // checks to see if the user already exists or not
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id })
            .save()
            .then((user) => done(null, user));
          // saves a new user to the 'users' collection
        }
      });
    }
  )
);

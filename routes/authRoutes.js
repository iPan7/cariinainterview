const passport = require("passport");

// "const passport" above refers to the passport npm module, NOT the passport.js file

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  // scope can be used to pull more pieces of information from google. Makes this easily expandable if you add additional parameters for the scope

  app.get("/auth/google/callback", passport.authenticate("google"));
};
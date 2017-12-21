const passport = require("passport");

// authRoutes is required in index.js, the express app gets passed in as a parameter and the below arrow function
// is invoked using the app defined in index.js
module.exports = app => {
  // GET method which kicks us into the Google OAuth flow, asks Google for profile info and email address.
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  // GET method which we setup in the Google Outh API, any authentication requests get kicked back here.
  // We handle the return result after google oauth has given us a code
  // passport can now exchange the code for user profile info.
  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};

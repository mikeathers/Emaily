const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
require("./services/passport");
require("./models/User");

mongoose.connect(keys.mongoURI);

const app = express();

// authRoutes returns a function, we immediately call the function and pass in app as an argument. IIEF call.
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

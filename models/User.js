const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

// Creates a new collection, using the userSchema.
mongoose.model("users", userSchema);

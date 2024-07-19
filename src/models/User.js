

import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
//   role: {
//     type: String,
//     default: "USER",
//   },

},{timestamps:true});

const User = models.User || model("User", userSchema);

export default User;

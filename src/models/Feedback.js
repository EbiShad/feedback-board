

import { Schema, model, models } from "mongoose";

const commentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },

},{timestamps:true});

const Comment = models.Comment || model("Comment", commentSchema);

export default Comment;

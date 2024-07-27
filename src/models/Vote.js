

import mongoose, { Schema, model, models } from "mongoose"

const voteSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  feedbackId:{
    type:mongoose.Types.ObjectId,
    required: true,
  }
  
},{timestamps:true});

const Vote = models?.Vote || model("Vote", voteSchema);

export default Vote;

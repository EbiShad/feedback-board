

import { Schema, model, models } from "mongoose";

const feedbackSchema = new Schema({
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

const Feedback = models.Feedback || model("Feedback", feedbackSchema);

export default Feedback;
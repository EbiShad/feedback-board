

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
  imgUpload: {
    type: [String],
  },
},{timestamps:true});

const Feedback = models.Feedback || model("Feedback", feedbackSchema);

export default Feedback;

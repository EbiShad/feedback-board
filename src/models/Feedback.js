
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
  userEmail: {
    type: String,
    required: true,
  },
  voteCountCache:{type:Number,default:0}
},{timestamps:true})

const Feedback = models.Feedback || model("Feedback", feedbackSchema)

export default Feedback

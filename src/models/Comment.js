
import mongoose, { Schema, model, models } from "mongoose"

const commentSchema = new Schema({
  commentText: {
    type: String,
  },
   feedbackId:{
    type:mongoose.Types.ObjectId,
    required: true,
  },
  imgUpload: {
    type:[String]
  },
  userEmail: {
    type: String,
    required: true,
  }
},{timestamps:true});

const Comment = models?.Comment || model("Comment", commentSchema);

export default Comment;

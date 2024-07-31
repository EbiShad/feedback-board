import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Comment from "@/models/Comment";




export async function POST(req){

  try {
   await connectDB();
   const {commentText, feedbackId ,imgUpload} = await req.json();
   const session = await getServerSession(authOptions)
   const userEmail = session.user.email

   const newComment = await Comment.create({commentText, feedbackId ,imgUpload,userEmail})
   

   return NextResponse.json({message: "comment is created",status: 201});
   

 } catch {
   console.log(error)
   return NextResponse.json(
     { error: "server problem is happend" },
     { status: 500 }
   )
 }
}





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
export async function PUT(req){

  try {
   await connectDB();
   const {commentText,imgUpload,id} = await req.json();
   const session = await getServerSession(authOptions)
   const userEmail = session.user.email

   const updatedCommentDoc = await Comment.findOneAndUpdate({userEmail,_id:id},{commentText,imgUpload})
   

   return NextResponse.json(updatedCommentDoc);
   

 } catch {
   console.log(error)
   return NextResponse.json(
     { error: "server problem is happend" },
     { status: 500 }
   )
 }
}


export async function GET(req){
  
  try {
   await connectDB()
   const url = new URL(req.url)
   if(url.searchParams.get('feedbackId')){
    const feedbackId = url.searchParams.get('feedbackId')
    const comments = await Comment.find({feedbackId})
    return NextResponse.json(comments)
   }

   return NextResponse.json([]) 

 } catch {
   console.log(error);
   return NextResponse.json(
     { error: "server problem is happend" },
     { status: 500 }
   );
 }
}





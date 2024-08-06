
import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Feedback from "@/models/Feedback";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";



export async function POST(req){

   try {
    await connectDB();
    const { title, description, imgUpload} = await req.json();
    const session = await getServerSession(authOptions)
    const userEmail = session.user.email

    if (!title || !description) {
      return NextResponse.json({ message: "Enter title or description please",status:422 });
    }

    const newFeedback = await Feedback.create({title,description,imgUpload,userEmail})
   
    return NextResponse.json({ message:"Feedback is created", status: 201});

  } catch {
    console.log(error);
    return NextResponse.json(
      { error: "server problem is happend" },
      { status: 500 }
    )
  }
}

export async function PUT(req){

  try {
   await connectDB();
   const {title,description,imgUpload,id} = await req.json();
   const session = await getServerSession(authOptions)
   const userEmail = session.user.email

   const updatedfeedbackDoc = await Feedback.findOneAndUpdate({userEmail,_id:id},{title,description,imgUpload})
   

   return NextResponse.json(updatedfeedbackDoc);
   

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
    const sortParams = url.searchParams.get('sort')
    

    let sortDef;

    if(sortParams === "Latest"){
      sortDef = {createdAt : -1}
    }
    if(sortParams === "Oldest"){
      sortDef = {createdAt : 1}
    }
    if(sortParams === "votes"){
      sortDef = { voteCountCache : -1}
    }

    const feedbacks = await Feedback.find(null,null,{sort:sortDef})
    return NextResponse.json(feedbacks)

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "server problem is happend" },
      { status: 500 }
    )
  }
}
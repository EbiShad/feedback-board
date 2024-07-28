


import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Vote from "@/models/Vote";




export async function POST(req){

   try {
    await connectDB();
    const {feedbackId} = await req.json();
    const session = await getServerSession(authOptions)
    const userEmail = session.user.email

    const existingVote = await Vote.findOne({feedbackId,userEmail})
    

    if(existingVote){
      await Vote.findByIdAndDelete(existingVote._id)
      return NextResponse.json(existingVote)
    } else{
      const voteDoc = await Vote.create({userEmail,feedbackId})
      return NextResponse.json(voteDoc)
    }
    

  } catch {
    console.log(error);
    return NextResponse.json(
      { error: "server problem is happend" },
      { status: 500 }
    );
  }
}
export async function GET(req){
  
   const url = new URL(req.url)
   if(url.searchParams.get('feedbackIds')){
    const feedbackIds = url.searchParams.get('feedbackIds').split(",")
    const votesDoc = await Vote.find({feedbackId:feedbackIds})
    console.log(votesDoc)
   }

   try {
    await connectDB();
  
      return NextResponse.json(req)
     

  } catch {
    console.log(error);
    return NextResponse.json(
      { error: "server problem is happend" },
      { status: 500 }
    );
  }
}



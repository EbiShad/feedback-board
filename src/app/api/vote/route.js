


import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Vote from "@/models/Vote";
import Feedback from "@/models/Feedback";



// const recountVotes = async (feedbackId) => {
//   const count = await Vote.countDocuments({feedbackId})
//   console.log(count)
//   await Feedback.updateOne({_id:feedbackId},{voteCountCache:count})
// }



export async function POST(req){

 
   try {
    await connectDB();
    
    const {feedbackId} = await req.json();
    const session = await getServerSession(authOptions)
    const userEmail = session.user.email
    const feedbackDoc = await Feedback.findById(feedbackId)
    
    const existingVote = await Vote.findOne({feedbackId,userEmail})

    if(existingVote){
      await Vote.findByIdAndDelete(existingVote._id)
      await Feedback.findByIdAndUpdate(feedbackId,{voteCountCache: (feedbackDoc.voteCountCache)- 1})
      // await recountVotes(feedbackId)
      return NextResponse.json(existingVote)
    } else{
      const voteDoc = await Vote.create({userEmail,feedbackId})
      await Feedback.findByIdAndUpdate(feedbackId,{voteCountCache:(feedbackDoc.voteCountCache)+ 1})
      // await recountVotes(feedbackId)
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
   try {
    await connectDB()
    const url = new URL(req.url)
    if(url.searchParams.get('feedbackIds')){
     const feedbackIds = url.searchParams.get('feedbackIds').split(",")
     const votesDoc = await Vote.find({feedbackId:feedbackIds})
     return NextResponse.json(votesDoc)
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



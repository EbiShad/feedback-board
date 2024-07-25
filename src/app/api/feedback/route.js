
import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Feedback from "@/models/Feedback";



export async function POST(req){

   try {
    await connectDB();
    const { title, description, imgUpload} = await req.json();


    if (!title || !description) {
      return NextResponse.json({ message: "Enter title or description please",status:422 });
    }


    const newFeedback = await Feedback.create({title,description,imgUpload})
   

    return NextResponse.json({ message:"Feedback is created", status: 201});

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

    const feedbacks = await Feedback.find()
    return NextResponse.json({data:feedbacks})
    
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "server problem is happend" },
      { status: 500 }
    );
  }
}
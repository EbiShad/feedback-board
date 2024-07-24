
import { NextResponse } from "next/server";

import connectDB from "@/utils/connectDB";
import Comment from "@/models/Feedback";



export async function POST(req){

   try {
    await connectDB();
    const { title, description } = await req.json();
    const ip = ""

    if (!title || !description) {
      return NextResponse.json({ message: "Enter title or description please",status:422 });
    }


    const newComment = Comment.create({title,description,ip})
   

    return NextResponse.json({ message:"Comment is created", status: 201 });

  } catch {
    console.log(error);
    return NextResponse.json(
      { error: "server problem is happend" },
      { status: 500 }
    );
  }
}
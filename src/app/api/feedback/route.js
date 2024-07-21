
import Feedback from "@/models/Feedback";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";



export async function POST(req){

   try {
    await connectDB();
    const { title, description } = await req.json();

    if (!title || !description) {
      return NextResponse.json({ message: "Enter title or description please" ,status: 422 });
    }

    // const existigUser = await User.findOne({ email });

    // if (existigUser) {
    //   return NextResponse.json(
    //     { message: "you have signed up",status: 422}
    //   )
    // }

    // const hashedPassword = await hashPassword(password);

    const newFeedback = await Feedback.create({
      title,
      description,
    })
   

    return NextResponse.json({ message:"feedback is created", status: 201 });

  } catch {
    console.log(error);
    return NextResponse.json(
      { error: "server problem is happend" },
      { status: 500 }
    );
  }
}
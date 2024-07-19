import User from "@/models/User";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";



export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Enter email or password please" ,status: 422 });
    }

    const existigUser = await User.findOne({ email });

    if (existigUser) {
      return NextResponse.json(
        { message: "you have signed up",status: 422}
      )
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      email: email,
      password: hashedPassword,
    })
   

    return NextResponse.json({ message:"user is created", status: 201 });

  } catch {
    console.log(error);
    return NextResponse.json(
      { error: "server problem is happend" },
      { status: 500 }
    );
  }
}

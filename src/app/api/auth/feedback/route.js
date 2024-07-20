import { NextResponse } from "next/server";



export async function POST(req){
    
    return NextResponse.json({ message: "Enter email or password please" ,status: 422 })
}
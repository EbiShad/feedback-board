
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github"
import clientPromise from "../../../../../lib/db";
import User from "@/models/User";

export const authOptions = {
    session:{strategy:"jwt"},
    providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;
        
        try {
            await connectDB()
        } catch (error) {
            throw new Error("a problem in server is happend")
        }
    
        if(!email || !password){
            throw new Error("Enter email or password please")
        }

        const user = await User.findOne({email:email})

        if(!user){
            throw new Error("you have not registered yet")
        }

  
        const isValid = await verifyPassword(password,user.password)

        if(!isValid){
            throw new Error("password incorrect")
        }
       
        return {email}
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  adapter: MongoDBAdapter(clientPromise),
}

const handler = NextAuth(authOptions) 

export {handler as GET , handler as POST}




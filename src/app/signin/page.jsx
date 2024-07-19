import SigninPage from "@/components/templates/SigninPage"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"




async function SignIn() {
  const session = await getServerSession(authOptions)
  if (session) redirect("/")
    // console.log(session)
  return (
    <div>
      <SigninPage/>
    </div>
  )
}

export default SignIn

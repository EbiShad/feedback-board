'use client'

import Link from "next/link";
import { useState } from "react";
import TextField from "../module/TextField"
import Loader from "../module/Loader";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import githubIcon from '../../../public/images/github.png'





function SigninPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading,setLoading] = useState(false)
    const router = useRouter()



    const signInHandler = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      const res = await signIn("credentials",{email,password})
  
      setLoading(false);
      if (res.error) {
        toast.error(res.error)
      }else {
        router.push("/");
      }
    }

  return (
    <div className="mx-auto sm:w-1/2 lg:w-1/3 my-20 p-10 border border-purple-300 rounded-lg">
      <h4 className="font-bold text-center mb-16 text-[54px] text-purple-700">
        login
      </h4>
      <form className="space-y-5" onSubmit={signInHandler}>
        <TextField
          label="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="enter your email"
        />
        <TextField
          label="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="enter your password"
        />
        <button type="submit" className="bg-purple-300  text-gray-900 text-lg rounded-lg
         transition ease-in-out delay-75  hover:bg-purple-400 flex justify-center h-[48px] 
         items-center w-full py-3" disabled={loading}>
        {loading ? (
            <Loader
              width="50"
              height="18"
              color="rgb(0, 0, 0)"
            />
          ) : (
            "login"
          )}
        </button>
      </form>
      <button 
          className="bg-gray-200 flex justify-center gap-2 items-center mt-3  hover:bg-gray-300
         text-gray-900 text-sm rounded-lg transition ease-in-out delay-75 w-full py-3"
         onClick={()=>signIn("github",{callbackUrl:"/"})}
        >
        <Image src={githubIcon} width={24} height={24} alt="githubIcon"/>
        Signin with github
        </button>
      <p className="text-sm text-center mt-10">
       You dont have account?
        <Link
          href="/signup"
          className="text-purple-400 pl-1 hover:text-purple-600 transition ease-in-out delay-50"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}

export default SigninPage;

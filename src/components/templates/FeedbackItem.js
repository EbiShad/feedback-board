'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { TbTriangleInvertedFilled } from "react-icons/tb";

function FeedbackItem({ onOpen, title, _id, description, votesCount,session}) {
  const router = useRouter()
  
const voteButton = async (e) => {
   e.stopPropagation()
   if(session.status === "unauthenticated"){
    router.push("/signin")
    toast("you are not login Please login first")
    return
   }else{
  
    const res = await axios.post("/api/vote",{feedbackId:_id}).then(res => res.data)
    console.log(res)
   }
}




  return (
    <div>
      <div
        onClick={onOpen}
        className="px-8 flex justify-between items-center gap-8 py-2 border rounded-lg"
      >
        <div>
          <h2 className="text-lg">{title}</h2>
          <p className="text-opacity-90 text-justify text-sm">{description}</p>
        </div>
        <div>
          <button onClick={(e) => voteButton(e)} className="border-solid border-purple-300 border-[2px] px-3 py-2 rounded-md flex gap-1 justify-center items-center">
            <TbTriangleInvertedFilled className="w-3 h-3" /> {votesCount || 0}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedbackItem;

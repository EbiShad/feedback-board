'use client'

import { createVoteFn } from "@/servises/votesServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import Loader from "../module/Loader";

function FeedbackItem({onOpen, title, _id, description, votes ,session,parentLoadingVotes}) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data, isPending:isVoting, mutateAsync } = useMutation({
    mutationFn: createVoteFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["get-votes"],
      })
    }
  })
  

const voteButton = async (e) => {
   e.stopPropagation()
   if(session.status === "unauthenticated"){
    router.push("/signin")
    toast("you are not login Please login first")
    return
   }else{
    const data = await mutateAsync({feedbackId:_id})
   }
}

const iVote = votes.find(v => v.userEmail === session?.data?.user?.email)


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
        {!parentLoadingVotes ?
         <button onClick={(e) => voteButton(e)} 
            className={`border-solid border-purple-300 border-[2px] px-3 
            py-2 rounded-md flex gap-1 justify-center items-center ${iVote &&"bg-purple-300"}`}>
            {isVoting ? <Loader width={20} height={20} /> : 
            <><TbTriangleInvertedFilled className="w-3 h-3" /> {votes.length || 0}</>}
         </button>: <Loader width={20} height={20} />}
         
        </div>
      </div>
    </div>
  );
}

export default FeedbackItem;

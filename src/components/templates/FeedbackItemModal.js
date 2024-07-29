import Button from "../module/Button";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import FeedbackItemComments from "./FeedbackItemComments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVoteFn } from "@/servises/votesServices";
import Loader from "../module/Loader";

function FeedbackItemModal({ title, description,votes,_id }) {
  const votedVotes = votes?.filter( v => v.feedbackId === _id)

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
     const data = await mutateAsync({feedbackId:_id})
    
 }

  return (
    <div>
      <div>
        <h2 className="font-bold mb-2 text-lg">{title}</h2>
        <p className="text-opacity-90 text-justify text-sm">{description}</p>
      </div>

      <div className="flex items-center mt-4 justify-end border-b-gray-500 border-b pb-2">
        <Button onClick={voteButton}>
        {isVoting ? <Loader width={20} height={20} /> : 
        <><TbTriangleInvertedFilled className="w-3 h-3" />Upvoted {votedVotes.length || 0}</>}
         
        </Button>
      </div>

      <FeedbackItemComments/>
    </div>
  )
}

export default FeedbackItemModal;

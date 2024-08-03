import { TbTriangleInvertedFilled } from "react-icons/tb";
import FeedbackItemComments from "./FeedbackItemComments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVoteFn } from "@/servises/votesServices";
import Loader from "../module/Loader";
import { useSession } from "next-auth/react";
import { IoTrashOutline } from "react-icons/io5";
import Attachment from "../module/Attachment";

function FeedbackItemModal({ title, description, votes, _id, imgUpload ,onClose,userEmail}) {
  const votedVotes = votes?.filter((v) => v.feedbackId === _id);
  const queryClient = useQueryClient();
  const session = useSession();



  const {
    data,
    isPending: isVoting,
    mutateAsync,
  } = useMutation({
    mutationFn: createVoteFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["get-votes"],
      });
    },
  });

  const voteButton = async (e) => {
    const data = await mutateAsync({ feedbackId: _id });
  };

  const iVote = votedVotes.find(
    (v) => v.userEmail === session?.data?.user?.email
  );

  return (
    <div>
      <div>
        <h2 className="font-bold mb-2 text-lg">{title}</h2>
        <p className="text-opacity-90 text-justify text-sm">{description}</p>
        {imgUpload?.length > 0 && (
          <div>
            <label>Images</label>
            <div className="flex gap-2 p-1 border h-20 rounded-md mt-1 ">
              {imgUpload.map((link, index) => (
                <Attachment
                  key={index}
                  link={link}
                 
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center mt-4 justify-end border-b-gray-500 border-b pb-2">
        <button
          onClick={voteButton}
          className={`border-solid border-purple-300 border-[2px] px-3 
          py-2 rounded-md flex gap-1 justify-center items-center ${
            iVote ? "bg-purple-300" : "bg-red-300"
          }`}
        >
          {isVoting ? 
            <Loader width={20} height={20} />
           : 
            <>
              <TbTriangleInvertedFilled className="w-3 h-3" /> Upvoted{" "}
              {votedVotes.length || 0}
            </>
          }
        </button>
        {session?.data?.user?.email === userEmail && <button>Edit</button>}
      </div>

      <FeedbackItemComments feedbackId={_id} onClose={onClose}/>
    </div>
  );
}

export default FeedbackItemModal;

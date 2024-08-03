'use client'

import { useState } from "react";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import FeedbackItemComments from "./FeedbackItemComments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVoteFn } from "@/servises/votesServices";
import Loader from "../module/Loader";
import { useSession } from "next-auth/react";
import Attachment from "../module/Attachment";
import Button from "../module/Button";

function FeedbackItemModal({title,description,votes,_id,imgUpload,onClose,userEmail}) {
  const [newTitle, setnewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newImgUpload, setNewImgUpload] = useState(imgUpload);

  const votedVotes = votes?.filter((v) => v.feedbackId === _id);
  const queryClient = useQueryClient();
  const session = useSession();
  const [editMode, setEditMode] = useState(false);
 
  const validUser = session?.data?.user?.email === userEmail


  const {data,isPending: isVoting,mutateAsync} = useMutation({
    mutationFn: createVoteFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["get-votes"],
      })
    }
  })

  const voteButton = async (e) => {const data = await mutateAsync({ feedbackId: _id })}
  const iVote = votedVotes.find((v) => v.userEmail === session?.data?.user?.email)


const handleEditModeBtn = () => {
  setEditMode(true)
}

const handleCancelModeBtn = () => {
  setEditMode(false)
}

const handleremoveFileButton = (e,link) => {
  e.preventDefault();
  setNewImgUpload(currentUpload => {
    return currentUpload.filter(val => val !== link)
  })
}


  return (
    <div>
      <div>
        {editMode && 
         <input className="textFeild__input mb-2" type="text" value={newTitle} onChange={e => setnewTitle(e.target.value)}/>
        }
        {editMode && 
         <textarea className="textFeild__input" type="text" value={newDescription} onChange={e => setNewDescription(e.target.value)}/>
        }
        {editMode && newImgUpload?.length > 0 && (
        <div>
          <label>Images</label>
          <div className="flex gap-2 p-1 border h-20 rounded-md mt-1 ">
            {newImgUpload?.map((link, index) => (
              <Attachment
                key={index}
                link={link}
                showRemoveButton={true}
                onDeletFile={(e) => handleremoveFileButton(e,link)}
              />
            ))}
          </div>
        </div>
      )
     
        }
      
        {!editMode && 
          <>
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
          </>
        }
          
       
      </div>

      <div className="flex items-center mt-4 justify-between border-b-gray-500 border-b pb-2">
        {validUser && 
          <div className="flex gap-2">
            <button gray={true} onClick={handleEditModeBtn}>Edit</button>
            <Button gray={true} onClick={handleCancelModeBtn}>Cancel</Button>
            <Button gray={true}>Save Changes</Button>
          </div>
        }

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
              <TbTriangleInvertedFilled className="w-3 h-3" /> Upvoted{votedVotes.length || 0}
            </>
          }
        </button>

      </div>

      <FeedbackItemComments feedbackId={_id} onClose={onClose}/>
    </div>
  );
}

export default FeedbackItemModal;

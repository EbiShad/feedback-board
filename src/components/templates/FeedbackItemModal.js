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
import AttachFiles from "../module/AttachFiles";
import { editFeedbackFn } from "@/servises/feedbackService";

function FeedbackItemModal({title,description,votes,_id,imgUpload,onClose,userEmail,onUpdate}) {


  const votedVotes = votes?.filter((v) => v.feedbackId === _id);
  const queryClient = useQueryClient();
  const session = useSession();
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setnewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImgUpload, setNewImgUpload] = useState([]);
  const validUser = session?.data?.user?.email === userEmail

  const newData = {title:newTitle,description:newDescription,imgUpload:newImgUpload}

  const voteButton = async (e) => {const data = await mutateAsync({ feedbackId: _id })}
  const iVote = votedVotes.find((v) => v.userEmail === session?.data?.user?.email)


  const {data,isPending: isVoting, mutateAsync} = useMutation({
    mutationFn: createVoteFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["get-votes"],
      })
    }
  })

  const {data:editFeddbackData, mutateAsync:mutateEditFeedback} = useMutation({
    mutationFn: editFeedbackFn,
    onSuccess: (data) => {
      setEditMode(false)
      onUpdate(newData)
      queryClient.invalidateQueries({
        queryKey: ["get-feedbacks"],
      })
    }
  })



const handleEditModeBtn = () => {
  setEditMode(true)
  setNewDescription(description)
  setnewTitle(title)
  setNewImgUpload(imgUpload)
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

const handleSaveChangesBtn = async () => {
  const data = await mutateEditFeedback({...newData,id:_id})
}

const addNewUpload = (links) => {
  setNewImgUpload((prev) => [...prev,...links])
}


  return (
    <div>
      <div>
        {editMode && 
         <input className="textFeild__input mb-2" type="text" 
          value={newTitle} onChange={e => setnewTitle(e.target.value)}/>
        }
        {editMode && 
         <textarea className="textFeild__input" type="text" 
          value={newDescription} onChange={e => setNewDescription(e.target.value)}/>
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
      )}
      
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
            <Button mediumBtn gray={true} onClick={handleEditModeBtn}>Edit</Button>
            {editMode && 
              <>
                <Button mediumBtn gray={true} onClick={handleCancelModeBtn}>Cancel</Button>
                <AttachFiles onNewFile={addNewUpload}/> 
                <Button mediumBtn gray={true} onClick={handleSaveChangesBtn}>Save Changes</Button>
              </>
            }
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

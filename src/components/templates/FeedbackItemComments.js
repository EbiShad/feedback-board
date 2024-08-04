import { useState } from "react";
import Avatar from "../module/Avatar";
import CommentForm from "../module/CommentForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import TimeAgo from "timeago-react";
import Attachment from "../module/Attachment";
import { useSession } from "next-auth/react";
import Button from "../module/Button";
import AttachFiles from "../module/AttachFiles";
import { editCommentFn } from "@/servises/commentServices";

function FeedbackItemComments({ feedbackId = "" }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState(null);
  const [editComment, setEditComment] = useState(null);
  const [newImgUpload,setNewImgUpload] = useState([]);
  const queryClient = useQueryClient()
  const session =  useSession()

  const userEmail = session?.data?.user?.email 

  const { isPending: isLoadingComments } = useQuery({
    queryFn: () => {
      axios
        .get(`/api/comment?feedbackId=${feedbackId}`)
        .then((res) => setComments(res.data));
      return null
    },
    queryKey: ["get-comments", feedbackId],
  })


  const { data, isPending:isEditing, mutateAsync:mutatEdit } = useMutation({
    mutationFn: editCommentFn,
    onSuccess: (data) => {
      setEditComment(null)
      // if (data.status === 201) {
      //   toast.success(data.message);
      //   setDescription("");
      //   setTitle("");
      //   setImgUpload([])
      //   onClose();
      // } else {
      //   toast.error(data.message);
      // }
      queryClient.invalidateQueries({
        queryKey: ["get-comments"],
      })
    },
  });

  const handleEditBtn = (comment) => {
    setEditComment(comment)
    setCommentText(comment.commentText)
    setNewImgUpload(comment.imgUpload)
  }

  
  const handleCancelBtn = () => {
    setEditComment(null)
    setCommentText("")
    setNewImgUpload([])
  }


  const handleremoveFileButton = (e,link) => {
    e.preventDefault();
    setNewImgUpload(currentUpload => {
      return currentUpload.filter(val => val !== link)
    })
  }

  const addNewUpload = (links) => {
    setNewImgUpload((prev) => [...prev,...links])
  }
  
 const handleSaveChangesBtn = async (id) => {
  const newData = {commentText,imgUpload:newImgUpload}
  const data = await mutatEdit({...newData,id});
 }
  


  return (
    <div>
      {comments?.length > 0 &&
        comments.map((comment) => (
          <div key={comment._id} >
            <div className="mt-8 flex gap-4">
              <Avatar />
              <div>
                {editComment?._id === comment?._id && 
                  <textarea 
                    value={commentText} 
                    onChange={e=>setCommentText(e.target.value)}
                    className="textFeild__input"
                    />}

                {editComment?._id !== comment?._id && 
                  <p className="text-justify text-xs">{comment.commentText}</p>}
                
                  <div className="text-xs text-gray-400 pt-1">
                    {(comment.userEmail)}-
                    <TimeAgo datetime={comment.createdAt} locale="en_US" />
                  </div>
              </div>
            </div>


            {editComment?._id !== comment?._id &&
              comment?.imgUpload.length > 0  && (
                <div className="flex gap-2 p-1 border h-20 rounded-md mt-1 ">
                  {comment?.imgUpload.map((link, index) => (
                    <Attachment key={index} link={link} />
                  ))}
                </div>
            )}

            {editComment && (editComment?._id === comment?._id) &&
              newImgUpload?.length > 0  && (
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
            )}
            
            
            {comment.userEmail === userEmail && 
              <div className="flex gap-2 mt-2">
                <Button smallBtn gray={true} onClick={() => handleEditBtn(comment)}>Edit</Button>
                {(editComment?._id === comment?._id) &&
                  <>
                    <Button smallBtn gray={true} onClick={handleCancelBtn}>Cancel</Button>
                    <Button smallBtn gray={true} onClick={() => handleSaveChangesBtn(comment._id)}> Save </Button>
                    <AttachFiles smallBtn onNewFile={addNewUpload}/> 
                  </>
                 }
              </div>
            }
          </div>
        ))}

      <CommentForm feedbackId={feedbackId} />
    </div>
  );
}

export default FeedbackItemComments;

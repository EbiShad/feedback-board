import { useState } from "react";
import Button from "./Button";
import TextareaInput from "./TextareaInput";
import AttachFiles from "./AttachFiles";
import Attachment from "./Attachment";
import { createCommentFn } from "@/servises/commentServices";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function CommentForm({feedbackId,onClose}) {
  const [commentText, setCommentText] = useState("");
  const [imgUpload, setImgUpload] = useState([]);

  const { data, isPending:isCommenting, mutateAsync } = useMutation({
    mutationFn: createCommentFn,
    onSuccess: (data) => {
      if (data.status === 201) {
        toast.success(data.message);
        setCommentText("");
        setImgUpload([])
        onClose()
        return;
      } else {
        toast.error(data.message);
      }
    },
    onError: (err) => {
      toast.error(err.message);
    }
    })



  const handleremoveFileButton = (e,link) => {
    e.preventDefault();
    setImgUpload(currentUpload => {
      return currentUpload.filter(val => val !== link)
    })
  }

  const createCommentButton = async(e) => {
    e.preventDefault();
    const data = await mutateAsync({ commentText, feedbackId ,imgUpload})
  }


  return (
    <form className="mt-5">
      <TextareaInput
        label="All comments"
        type="text"
        name="comments"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Let us know what you think"
      />

      {imgUpload?.length > 0 && (
        <div>
          <label>Files</label>
          <div className="flex gap-2 p-1 border h-20 rounded-md mt-1 mb-2">
            {imgUpload.map((link, index) => (
              <Attachment
                key={index}
                link={link}
                showRemoveButton={true}
                onDeletFile={(e) => handleremoveFileButton(e, link)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 justify-end">
        <AttachFiles setImgUpload={setImgUpload} />
        <Button disabled={commentText === "" } onClick={createCommentButton}>Comment</Button>
      </div>
    </form>
  );
}

export default CommentForm;

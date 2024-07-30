import { useState } from "react";
import Button from "./Button";
import TextareaInput from "./TextareaInput";
import AttachFiles from "./AttachFiles";
import Attachment from "./Attachment";

function CommentForm() {
  const [commentText, setCommentText] = useState("");
  const [imgUpload, setImgUpload] = useState([]);


  const handleremoveFileButton = (e,link) => {
    e.preventDefault();
    setImgUpload(currentUpload => {
      return currentUpload.filter(val => val !== link)
    })
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
          <div className="flex gap-2 p-1 border h-20 rounded-md mt-1 ">
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
        <Button disabled={commentText === ""}>Comment</Button>
      </div>
    </form>
  );
}

export default CommentForm;

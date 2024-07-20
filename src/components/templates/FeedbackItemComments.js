import React, { useState } from "react";
import TextareaInput from "../module/TextareaInput";
import Button from "../module/Button";
import Avatar from "../module/Avatar";

function FeedbackItemComments() {
  const [commentText, setCommentText] = useState("");

  return (
    <div>
      <div className="mt-8 flex gap-4">
        <Avatar />
        <p>
          mmonly used to the visual form of a document or a typeface publishing
          and graphic design, Lorem ipsum is a placeholder text co without
          relying on meaningful content. Lorem ipsum may be used as a placehol
         
        </p>
      </div>
      <form className="mt-5">
        <TextareaInput
          label="All comments"
          type="text"
          name="comments"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Let us know what you think"
        />
        <div className="flex items-center gap-4 justify-end">
          <Button gray>Atach files</Button>
          <Button disabled={commentText === ""}>Comment</Button>
        </div>
      </form>
    </div>
  );
}

export default FeedbackItemComments;

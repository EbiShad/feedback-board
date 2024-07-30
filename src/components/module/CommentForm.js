import { useState } from "react"
import Button from "./Button"
import TextareaInput from "./TextareaInput"



function CommentForm() {

    const [commentText, setCommentText] = useState("")


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
    <div className="flex items-center gap-4 justify-end">
      <Button gray>Atach files</Button>
      <Button disabled={commentText === ""}>Comment</Button>
    </div>
  </form>
  )
}

export default CommentForm

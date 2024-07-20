import { useState } from "react";
import TextareaInput from "../module/TextareaInput"
import TextField from "../module/TextField"
import Button from "../module/Button";





function FeedbackFormModal() {

    const [title, setTitle] = useState("");
    const [details,setDetails] = useState("")


  return (
    <form className="space-y-4">
      <TextField
          label="Title"
          type="text"
          name="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="A short title"
        />
      <TextareaInput
          label="Details"
          type="text"
          name="details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="please include any details"
        />
        <div className="flex items-center gap-4 justify-end">
            <Button gray >Create post</Button>
            <Button >Atach files</Button>
        </div>
    </form>
  )
}

export default FeedbackFormModal

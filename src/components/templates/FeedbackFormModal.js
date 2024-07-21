"use client";

import { useState } from "react";
import TextareaInput from "../module/TextareaInput";
import TextField from "../module/TextField";
import Button from "../module/Button";
import { useMutation } from "@tanstack/react-query";
import { createPostFn } from "@/servises/postService";
import toast from "react-hot-toast";
import axios from "axios";

function FeedbackFormModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { data, isPending, mutateAsync } = useMutation({
    mutationFn: createPostFn,
    onSuccess: (data) => {
      if (data.status === 201) {
        toast.success(data.message);
        setDescription("");
        setTitle("");
        onClose();
      } else {
        toast.error(data.message);
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  })

  const handleCreatePostButton = async (e) => {
    e.preventDefault();
    const data = await mutateAsync({ title, description });
  }

  const handleAttachFileInputChange = async(e) => {
   const files = [...e.target.files]
   const data = new FormData()
   for (const file in files){
      data.append("file",file)
   }

  const response = await axios.post("/api/upload",data).then(res => res.data)
  console.log(response)
  }

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
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="please include any details"
      />
      <div className="flex items-center gap-4 justify-end">
        <label>
          <span className="bg-gray-300 hover:bg-gray-400 px-2 py-2 rounded-lg cursor-pointer flex justify-center text-black items-center transition-colors duration-300">
            Atach files
          </span>
          <input type="file" className="hidden" onChange={handleAttachFileInputChange}/>
        </label>
        <Button onClick={handleCreatePostButton}>Create post</Button>
      </div>
    </form>
  );
}

export default FeedbackFormModal;

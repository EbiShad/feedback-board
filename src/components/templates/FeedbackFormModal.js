"use client";

import { useState } from "react";
import TextareaInput from "../module/TextareaInput";
import TextField from "../module/TextField";
import Button from "../module/Button";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "@/servises/postService";

function FeedbackFormModal() {
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  const { data, isPending, mutateAsync } = useMutation({
    mutationFn: createPost,
  })

  const handleCreatePostButton = async (e) => {
    e.preventDefault();
    const data = await mutateAsync({ title, description })
    console.log(data)
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
        <Button gray>Atach files</Button>
        <Button onClick={handleCreatePostButton}>
          Create post
        </Button>
      </div>
    </form>
  );
}

export default FeedbackFormModal;

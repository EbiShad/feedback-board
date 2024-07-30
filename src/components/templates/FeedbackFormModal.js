"use client";

import { useState } from "react";
import TextareaInput from "../module/TextareaInput";
import TextField from "../module/TextField";
import Button from "../module/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPostFn } from "@/servises/feedbackService";
import toast from "react-hot-toast";
import supabase from "@/config/SupabaseClient";
import Attachment from "../module/Attachment";
import AttachFiles from "../module/AttachFiles";

function FeedbackFormModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUpload, setImgUpload] = useState([]);
  
  const queryClient = useQueryClient()

  const { data, isPending, mutateAsync } = useMutation({
    mutationFn: createPostFn,
    onSuccess: (data) => {
      if (data.status === 201) {
        toast.success(data.message);
        setDescription("");
        setTitle("");
        setImgUpload([])
        onClose();
      } else {
        toast.error(data.message);
      }
      queryClient.invalidateQueries({
        queryKey: ["get-feedbacks"],
      })
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleCreatePostButton = async (e) => {
    e.preventDefault();
    const data = await mutateAsync({ title, description ,imgUpload});
  }


  const handleremoveFileButton = (e,link) => {
    e.preventDefault();
    setImgUpload(currentUpload => {
      return currentUpload.filter(val => val !== link)
    })
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

     
      
      {imgUpload?.length > 0 && (
        <div>
          <label>Files</label>
          <div className="flex gap-2 p-1 border h-20 rounded-md mt-1 ">
            {imgUpload.map((link,index) => (
              <Attachment key={index} 
                link={link} 
                showRemoveButton={true} 
                onDeletFile={(e)=> handleremoveFileButton(e,link)}/>))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 justify-end">
        <AttachFiles setImgUpload={setImgUpload}/>
        <Button onClick={handleCreatePostButton}> Create post </Button>
      </div>
    </form>
  );
}

export default FeedbackFormModal;

"use client";

import { useState } from "react";
import TextareaInput from "../module/TextareaInput";
import TextField from "../module/TextField";
import Button from "../module/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPostFn } from "@/servises/feedbackService";
import toast from "react-hot-toast";
import supabase from "@/config/SupabaseClient";
import { IoTrashOutline } from "react-icons/io5";
import Loader from "../module/Loader";

function FeedbackFormModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUpload, setImgUpload] = useState([]);
  const [uploading,setUploading] = useState(false);

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

  const handleAttachFileInputChange = async (e) => {
    const file = e.target.files[0];
    const links = [];
    setUploading(true)
    const { data } = await supabase.storage.from("pictures").upload(`${file.name}`, file)
    const imageUrl = `https://dddfealtiyhdqcdfvznh.supabase.co/storage/v1/object/public/pictures/${file.name}`
    links.push(imageUrl)
    setImgUpload((prev) => [...prev,...links])
    setUploading(false)
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
              <a href={link} target="_blank" key={index} className="w-1/5 relative">
                <button onClick={(e) => handleremoveFileButton(e,link)} className="absolute -top-[6px] -right-[6px]"> 
                 <IoTrashOutline className="bg-red-500 text-2xl text-gray-300 p-1 rounded-md"/> 
                </button>
                <img src={link} alt={link} className="h-full w-full rounded-md object-cover"/>
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 justify-end">
        <label>
          <span className={`
          ${uploading ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-300 hover:bg-gray-400 text-black cursor-pointer"} 
            px-2 py-2 rounded-lg flex justify-center gap-2  items-center transition-colors duration-300`}>
            {uploading && <Loader width={20} height={20} color="rgb(156 163 175)"/>}
            {uploading ? "Uploading" : "Atach files"}
          </span>
          <input
            type="file"
            className="hidden"
            onChange={handleAttachFileInputChange}
            disabled={uploading}
          />
        </label>
        <Button onClick={handleCreatePostButton}>Create post</Button>
      </div>
    </form>
  );
}

export default FeedbackFormModal;

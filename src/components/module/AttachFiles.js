import { useState } from "react";
import Loader from "./Loader"
import supabase from "@/config/SupabaseClient";



function AttachFiles({onNewFile,smallBtn}) {

  const [uploading,setUploading] = useState(false);


  const handleAttachFileInputChange = async (e) => {
    const file = e.target.files[0];
    const links = [];
    setUploading(true)
    const { data } = await supabase.storage.from("pictures").upload(`${file.name}`, file)
    const imageUrl = `https://dddfealtiyhdqcdfvznh.supabase.co/storage/v1/object/public/pictures/${file.name}`
    links.push(imageUrl)
    // setImgUpload((prev) => [...prev,...links])
    onNewFile(links)
    setUploading(false)
  }

  return (
    <label>
          <span  className={`
          ${uploading ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-300 hover:bg-gray-400 text-black cursor-pointer"} 
          ${smallBtn && "text-[10px] py-[2px]"} 
            px-2 py-2 rounded-lg flex justify-center gap-2  items-center transition-colors duration-300`}>
            {uploading && <Loader width={20} height={20} color="rgb(156 163 175)"/>}
            {uploading ? "Uploading" : "Atach files"}
          </span>
          <input
            type="file"
            className="hidden"
            onChange={(e) => handleAttachFileInputChange(e)}
            disabled={uploading}
          />
        </label>
  )
}

export default AttachFiles

import { IoTrashOutline } from "react-icons/io5";

function Attachment({ imgUpload ,showRemoveButton}) {
  return (
    <div>
      <label>Files</label>
      <div className="flex gap-2 p-1 border h-20 rounded-md mt-1 ">
        {imgUpload.map((link, index) => (
          <a href={link} target="_blank" key={index} className="w-1/5 relative">
          {showRemoveButton && 
            <button
              onClick={(e) => handleremoveFileButton(e, link)}
              className="absolute -top-[6px] -right-[6px]"
            >
              <IoTrashOutline className="bg-red-500 text-2xl text-gray-300 p-1 rounded-md" />
            </button>
           }
           
            <img
              src={link}
              alt={link}
              className="h-full w-full rounded-md object-cover"
            />
          </a>
        ))}
      </div>
    </div>
  );
}

export default Attachment;

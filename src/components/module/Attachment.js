import { IoTrashOutline } from "react-icons/io5";

function Attachment({ link ,showRemoveButton ,onDeletFile}) {
  return (
    <div>
     <a href={link} target="_blank" className="w-1/5 relative">
          {showRemoveButton && 
            <button
              onClick={onDeletFile}
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
    </div>
  );
}

export default Attachment;

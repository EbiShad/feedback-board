import Button from "../module/Button";
import { TbTriangleInvertedFilled } from "react-icons/tb";

function FeedbackItemModal({ title, description, votesCount }) {
  return (
    <div>
      <div>
        <h2 className="font-bold mb-2 text-lg">{title}</h2>
        <p className="text-opacity-90 text-justify text-sm">{description}</p>
      </div>

      <div className="flex items-center mt-4 justify-end border-b-gray-500 border-b pb-2">
        <Button>
          <TbTriangleInvertedFilled className="w-3 h-3" /> Upvoted {votesCount}
        </Button>
      </div>
    </div>
  )
}

export default FeedbackItemModal;

import { TbTriangleInvertedFilled } from "react-icons/tb";

function FeedbackItem({ onOpen, title, description, votesCount }) {
  return (
    <div>
      <div
        onClick={onOpen}
        className="px-8 flex justify-between items-center gap-8 py-2 border rounded-lg">
        <div>
          <h2 className="text-lg">{title}</h2>
          <p className="text-opacity-90 text-justify text-sm">{description}</p>
        </div>
        <div>
          <button className="border-solid border-purple-300 border-[2px] px-3 py-2 rounded-md flex gap-1 justify-center items-center">
            <TbTriangleInvertedFilled className="w-3 h-3" /> {votesCount || 0}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedbackItem;


import Avatar from "../module/Avatar";
import CommentForm from "../module/CommentForm";

function FeedbackItemComments({feedbackId,onClose}) {
 

  return (
    <div>
      <div className="mt-8 flex gap-4">
        <Avatar />
        <div>
          <p className="text-justify text-xs">
            mmonly used to the visual form of a document or a typeface
            publishing and graphic design, Lorem ipsum is a placeholder text co
            without relying on meaningful content. Lorem ipsum may be used as a
            placehol
          </p>
          <div className="text-xs text-gray-400 pt-1">Anonymous . afew minutes ago</div>
        </div>
      </div>
     <CommentForm feedbackId={feedbackId} onClose={onClose}/>
    </div>
  );
}

export default FeedbackItemComments;

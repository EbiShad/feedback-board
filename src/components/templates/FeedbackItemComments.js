import { useState } from "react";
import Avatar from "../module/Avatar";
import CommentForm from "../module/CommentForm";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TimeAgo from "timeago-react";
import Attachment from "../module/Attachment";

function FeedbackItemComments({ feedbackId = "" }) {
  const [comments, setComments] = useState([]);

  const { isPending: isLoadingComments } = useQuery({
    queryFn: () => {
      axios
        .get(`/api/comment?feedbackId=${feedbackId}`)
        .then((res) => setComments(res.data));
      return;
    },
    queryKey: ["get-comments", feedbackId],
  })



  return (
    <div>
      {comments?.length > 0 &&
        comments.map((comment) => (
          <div key={comment._id}>
            <div className="mt-8 flex gap-4">
              <Avatar />
              <div>
                <p className="text-justify text-xs">{comment.commentText}</p>
                <div className="text-xs text-gray-400 pt-1">
                  Anonymous .
                  <TimeAgo datetime={comment.createdAt} locale="en_US" />
                </div>
              </div>
            </div>
            {comment?.imgUpload && (
                <div className="flex gap-2 p-1 border h-20 rounded-md mt-1 ">
                  {comment?.imgUpload.map((link, index) => (
                    <Attachment key={index} link={link} />
                  ))}
                </div>
            )}
          </div>
        ))}

      <CommentForm feedbackId={feedbackId} />
    </div>
  );
}

export default FeedbackItemComments;

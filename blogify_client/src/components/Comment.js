import React, { useContext, useEffect, useState } from "react";
import CommentReply from "./CommentReply";
import Comments from "./Comments";
const Comment = ({
  comment,
  post_id,
  user_id,
  state,
  setState,
  getReplies,
}) => {
  const [isReplying, setIsReplying] = useState(false);

  const childComments = getReplies(comment.id);
  // console.log("childresnss",childComments,comment)

  return (
    <>
      <div className="comment_container" key={comment.id}>
        <div>{comment.content}</div>
        <div
          className="btn btn-outline-success"
          style={{ width: "20%" }}
          onClick={() => setIsReplying(!isReplying)}
        >
          {isReplying ? "Cancel" : "Reply"}
        </div>
        {isReplying && (
          <CommentReply
            id={comment.id}
            user_id={user_id}
            post_id={post_id}
            state={state}
            setState={setState}
          />
        )}
      </div>
      {childComments?.length > 0 && <div style={{padding:50}}>
         <Comments  comments={childComments} post_id={post_id} user_id={user_id} />
        </div>}
    </>
  );
};

export default Comment;

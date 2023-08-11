import React, { useState, useEffect } from "react";
import axios from "axios";


const CommentReply = ({key ,state,setState, post_id,user_id,id}) => {
  const [comment, setComment] = useState("");

  const handleWriteComment = async () => {
    try {
      await axios.post("http://localhost:5000/api/createNestedComment", {
        content: comment,
        blog_id: post_id,
        user_id: user_id,
        parent_id:id
      });
      setComment("");
      setState(!state);
    } catch (error) {
      console.log(error);
    }
  };

  return (
   
      <div className="input" key={key}>
        <input
          type="text"
          className="form-control"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />

        <div
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => handleWriteComment()}
          style={{ marginTop: 20, marginBottom: 20 }}
        >
          Comment
        </div>
      </div>
    
  );
};

export default CommentReply;
